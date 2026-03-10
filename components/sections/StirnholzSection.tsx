"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/TextReveal";

const StirnholzSection = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="stirnholz" className="py-24 md:py-32">
      <div ref={imageRef} className="w-full h-[50vh] md:h-[70vh] mb-16 overflow-hidden">
        <motion.img
          src="/images/stirnholz.jpg"
          alt="Stirnholz Nahaufnahme"
          style={{ y }}
          className="w-full h-[120%] object-cover"
        />
      </div>

      <div className="px-6 md:px-12 lg:px-20 max-w-5xl">
        <TextReveal as="h2" className="text-[7vw] md:text-[4vw] font-display font-bold leading-[1.1] mb-10">
          {"Stirnholz – Der König unter den Schneidebrettern"}
        </TextReveal>

        <p className="text-lg md:text-2xl leading-relaxed font-display mb-8">
          Ein Stirnholz Schneidebrett ist nie die günstigste Option für ein Schneidebrett. Aber im Vergleich mit den herkömmlichen Schneidebrettern, ob diese nun aus Bambus, Kunststoff, Edelstahl oder allen anderen möglichen Materialien bestehen, bietet Stirnholz fast nur Vorteile.
        </p>

        <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-8">
          Wir haben keinerlei schädliche Nanopartikel, die sich beim Schneiden in Ihren Lebensmitteln ablagern. Mikroplastik ist somit kein Thema mehr. Stirnholz ist auch die perfekte Lösung für die Standzeit Ihres Messers.
        </p>

        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          Wenn Ihr Schneidebrett ins Alter kommt und die zahllosen Schnitte ihre Spuren hinterlassen haben, lässt es sich ohne das kleinste Problem abschleifen und nachölen. Schon erstrahlt Ihr Schneidebrett wieder in neuem Glanz!
        </p>
      </div>
    </section>
  );
};

export default StirnholzSection;
