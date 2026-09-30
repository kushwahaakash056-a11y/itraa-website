import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { scrollToTop } from "@/lib/smooth-scroll";

/** Back-to-top, floating WhatsApp, cookie consent and the newsletter invite. */
export function FloatingUtilities() {
  const [showTop, setShowTop] = useState(false);
  const [cookies, setCookies] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const cookieTimer = window.setTimeout(() => setCookies(true), 1400);
    const popupTimer = window.setTimeout(() => setPopup(true), 14000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(cookieTimer);
      window.clearTimeout(popupTimer);
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[115] flex flex-col gap-3">
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              aria-label="Back to top"
              onClick={scrollToTop}
              className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card shadow-soft transition-colors hover:border-gold"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={1.2} />
            </motion.button>
          )}
        </AnimatePresence>
        <a
          href="https://wa.me/917852879790"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Chat with a fragrance advisor on WhatsApp"
          className="grid h-12 w-12 place-items-center rounded-full bg-foreground text-background shadow-soft transition-transform duration-500 hover:scale-105"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.2} />
        </a>
      </div>

      <AnimatePresence>
        {cookies && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass-luxe fixed bottom-6 left-6 z-[115] hidden max-w-sm rounded-2xl p-6 shadow-soft sm:block"
          >
            <p className="text-sm leading-relaxed text-muted-foreground">
              We use a small number of cookies to remember your selection and improve the
              boutique experience.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setCookies(false)}
                className="rounded-full bg-foreground px-5 py-2.5 font-button text-[10px] uppercase tracking-[0.2em] text-background"
              >
                Accept
              </button>
              <button
                onClick={() => setCookies(false)}
                className="rounded-full border border-border px-5 py-2.5 font-button text-[10px] uppercase tracking-[0.2em]"
              >
                Decline
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[116] w-[min(340px,86vw)] rounded-[24px] border border-border bg-card p-7 shadow-lift"
          >
            <button
              aria-label="Dismiss"
              onClick={() => setPopup(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" strokeWidth={1.2} />
            </button>
            <p className="eyebrow">Private list</p>
            <p className="mt-3 font-display text-2xl leading-snug">
              10% on your first bottle, and first access to numbered editions.
            </p>
            <button
              onClick={() => setPopup(false)}
              className="btn-luxe mt-6 w-full"
            >
              Join the list
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
