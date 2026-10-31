"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export type ContactSubmissionState = {
  status: "idle" | "success" | "error";
  message: string;
};

const initialError: ContactSubmissionState = {
  status: "error",
  message: "We could not submit your enquiry. Please try again or email info@kurarinsolutions.co.ke.",
};

const allowedServices = new Set([
  "",
  "Web development",
  "Software and app development",
  "Cloud and DevOps",
  "Cybersecurity",
  "UI/UX and product design",
  "Data and analytics",
  "Other / not sure yet",
]);

function getText(formData: FormData, key: string, maxLength: number): string {
  const value = formData.get(key);
  if (typeof value !== "string") return "";
  return value.trim().replace(/\u0000/g, "").slice(0, maxLength);
}

function validEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitContactEnquiry(
  _previousState: ContactSubmissionState,
  formData: FormData,
): Promise<ContactSubmissionState> {
  // Honeypot: quietly accept bot submissions without storing them.
  if (getText(formData, "website", 200)) {
    return { status: "success", message: "Thank you. Your enquiry has been received." };
  }

  const name = getText(formData, "name", 120);
  const email = getText(formData, "email", 254).toLowerCase();
  const organisation = getText(formData, "organisation", 160);
  const service = getText(formData, "service", 80);
  const message = getText(formData, "message", 6000);

  if (
    name.length < 2 ||
    !validEmail(email) ||
    message.length < 10 ||
    !allowedServices.has(service)
  ) {
    return { status: "error", message: "Check your name, email address, service selection, and message, then try again." };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    console.error("Contact form is not configured: missing Supabase server environment variables.");
    return initialError;
  }

  try {
    const requestHeaders = await headers();
    // Hash the proxy-provided address before storing it; do not persist raw IP addresses.
    const forwardedFor = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
    const realIp = requestHeaders.get("x-real-ip")?.trim();
    const ip = forwardedFor || realIp || "unknown";
    const ipHash = createHash("sha256")
      .update(`${process.env.CONTACT_RATE_LIMIT_SALT || serviceRoleKey}:${ip}`)
      .digest("hex");

    const supabase = createClient(url, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Rate limit: up to 5 submissions per hashed IP in a rolling 60-minute window.
    // A database RPC performs the check and insert atomically.
    const { data, error } = await supabase.rpc("submit_contact_enquiry", {
      p_name: name,
      p_email: email,
      p_organisation: organisation || null,
      p_service: service || null,
      p_message: message,
      p_ip_hash: ipHash,
    });

    if (error) {
      console.error("Contact enquiry submission failed:", error.message);
      return initialError;
    }

    if (data === "rate_limited") {
      return {
        status: "error",
        message: "Too many enquiries have been submitted from this connection. Please try again later or email us directly.",
      };
    }

    return {
      status: "success",
      message: "Thank you. Your enquiry has been received. We will review it and get back to you.",
    };
  } catch (error) {
    console.error("Unexpected contact enquiry error:", error);
    return initialError;
  }
}
