"use client";
import { useState, useEffect } from "react";
import GrainOverlay from "@/components/GrainOverlay";
import HamburgerMenu from "@/components/HamburgerMenu";
import ImageSlideshow from "@/components/ImageSlideshow";
import LoadingScreen from "@/components/LoadingScreen";
import Marquee from "@/components/Marquee";
import MagneticButton from "@/components/MagneticButton";
import LenisProvider from "@/components/LenisProvider";
import ContactDialog from "@/components/ContactDialog";
import ImpressumDialog from "@/components/ImpressumDialog";
import ProductsSection from "@/components/sections/ProductsSection";
import DienstleistungenSection from "@/components/sections/DienstleistungenSection";
import StirnholzSection from "@/components/sections/StirnholzSection";
import UeberUnsSection from "@/components/sections/UeberUnsSection";
import WerteSection from "@/components/sections/WerteSection";
import KontaktSection from "@/components/sections/KontaktSection";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  category: string;
  category_label: string;
  name: string;
  wood_type: string | null;
  price_from: number;
  main_image: string;
  dimensions: string | null;
  delivery_time: string | null;
}

interface HomeClientProps {
  initialProducts: Product[];
}

export default function HomeClient({ initialProducts }: HomeClientProps) {
  const [contactOpen, setContactOpen] = useState(false);
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("loaded")) {
      setShowLoading(true);
    }
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <LenisProvider>
      {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}
      <GrainOverlay />
      <HamburgerMenu onNavigate={scrollTo} onImpressum={() => setImpressumOpen(true)} />

      {/* HERO */}
      <section id="hero" className="h-screen w-screen overflow-hidden relative">
        <ImageSlideshow />
        <div className="relative z-10 h-full w-full flex flex-col items-center py-12 px-6">
          <header className="animate-fade-in">
            <img src="/logo.png" alt="Eichenberger Holzmanufaktur Logo" className="w-28 md:w-40 h-auto" />
          </header>
          <div className="flex-1" />
          <div className="flex flex-col items-center text-center mb-8">
            <h1
              className="text-lg md:text-xl text-foreground mb-8 animate-fade-in px-4 md:px-0 md:whitespace-nowrap"
              style={{ animationDelay: "0.3s" }}
            >
              Handgefertigte Holzprodukte aus Reinach AG
            </h1>
            <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <MagneticButton onClick={() => scrollTo("produkte")} className="cursor-pointer">
                <Button variant="elegant" size="lg">
                  Produkte entdecken
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* PRODUCTS */}
      <ProductsSection initialProducts={initialProducts} />

      {/* DIENSTLEISTUNGEN */}
      <DienstleistungenSection />

      {/* STIRNHOLZ */}
      <StirnholzSection />

      {/* ÜBER UNS */}
      <UeberUnsSection />

      {/* WERTE */}
      <WerteSection />

      {/* KONTAKT */}
      <KontaktSection />

      {/* FOOTER */}
      <footer className="border-t border-border py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Holzmanufaktur Eichenberger
        </p>
        <button
          onClick={() => setImpressumOpen(true)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Impressum & Datenschutz
        </button>
      </footer>

      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
      <ImpressumDialog open={impressumOpen} onOpenChange={setImpressumOpen} />
    </LenisProvider>
  );
}
