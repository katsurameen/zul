"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Script from "next/script";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const TOAST_STYLE = {
  success: { tab: "bg-[#88d498]", label: "Sent" },
  error: { tab: "bg-[#ff6b6b]", label: "Error" },
  loading: { tab: "bg-[#ffd23f]", label: "Sending" },
};

function Toast({ toast, onClose }) {
  if (!toast) return null;
  const style = TOAST_STYLE[toast.type];
  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: -24, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -24, x: "-50%" }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-20 sm:top-24 left-1/2 z-[70] w-[calc(100%-2rem)] max-w-md bg-white border-[3px] border-black shadow-[5px_5px_0_0_#000]"
    >
      <div className="flex items-stretch">
        <span className={`flex items-center px-3 font-display text-sm uppercase border-r-[3px] border-black ${style.tab}`} aria-hidden="true">
          {style.label}
        </span>
        <p className="flex-1 px-4 py-3 font-bold text-[15px] leading-snug">{toast.text}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="px-3 font-display text-lg border-l-[3px] border-black hover:bg-black hover:text-white transition-colors min-w-[48px]"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
}

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [toast, setToast] = useState(null);
  const [sending, setSending] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const widgetIdRef = useRef(null);
  const dismissTimer = useRef(null);
  const reduce = useReducedMotion();

  const showToast = (type, text, sticky = false) => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    setToast({ type, text });
    if (!sticky) {
      dismissTimer.current = setTimeout(() => setToast(null), 6000);
    }
  };

  useEffect(() => {
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, []);

  const renderWidget = () => {
    if (
      typeof window === "undefined" ||
      !window.grecaptcha ||
      typeof window.grecaptcha.render !== "function" ||
      !recaptchaRef.current ||
      widgetIdRef.current !== null ||
      !SITE_KEY
    ) {
      return false;
    }
    try {
      widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
        sitekey: SITE_KEY,
        theme: "light",
        callback: (token) => setCaptchaToken(token),
        "expired-callback": () => setCaptchaToken(""),
        "error-callback": () => setCaptchaToken(""),
      });
      return true;
    } catch {
      widgetIdRef.current = null;
      return false;
    }
  };

  // The script `onLoad` event can fire before the grecaptcha API is ready,
  // which silently drops the first render. Poll until it succeeds.
  const waitAndRender = (attempts = 25) => {
    if (renderWidget()) return;
    if (attempts <= 0) return;
    setTimeout(() => waitAndRender(attempts - 1), 300);
  };

  const kickoffRecaptcha = () => {
    setRecaptchaLoaded(true);
    const grecaptcha = typeof window !== "undefined" ? window.grecaptcha : null;
    if (grecaptcha && typeof grecaptcha.ready === "function") {
      grecaptcha.ready(() => {
        if (!renderWidget()) waitAndRender();
      });
    } else {
      waitAndRender();
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
    if (sending) return;

    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast("error", "Please fill in name, email, and message.");
      return;
    }
    if (!captchaToken) {
      showToast("error", "Please complete the captcha verification.");
      return;
    }

    setSending(true);
    showToast("loading", "Sending your message...", true);
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
      showToast("success", "Message sent. I will reply soon.");
      setName("");
      setEmail("");
      setMessage("");
      resetWidget();
    } catch (err) {
      resetWidget();
      showToast("error", err.message);
    } finally {
      setSending(false);
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
        onLoad={kickoffRecaptcha}
      />
      <AnimatePresence>
        <Toast key="toast" toast={toast} onClose={() => setToast(null)} />
      </AnimatePresence>
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

          <button
            type="submit"
            disabled={sending}
            className="nb-btn nb-btn-yellow w-full min-h-[56px] px-4 text-base uppercase tracking-wide disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
