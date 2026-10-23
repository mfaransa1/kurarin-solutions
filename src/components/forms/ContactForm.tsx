"use client";

import { useState, type FormEvent } from "react";

type FormValues = {
  name: string;
  email: string;
  organisation: string;
  service: string;
  message: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  organisation: "",
  service: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<"idle" | "error" | "prepared">("idle");

  function update(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (status !== "idle") setStatus("idle");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`Kurarin Solutions enquiry: ${values.service || "General enquiry"}`);
    const body = encodeURIComponent(
      `Name: ${values.name}
Email: ${values.email}
Organisation: ${values.organisation || "Not provided"}
Service: ${values.service || "Not specified"}

Project details:
${values.message}`
    );

    // Until the server-side submission endpoint and spam controls are configured,
    // use the verified business email as a transparent mail-client fallback.
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      setStatus("error");
      return;
    }

    window.location.href = `mailto:info@kurarinsolutions.co.ke?subject=${subject}&body=${body}`;
    setStatus("prepared");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__row">
        <label>
          Full name <span aria-hidden="true">*</span>
          <input
            autoComplete="name"
            name="name"
            required
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your name"
          />
        </label>
        <label>
          Email address <span aria-hidden="true">*</span>
          <input
            autoComplete="email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label>
        Organisation <span className="contact-form__optional">(optional)</span>
        <input
          autoComplete="organization"
          name="organisation"
          value={values.organisation}
          onChange={(event) => update("organisation", event.target.value)}
          placeholder="Company or organisation"
        />
      </label>

      <label>
        What would you like help with?
        <select name="service" value={values.service} onChange={(event) => update("service", event.target.value)}>
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
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="What are you trying to achieve?"
        />
      </label>

      {status === "error" ? (
        <p className="contact-form__status contact-form__status--error" role="alert">
          Please complete your name, a valid email address, and a project message.
        </p>
      ) : null}
      {status === "prepared" ? (
        <p className="contact-form__status" role="status">
          Your email app should open with the enquiry details. Review and send the message there.
        </p>
      ) : null}

      <button className="button button--primary contact-form__submit" type="submit">
        Prepare enquiry <span aria-hidden="true">↗</span>
      </button>
      <p className="contact-form__privacy">
        This prototype prepares an email in your email application; it does not store or send form data to a server.
      </p>
    </form>
  );
}
