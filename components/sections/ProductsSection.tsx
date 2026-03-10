"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import TextReveal from "@/components/TextReveal";
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

interface ProductsSectionProps {
  initialProducts?: Product[];
}

const ProductsSection = ({ initialProducts = [] }: ProductsSectionProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (initialProducts.length === 0) {
      supabase
        .from("products")
        .select("id, category, category_label, name, wood_type, price_from, main_image, dimensions, delivery_time")
        .eq("is_active", true)
        .order("sort_order")
        .then(({ data }) => {
          if (data) setProducts(data as Product[]);
        });
    }
  }, [initialProducts.length]);

  const categories = [...new Map(products.map(p => [p.category, p.category_label])).entries()];
  const filtered = activeCategory ? products.filter(p => p.category === activeCategory) : products;
  const displayed = isMobile && !showAll ? filtered.slice(0, 4) : filtered;

  return (
    <section id="produkte" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <TextReveal as="h2" className="text-[8vw] md:text-[5vw] font-display font-bold leading-[1.1] mb-4">
        {"Unsere Produkte"}
      </TextReveal>
      <p className="text-base md:text-lg text-muted-foreground mb-12">
        Entdecken Sie unsere grosse Auswahl an handgefertigten Unikaten.
      </p>

      <div className="flex flex-wrap gap-3 mb-12">
        <button
          onClick={() => { setActiveCategory(null); setShowAll(false); }}
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider border transition-all ${
            !activeCategory ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/50"
          }`}
        >
          Alle
        </button>
        {categories.map(([key, label]) => (
          <button
            key={key}
            onClick={() => { setActiveCategory(key); setShowAll(false); }}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider border transition-all ${
              activeCategory === key ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {displayed.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {isMobile && !showAll && filtered.length > 4 && (
        <div className="flex justify-center mt-10">
          <Button variant="outline" size="lg" onClick={() => setShowAll(true)} className="rounded-full px-8">
            Weitere Produkte anzeigen ({filtered.length - 4})
          </Button>
        </div>
      )}

      {products.length === 0 && (
        <p className="text-muted-foreground text-center py-20">Produkte werden geladen...</p>
      )}
    </section>
  );
};

export default ProductsSection;
