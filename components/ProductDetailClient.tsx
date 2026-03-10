"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderDialog from "@/components/OrderDialog";
import GrainOverlay from "@/components/GrainOverlay";
import LenisProvider from "@/components/LenisProvider";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  wood_type: string | null;
  description: string | null;
  dimensions: string | null;
  price_from: number;
  extras: unknown;
  features: string[] | null;
  main_image: string;
  additional_images: string[] | null;
  category_label: string;
  delivery_time: string | null;
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const [orderOpen, setOrderOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const allImages = [product.main_image, ...(product.additional_images || [])];
  const extras = (product.extras as Array<{ name: string; price: number }>) || [];

  return (
    <LenisProvider>
      <GrainOverlay />

      <div className="min-h-screen bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="fixed top-6 left-6 z-50"
        >
          <button
            onClick={() => router.push("/#produkte")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50"
          >
            <ArrowLeft size={16} />
            Zurück
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
          {/* Images */}
          <div className="p-6 md:p-12 flex flex-col justify-center bg-background">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden aspect-square"
            >
              <img
                src={allImages[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {allImages.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 md:w-20 md:h-20 overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImage === i ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex items-center px-6 md:px-12 lg:px-16 py-16 md:py-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{product.category_label}</p>
              <h1 className="text-[7vw] md:text-[3vw] font-display font-bold leading-[0.95] mb-4">{product.name}</h1>
              {product.wood_type && <p className="text-muted-foreground mb-2">{product.wood_type}</p>}

              {product.features && product.features.length > 0 && (
                <ul className="space-y-1 text-sm text-muted-foreground mb-6">
                  {product.features.map((f, i) => (
                    <li key={i}>· {f}</li>
                  ))}
                </ul>
              )}

              {product.dimensions && (
                <p className="text-sm text-muted-foreground mb-2">{product.dimensions}</p>
              )}

              <p className="text-2xl md:text-3xl font-display font-bold mt-6 mb-2">
                ab CHF {product.price_from.toFixed(2)}
              </p>
              {product.delivery_time && (
                <p className="text-sm text-muted-foreground mb-2">Lieferzeit: {product.delivery_time}</p>
              )}

              {extras.length > 0 && (
                <div className="space-y-1 text-sm text-muted-foreground mb-6">
                  {extras.map((extra, i) => (
                    <p key={i}>{extra.name}: + CHF {extra.price.toFixed(2)}</p>
                  ))}
                </div>
              )}

              {product.description && (
                <p className="text-muted-foreground text-sm mb-8">{product.description}</p>
              )}

              <Button variant="elegant" size="lg" onClick={() => setOrderOpen(true)} className="px-12">
                Jetzt bestellen
              </Button>

              <p className="text-xs text-muted-foreground mt-4">Porto und Verpackung: ab CHF 6.90</p>
            </motion.div>
          </div>
        </div>
      </div>

      <OrderDialog
        open={orderOpen}
        onOpenChange={setOrderOpen}
        product={{
          id: product.id,
          name: product.name,
          price_from: product.price_from,
          extras,
          main_image: product.main_image,
        }}
      />
    </LenisProvider>
  );
}
