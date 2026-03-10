"use client";
import { useState } from "react";
import TextReveal from "@/components/TextReveal";
import ContactDialog from "@/components/ContactDialog";
import MagneticButton from "@/components/MagneticButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const KontaktSection = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section id="kontakt" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <TextReveal as="h2" className="text-[8vw] md:text-[5vw] font-display font-bold leading-[1.1] mb-12">
        {"Kontakt"}
      </TextReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <motion.a
            href="mailto:info@holzmanufaktur-eichenberger.ch"
            className="text-[4vw] md:text-[2vw] font-display font-bold hover:opacity-60 transition-opacity break-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            info@holzmanufaktur-eichenberger.ch
          </motion.a>

          <motion.div
            className="mt-8 space-y-2 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="font-medium text-foreground">Holzmanufaktur Eichenberger</p>
            <p>Michael Eichenberger</p>
            <p>Neudorfstrasse 61</p>
            <p>5734 Reinach AG</p>
            <p className="mt-4">
              <a href="tel:+41782071771" className="hover:text-foreground transition-colors">+41 78 207 17 71</a>
            </p>
          </motion.div>
        </div>

        <div className="flex items-center">
          <MagneticButton onClick={() => setContactOpen(true)} className="cursor-pointer">
            <Button variant="elegant" size="lg" className="text-base px-12 py-6">
              Anfrage senden
            </Button>
          </MagneticButton>
        </div>
      </div>

      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
};

export default KontaktSection;
