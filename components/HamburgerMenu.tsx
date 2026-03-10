"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface HamburgerMenuProps {
  onNavigate: (section: string) => void;
  onImpressum?: () => void;
}

const menuItems = [
  { label: "Home", id: "hero" },
  { label: "Produkte", id: "produkte" },
  { label: "Dienstleistungen", id: "dienstleistungen" },
  { label: "Stirnholz", id: "stirnholz" },
  { label: "Über uns", id: "ueber-uns" },
  { label: "Unsere Werte", id: "werte" },
  { label: "Kontakt", id: "kontakt" },
];

const HamburgerMenu = ({ onNavigate, onImpressum }: HamburgerMenuProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    setOpen(false);
    if (id === "impressum") {
      setTimeout(() => onImpressum?.(), 300);
    } else {
      setTimeout(() => onNavigate(id), 300);
    }
  };

  return (
    <>
      <MagneticButton
        className="fixed top-6 right-6 z-[200] cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="flex flex-col gap-[6px] p-3 bg-background/80 backdrop-blur-sm rounded-full border border-border/50">
          <span className="block w-6 h-[2px] bg-foreground" />
          <span className="block w-6 h-[2px] bg-foreground" />
        </div>
      </MagneticButton>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[300] bg-accent text-accent-foreground flex items-center justify-center"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 p-3"
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col items-center gap-4 md:gap-6">
              {menuItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleClick(item.id)}
                  className="relative text-[6vw] md:text-[3vw] font-display font-bold uppercase tracking-wider group"
                >
                  <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-1">
                    {item.label}
                  </span>
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-accent-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </motion.button>
              ))}
            </nav>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              onClick={() => handleClick("impressum")}
              className="absolute bottom-8 text-sm text-accent-foreground/60 hover:text-accent-foreground transition-colors"
            >
              Impressum & Datenschutz
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;
