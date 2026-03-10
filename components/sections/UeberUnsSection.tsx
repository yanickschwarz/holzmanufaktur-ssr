"use client";
import TextReveal from "@/components/TextReveal";
import ParallaxImage from "@/components/ParallaxImage";

const UeberUnsSection = () => {
  return (
    <section id="ueber-uns" className="py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <ParallaxImage src="/images/ueber-uns.jpg" alt="Über uns" className="w-full h-[50vh] md:h-[80vh]" />
        <div className="flex items-center px-6 md:px-12 lg:px-16 py-16 md:py-0">
          <div>
            <TextReveal as="h2" className="text-[8vw] md:text-[4vw] font-display font-bold leading-[1.2] mb-8">
              {"Über uns"}
            </TextReveal>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6">
              Die Holzmanufaktur Eichenberger besteht aus 2 Personen. Michael Eichenberger und Yannick Müller. Wir kennen uns schon seit vielen Jahren, damals noch verbunden durch die gemeinsame Leidenschaft für Unihockey.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              Durch unsere Tätigkeit im Tischbau, sind wir perfekt eingearbeitet und erfahren in fast allen Bereichen der Massivholz Bearbeitung. Sei es die fachlich korrekte Auslegung der Massivholzbretter über die Verleimung, der Verarbeitung bis zum fertigen Produkt.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-20 mt-16 max-w-4xl">
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground italic">
          Holzmanufaktur Eichenberger, eine Geschäftsidee entstanden aus Michis Worten: «Wenni scho so en türe Laser chaufe, muess au chli Gäld inecho demet.» Am 30. November hatten wir unseren ersten offiziellen Auftritt als Holzmanufaktur Eichenberger am Weihnachtsmarkt in Reinach AG.
        </p>
      </div>
    </section>
  );
};

export default UeberUnsSection;
