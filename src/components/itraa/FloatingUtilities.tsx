import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { scrollToTop } from "@/lib/smooth-scroll";

/** Back-to-top, floating WhatsApp and cookie consent. */
export function FloatingUtilities() {
  const [showTop, setShowTop] = useState(false);
  const [cookies, setCookies] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const cookieTimer = window.setTimeout(() => setCookies(true), 1400);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(cookieTimer);
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
              We use a small number of cookies to remember your selection and improve the boutique
              experience.
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
    </>
  );
}
