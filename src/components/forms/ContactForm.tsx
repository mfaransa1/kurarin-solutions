"use client";

import { useActionState } from "react";
import { submitContactEnquiry, type ContactSubmissionState } from "@/app/(site)/contact/actions";

const initialState: ContactSubmissionState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactEnquiry, initialState);

  return (
    <form className="contact-form" action={formAction}>
      <div className="contact-form__row">
        <label>
          Full name <span aria-hidden="true">*</span>
          <input autoComplete="name" name="name" required minLength={2} maxLength={120} placeholder="Your name" />
        </label>
        <label>
          Email address <span aria-hidden="true">*</span>
          <input autoComplete="email" name="email" type="email" required maxLength={254} placeholder="you@example.com" />
        </label>
      </div>

      <label>
        Organisation <span className="contact-form__optional">(optional)</span>
        <input autoComplete="organization" name="organisation" maxLength={160} placeholder="Company or organisation" />
      </label>

      <label>
        What would you like help with?
        <select name="service" defaultValue="">
          <option value="">Select a service (optional)</option>
          <option value="Web development">Web development</option>
          <option value="Software and app development">Software & app development</option>
          <option value="Cloud and DevOps">Cloud & DevOps</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="UI/UX and product design">UI/UX & product design</option>
          <option value="Data and analytics">Data & analytics</option>
          <option value="Other / not sure yet">Other / not sure yet</option>
        </select>
      </label>

      <label>
        Tell us about your project <span aria-hidden="true">*</span>
        <textarea name="message" required minLength={10} maxLength={6000} rows={5} placeholder="What are you trying to achieve?" />
      </label>

      <div className="contact-form__honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status !== "idle" ? (
        <p
          className={`contact-form__status${state.status === "error" ? " contact-form__status--error" : ""}`}
          role={state.status === "error" ? "alert" : "status"}
        >
          {state.message}
        </p>
      ) : null}

      <button className="button button--primary contact-form__submit" type="submit" disabled={pending}>
        {pending ? "Sending enquiry…" : "Send enquiry"} <span aria-hidden="true">↗</span>
      </button>
      <p className="contact-form__privacy">
        Your details are used to respond to this enquiry. Please do not include passwords, payment details, or sensitive personal information.
      </p>
    </form>
  );
}
