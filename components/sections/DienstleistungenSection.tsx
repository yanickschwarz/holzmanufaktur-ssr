"use client";
import TextReveal from "@/components/TextReveal";
import ParallaxImage from "@/components/ParallaxImage";
import { motion } from "framer-motion";

const services = [
  "Massivholz-Arbeiten generell",
  "Innenausbauten wie Einbau-/ freistehende Schränke",
  "Service Arbeiten generell",
  "Unterhalt und Pflege von Massivholz Produkten",
];

const DienstleistungenSection = () => {
  return (
    <section id="dienstleistungen" className="py-24 md:py-32">
      <div className="px-6 md:px-12 lg:px-20 mb-12">
        <TextReveal as="h2" className="text-[8vw] md:text-[5vw] font-display font-bold leading-[1.1] mb-8">
          {"Dienstleistungen"}
        </TextReveal>
      </div>

      <ParallaxImage src="/images/dienstleistungen.jpg" alt="Dienstleistungen" className="w-full h-[60vh] md:h-[80vh]" />

      <div className="px-6 md:px-12 lg:px-20 mt-16 max-w-4xl">
        <p className="text-lg md:text-2xl leading-relaxed font-display">
          Unsere Schneidebretter, Kerzenständer und Untersetzer lassen sich mit fast allen Holzarten anfertigen. Die Möglichkeiten und Kombinationen sind fast grenzenlos. Wenn Sie einen Wunsch bezüglich Holzarten haben, brauchen Sie diesen nur zu äussern.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-muted/50 backdrop-blur-sm p-6 md:p-8"
            >
              <p className="font-display text-sm md:text-base">{s}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Laser section */}
      <div className="mt-24 px-6 md:px-12 lg:px-20">
        <TextReveal as="h3" className="text-[6vw] md:text-[3vw] font-display font-bold leading-[1.1] mb-12">
          {"Laserbeschriftung"}
        </TextReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <motion.div
            className="md:col-span-7 overflow-hidden aspect-[4/3]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src="/images/laser.jpg" alt="Laserbeschriftung" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>

          <div className="md:col-span-5 flex flex-col gap-6">
            <motion.div
              className="bg-muted/50 backdrop-blur-sm p-8 flex-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="font-display font-semibold text-base md:text-lg mb-4">Personalisierung</p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Beschriftung von diversem Material. Personalisierung von z.B. Schneidebrettern, Kugelschreibern, Flaschenöffnern, Thermosflaschen, Schlüsselanhängern und mehr.
              </p>
            </motion.div>

            <motion.div
              className="bg-muted/50 backdrop-blur-sm p-8 flex-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="font-display font-semibold text-base md:text-lg mb-4">Unsere Geräte</p>
              <div className="space-y-3 text-sm md:text-base text-muted-foreground">
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span>Xtool F1 Ultra</span>
                  <span className="text-xs text-accent-foreground/70 px-2 py-1 bg-muted-foreground">200×200mm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Creality Falcon2</span>
                  <span className="text-xs text-accent-foreground/70 px-2 py-1 bg-muted-foreground">400×400mm</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-20 mt-16">
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
          Sollten Sie eine Arbeit wünschen, die nicht aufgeführt ist, dann melden Sie sich ungeniert bei uns. Gerne schauen wir alles mit Ihnen an und beraten Sie.
        </p>
      </div>
    </section>
  );
};

export default DienstleistungenSection;
