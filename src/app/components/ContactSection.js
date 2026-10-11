"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Script from "next/script";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [status, setStatus] = useState({ type: "idle", text: "" });
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const widgetIdRef = useRef(null);
  const reduce = useReducedMotion();

  const renderWidget = () => {
    if (
      typeof window === "undefined" ||
      !window.grecaptcha ||
      !recaptchaRef.current ||
      widgetIdRef.current !== null ||
      !SITE_KEY
    ) {
      return;
    }
    try {
      widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
        sitekey: SITE_KEY,
        theme: "light",
        callback: (token) => setCaptchaToken(token),
        "expired-callback": () => setCaptchaToken(""),
        "error-callback": () => setCaptchaToken(""),
      });
    } catch {
      widgetIdRef.current = null;
    }
  };

  const resetWidget = () => {
    try {
      if (typeof window !== "undefined" && window.grecaptcha && widgetIdRef.current !== null) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    } catch {
      // ignore reset errors
    }
    setCaptchaToken("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status.type === "loading") return;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", text: "Please fill in name, email, and message." });
      return;
    }
    if (!captchaToken) {
      setStatus({ type: "error", text: "Please complete the captcha verification." });
      return;
    }

    setStatus({ type: "loading", text: "Sending..." });
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, captchaToken }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message.");
      }
      setStatus({ type: "success", text: "Message sent. I will reply soon." });
      setName("");
      setEmail("");
      setMessage("");
      resetWidget();
    } catch (err) {
      resetWidget();
      setStatus({ type: "error", text: err.message });
    }
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24"
    >
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="lazyOnload"
        onLoad={() => {
          setRecaptchaLoaded(true);
          renderWidget();
        }}
      />
      <div className="mx-auto max-w-3xl">
        <p className="inline-block nb-chip bg-[#74b9ff] px-3 py-1.5 mono-chip text-[13px] uppercase">
          Contact
        </p>
        <h2 className="mt-5 font-display text-4xl md:text-6xl uppercase tracking-tight text-balance">
          Send a message.
        </h2>
        <p className="mt-4 text-lg leading-relaxed">
          Have a project in mind or just want to say hi? Fill in the form below.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 nb-card p-6 sm:p-8 space-y-6">
          <div>
            <label htmlFor="message" className="block mb-2 font-bold uppercase text-sm tracking-wide">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              required
              rows={5}
              className="nb-input resize-y leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-bold uppercase text-sm tracking-wide">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="nb-input"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-bold uppercase text-sm tracking-wide">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="nb-input"
                placeholder="you@mail.com"
              />
            </div>
          </div>

          <div>
            {SITE_KEY ? (
              <div ref={recaptchaRef} className="min-h-[78px]" />
            ) : (
              <p className="font-bold text-[#b00020]">
                Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local
              </p>
            )}
            {recaptchaLoaded && widgetIdRef.current === null && SITE_KEY && (
              <button
                type="button"
                onClick={renderWidget}
                className="mt-2 font-bold underline"
              >
                Reload captcha
              </button>
            )}
          </div>

          {status.text && (
            <p
              role="status"
              className={`font-bold ${
                status.type === "success"
                  ? "text-green-800"
                  : status.type === "error"
                    ? "text-[#b00020]"
                    : "text-black"
              }`}
            >
              {status.text}
            </p>
          )}

          <button
            type="submit"
            disabled={status.type === "loading"}
            className="nb-btn nb-btn-yellow w-full min-h-[56px] px-4 text-base uppercase tracking-wide disabled:opacity-60"
          >
            {status.type === "loading" ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
