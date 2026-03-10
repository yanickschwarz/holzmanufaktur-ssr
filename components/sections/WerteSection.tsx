"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/TextReveal";

const WerteSection = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="werte" className="py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="flex items-center px-6 md:px-12 lg:px-16 py-16 md:py-0 order-2 md:order-1">
          <div>
            <TextReveal as="h2" className="text-[8vw] md:text-[4vw] font-display font-bold leading-[1.1] mb-8">
              {"Unsere Werte"}
            </TextReveal>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6">
              Für uns steht die Qualität sowie auch die fachlich perfekte Ausführung unserer Produkte an erster Stelle. Egal ob es nun das kleinstmögliche Schneidebrett ist, ein riesiger Stirnholz-Metzgerblock, oder Kerzenständer.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              Wir wollen, dass Sie auch nach 20 Jahren noch Freude an unseren Produkten haben können. Wir verarbeiten Holz nachhaltig, wir wollen so viel wie möglich aus jedem rohen Brett herausholen, aus Leidenschaft zum Handwerk und dem Respekt dem Werkstoff Holz gegenüber.
            </p>
          </div>
        </div>
        <div ref={imageRef} className="w-full h-[50vh] md:h-[80vh] order-1 md:order-2 overflow-hidden">
          <motion.img
            src="/images/werte.jpg"
            alt="Unsere Werte"
            style={{ y }}
            className="w-full h-[120%] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default WerteSection;
