"use client";

import { useState } from "react";

type Props = { roles: string[] };
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export function CareerApplicationForm({ roles }: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [role, setRole] = useState(roles[0] ?? "");

  function validateFile(file: File | undefined) {
    if (!file) return "Please attach your CV.";
    const ext = file.name.toLowerCase().split(".").pop();
    if (!ext || !["pdf", "doc", "docx"].includes(ext)) return "Upload your CV as a PDF, DOC or DOCX file.";
    if (file.size > MAX_FILE_BYTES) return "Your CV must be 5 MB or smaller.";
    if (file.size === 0) return "The selected file is empty. Please choose another file.";
    if (file.type && !ACCEPTED_TYPES.includes(file.type)) return "The file type does not match the supported CV formats.";
    return "";
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get("cv") as File | null;
    const validation = validateFile(file && file.size ? file : undefined);
    if (validation) { setStatus("error"); setMessage(validation); return; }
    setStatus("submitting"); setMessage("");
    try {
      data.set("role", role);
      const response = await fetch("/api/careers/apply", { method: "POST", body: data });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "We could not submit your application. Please try again.");
      setStatus("success"); setMessage("Your application has been submitted. Thank you for your interest in Kurarin Solutions.");
      form.reset(); setFileName(""); setRole(roles[0] ?? "");
    } catch (error) {
      setStatus("error"); setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return <form className="ks-application-form" onSubmit={submit} encType="multipart/form-data">
    <div className="ks-form-row"><label>Full name<input name="fullName" autoComplete="name" required maxLength={120} placeholder="Your full name" /></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label></div>
    <div className="ks-form-row"><label>Phone number <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+254…" /></label><label>Role of interest<select name="role" value={role} onChange={(event) => setRole(event.target.value)} required>{roles.map((item) => <option value={item} key={item}>{item}</option>)}<option value="Other / General application">Other / General application</option></select></label></div>
    <label>Relevant experience or a short introduction<textarea name="message" rows={5} maxLength={4000} placeholder="Tell us about your skills, experience, projects or what you would like to contribute." /></label>
    <label className="ks-file-label">Attach your CV <span>Required · PDF, DOC or DOCX · Up to 5 MB</span><input name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required onChange={(event) => { const file = event.currentTarget.files?.[0]; setFileName(file?.name ?? ""); const error = file ? validateFile(file) : ""; if (error) { setStatus("error"); setMessage(error); } else if (status === "error") { setStatus("idle"); setMessage(""); } }} />{fileName && <small className="ks-selected-file">Selected: {fileName}</small>}</label>
    <label className="ks-honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <label className="ks-consent"><input type="checkbox" name="consent" value="yes" required /><span>I confirm the information provided is accurate and agree that Kurarin Solutions may use it to consider my application.</span></label>
    {message && <p className={`ks-form-message ks-form-message--${status}`} role="status" aria-live="polite">{message}</p>}
    <button type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting…" : "Submit application"}<span>↗</span></button>
    <p className="ks-form-footnote">Please submit one application at a time. Do not upload identity documents, certificates containing sensitive information, or unrelated files.</p>
  </form>;
}
