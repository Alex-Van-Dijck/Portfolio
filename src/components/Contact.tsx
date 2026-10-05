import { useState, type SubmitEvent } from "react";
import emailjs from "@emailjs/browser";
import { useScrollReveal } from "../hooks/useScrollReveal";

type Status = "idle" | "loading" | "success" | "error";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const { ref, className } = useScrollReveal();

  const update =
    (k: keyof typeof fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: fields.name,
          reply_to: fields.email,
          message: fields.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("success");
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    }
  };

  const inputBase =
    "w-full bg-transparent border-b border-border focus:border-accent outline-none pb-3 pt-1 font-sans text-sm text-foreground placeholder:text-muted-fg/40 transition-colors duration-200 resize-none";

  return (
    <section
      id="contact"
      className="py-32 md:py-44 px-8 md:px-16 lg:px-24 border-t border-border"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-20 lg:gap-28">
        {/* ── Left: heading + links ── */}
        <div className="space-y-10">
          <div>
            <span className="font-mono text-xs text-muted-fg tracking-widest uppercase block mb-5">
              Contact
            </span>
            <h2
              className="font-display font-bold leading-[1.05] text-foreground"
              style={{ fontSize: "clamp(2.4rem, 3.5vw, 5rem)" }}
            >
              <div>
                [Can we build it? <br /> Yes we can! ]
              </div>
            </h2>
          </div>

          <div className="space-y-3">
            <a
              href="mailto:v.dijckalex@gmail.com"
              className="block font-mono text-sm text-muted-fg hover:text-accent underline underline-offset-4 transition-colors"
            >
              [v.dijckalex@gmail.com] ↗
            </a>
            <a
              href="www.linkedin.com/in/alex-van-dijck-442375231"
              className="block font-mono text-sm text-muted-fg hover:text-accent underline underline-offset-4 transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/Alex-Van-Dijck"
              className="block font-mono text-sm text-muted-fg hover:text-accent underline underline-offset-4 transition-colors"
            >
              GitHub ↗
            </a>
          </div>

          <p className="font-mono text-xs text-muted-fg leading-relaxed">
            Based in Wuustwezel, Belgium.
            <br />
            Open to remote and on-site engagements.
          </p>
        </div>

        <div ref={ref} className={className}>
          {status === "success" ? (
            <div className="flex flex-col justify-center min-h-[280px] space-y-2">
              <p className="font-display font-semibold text-2xl text-accent">
                Message received.
              </p>
              <p className="font-mono text-sm text-muted-fg">
                I'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10" noValidate>
              <div className="space-y-2">
                <label className="font-mono text-[11px] text-muted-fg block tracking-wider uppercase">
                  Name
                </label>
                <input
                  type="text"
                  value={fields.name}
                  onChange={update("name")}
                  placeholder="[Your name]"
                  required
                  className={inputBase}
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[11px] text-muted-fg block tracking-wider uppercase">
                  Email
                </label>
                <input
                  type="email"
                  value={fields.email}
                  onChange={update("email")}
                  placeholder="[your@email.com]"
                  required
                  className={inputBase}
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[11px] text-muted-fg block tracking-wider uppercase">
                  Message
                </label>
                <textarea
                  value={fields.message}
                  onChange={update("message")}
                  placeholder="[What are you working on?]"
                  required
                  rows={4}
                  className={inputBase}
                />
              </div>

              {status === "error" && (
                <p className="font-mono text-xs text-red-400">
                  Something went wrong. Please try again, or email me directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-2.5 rounded-full bg-accent text-[#0A0A0C] font-display font-semibold text-sm hover:bg-accent/90 disabled:opacity-50 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline focus-visible:outline-accent"
              >
                {status === "loading" ? "Sending…" : "Send message →"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer line */}
      <div className="max-w-[1200px] mx-auto mt-24 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted-fg">
          [Alex Van Dijck] · Full-stack engineer
        </span>
        <span className="font-mono text-xs text-muted-fg">
          Wuustwezel, Belgium · {new Date().getFullYear()}
        </span>
      </div>
    </section>
  );
};

export default Contact;
