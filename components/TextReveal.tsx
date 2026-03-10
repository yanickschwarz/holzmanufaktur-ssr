"use client";
import { motion } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const TextReveal = ({ children, className = "", delay = 0, as: Tag = "h2" }: TextRevealProps) => {
  const lines = children.split("\n");

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-2">
          <motion.span
            className="block"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.1,
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default TextReveal;
