"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MarqueeProps {
  text?: string;
}

const Marquee = ({ text = "Handwerk · Holz · Leidenschaft · Qualität · " }: MarqueeProps) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="overflow-hidden py-6 md:py-10 bg-accent">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: isMobile ? 8 : 18, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="text-[8vw] md:text-[6vw] font-display font-bold text-accent-foreground uppercase leading-none tracking-tight mx-4"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
