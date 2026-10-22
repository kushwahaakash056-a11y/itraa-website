import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function OfferPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closePopup = () => {
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="ITRAA special offer"
          onClick={closePopup}
          className="fixed inset-0 z-[250] grid place-items-center bg-black/65 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-[34rem] overflow-hidden rounded-[28px] border border-white/15 bg-[#18120f] shadow-2xl"
          >
            <button
              type="button"
              aria-label="Close offer"
              onClick={closePopup}
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition-transform hover:scale-105"
            >
              <X className="h-5 w-5" strokeWidth={1.4} />
            </button>
            <Link to="/collections" onClick={closePopup} className="block">
              <img
                src="/DiwaliOffer.png"
                alt="Diwali Special Offer — up to 40% off on all perfumes"
                width={1254}
                height={1254}
                className="aspect-square w-full object-cover"
              />
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
