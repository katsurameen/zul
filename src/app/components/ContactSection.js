"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Script from "next/script";

const socialLinks = [
  { name: "Instagram", url: "https://instagram.com/zlf_sltn" },
  { name: "Github", url: "https://github.com/katsurameen" },
  { name: "LinkedIn", url: "https://linkedin.com/in/zulfasulthany" },
];

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
        theme: "dark",
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
      setStatus({ type: "success", text: "Message sent successfully!" });
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
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col justify-start sm:justify-center px-3 sm:px-6 py-12 sm:py-10 text-white max-w-6xl mx-auto scroll-mt-20 sm:min-h-screen"
    >
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="lazyOnload"
        onLoad={() => {
          setRecaptchaLoaded(true);
          renderWidget();
        }}
      />
      <p className="text-[9px] sm:text-[10px] tracking-widest text-neutral-400 mb-2 text-center sm:text-left">04 / TRANSMISSION</p>
      <h2 className="text-lg sm:text-2xl mb-6 sm:mb-8 tracking-widest text-center sm:text-left">
        CONTACT ME
      </h2>

      <form
        onSubmit={handleSubmit}
        className="pixel-panel w-full flex flex-col lg:flex-row gap-0 bg-[#1c1c1c] border-2 border-neutral-700 min-w-0"
      >
        <div className="flex-1 p-4 sm:p-6 border-b-2 lg:border-b-0 lg:border-r-2 border-neutral-700 min-w-0">
          <label className="block mb-3 text-[10px] text-neutral-300">MESSAGE <span className="text-yellow-400">*</span></label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your quest here..."
            required
            className="w-full h-40 sm:h-56 p-4 bg-[#111] text-white text-[11px] leading-relaxed resize-none outline-none border-2 border-neutral-700 focus:border-yellow-400 placeholder:text-neutral-600"
          />
          <p className="mt-3 text-[8px] text-neutral-500">BANDUNG (GMT+7)</p>
        </div>

        <div className="flex-1 p-4 sm:p-6 space-y-5 min-w-0">
          <div>
            <label htmlFor="name" className="block mb-3 text-[10px] text-neutral-300">
              FULLNAME
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full min-h-[48px] px-4 py-3 text-[11px] text-white outline-none bg-[#111] border-2 border-neutral-700 focus:border-yellow-400 placeholder:text-neutral-600"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-3 text-[10px] text-neutral-300">
              EMAIL
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full min-h-[48px] px-4 py-3 text-[11px] text-white outline-none bg-[#111] border-2 border-neutral-700 focus:border-yellow-400 placeholder:text-neutral-600"
              placeholder="you@mail.com"
            />
          </div>

          <div>
            {SITE_KEY ? (
              <div ref={recaptchaRef} className="min-h-[78px]" />
            ) : (
              <p className="text-[10px] text-red-400">
                Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local
              </p>
            )}
            {recaptchaLoaded && widgetIdRef.current === null && SITE_KEY && (
              <button
                type="button"
                onClick={renderWidget}
                className="mt-2 text-[10px] text-neutral-400 underline"
              >
                Reload captcha
              </button>
            )}
          </div>

          {status.text && (
            <p
              className={`text-[10px] ${
                status.type === "success"
                  ? "text-green-400"
                  : status.type === "error"
                    ? "text-red-400"
                    : "text-neutral-400"
              }`}
            >
              {status.text}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={status.type === "loading"}
              className="pixel-btn w-full min-h-[52px] px-4 py-3.5 bg-[#ff004d] text-white text-[11px] border-2 border-white hover:bg-[#ff3366] active:bg-[#ff3366] disabled:opacity-60"
            >
              {status.type === "loading" ? "Sending..." : "Send Message ＞"}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4 sm:mt-6 pixel-panel-sm bg-[#1c1c1c] border-2 border-neutral-700 p-4 sm:p-5 min-w-0">
        <p className="text-[9px] sm:text-[10px] tracking-widest text-neutral-400 mb-4">OR FIND ME ON</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] px-4 text-[10px] border-2 border-neutral-600 bg-[#1a1a1a] text-white hover:border-yellow-400 hover:text-yellow-400 active:border-yellow-400 transition"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
