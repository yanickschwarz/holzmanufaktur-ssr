"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 400);
          setTimeout(() => {
            sessionStorage.setItem("loaded", "1");
            onComplete();
          }, 1200);
          return 100;
        }
        const increment = prev < 30 ? 4 : prev < 70 ? 2 : prev < 90 ? 3 : 5;
        return Math.min(prev + increment, 100);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#ffffff" }}
        >
          <motion.img
            src="/logo.png"
            alt="Logo"
            className="w-32 md:w-44 h-auto mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ y: -120, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
          <div className="w-48 md:w-64 h-[3px] bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: "hsl(var(--accent))" }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
