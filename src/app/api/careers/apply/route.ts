import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const BUCKET = "career-cvs";
const MIME_BY_EXTENSION: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};
const ALLOWED_ROLES = new Set([
  "Frontend Developer", "Backend Developer", "UI/UX Designer",
  "Digital Solutions / Business Analyst", "Digital Marketing & Content Associate",
  "Other / General application",
]);

function cleanText(value: FormDataEntryValue | null, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function validEmail(value: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254; }

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    // Honeypot: respond successfully without persisting automated submissions.
    if (cleanText(form.get("website"), 300)) return NextResponse.json({ ok: true });
    const fullName = cleanText(form.get("fullName"), 120);
    const email = cleanText(form.get("email"), 254).toLowerCase();
    const phone = cleanText(form.get("phone"), 40);
    const role = cleanText(form.get("role"), 100);
    const message = cleanText(form.get("message"), 4000);
    const consent = cleanText(form.get("consent"), 10) === "yes";
    const cv = form.get("cv");

    if (fullName.length < 2) return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    if (!validEmail(email)) return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    if (!ALLOWED_ROLES.has(role)) return NextResponse.json({ error: "Please choose a listed role." }, { status: 400 });
    if (!consent) return NextResponse.json({ error: "Please confirm the application consent to continue." }, { status: 400 });
    if (!(cv instanceof File) || cv.size < 1) return NextResponse.json({ error: "Please attach your CV." }, { status: 400 });
    if (cv.size > MAX_FILE_BYTES) return NextResponse.json({ error: "Your CV must be 5 MB or smaller." }, { status: 413 });

    const extension = cv.name.toLowerCase().split(".").pop() || "";
    const expectedMime = MIME_BY_EXTENSION[extension];
    if (!expectedMime || (cv.type && cv.type !== expectedMime)) return NextResponse.json({ error: "Upload your CV as a PDF, DOC or DOCX file." }, { status: 400 });
    const bytes = Buffer.from(await cv.arrayBuffer());
    if (!hasExpectedSignature(extension, bytes)) return NextResponse.json({ error: "The file contents do not match the selected CV format." }, { status: 400 });

    const supabase = await createSupabaseServerClient();
    const applicationId = crypto.randomUUID();
    const safeName = `cv.${extension}`;
    const storagePath = `${applicationId}/${safeName}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(storagePath, bytes, {
      contentType: expectedMime, upsert: false, cacheControl: "0",
    });
    if (uploadError) {
      console.error("[careers] CV upload failed:", uploadError.message);
      return NextResponse.json({ error: "We could not store your CV. Please try again later." }, { status: 503 });
    }

    const { error: insertError } = await supabase.from("career_applications").insert({
      id: applicationId, full_name: fullName, email, phone: phone || null,
      role, message: message || null, cv_path: storagePath,
      cv_original_name: cv.name.slice(0, 255), cv_mime_type: expectedMime,
      cv_size_bytes: cv.size, consent_at: new Date().toISOString(),
    });
    if (insertError) {
      console.error("[careers] Application insert failed:", insertError.message);
      await supabase.storage.from(BUCKET).remove([storagePath]);
      return NextResponse.json({ error: "Your application could not be saved. Please try again later." }, { status: 503 });
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("[careers] Application request failed:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "We could not submit your application. Check your connection and try again." }, { status: 500 });
  }
}

function hasExpectedSignature(extension: string, bytes: Buffer): boolean {
  if (extension === "pdf") return bytes.length >= 5 && bytes.subarray(0, 5).toString("ascii") === "%PDF-";
  if (extension === "doc") return bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]));
  // DOCX is a ZIP container. This checks the container signature; it is not a malware scan.
  if (extension === "docx") return bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b && [0x03, 0x05, 0x07].includes(bytes[2]) && [0x04, 0x06, 0x08].includes(bytes[3]);
  return false;
}
