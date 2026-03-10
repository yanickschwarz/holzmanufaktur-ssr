"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  wood_type: string | null;
  price_from: number;
  main_image: string;
  dimensions: string | null;
  delivery_time?: string | null;
}

const ProductCard = ({ id, name, wood_type, price_from, main_image, dimensions, delivery_time }: ProductCardProps) => {
  return (
    <Link href={`/produkt/${id}`}>
      <motion.div
        className="group cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="overflow-hidden bg-muted aspect-square mb-4">
          <motion.img
            src={main_image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <h3 className="font-display font-semibold text-foreground text-sm md:text-base">{name}</h3>
        {wood_type && <p className="text-muted-foreground text-xs mt-0.5">{wood_type}</p>}
        {dimensions && <p className="text-muted-foreground text-xs">{dimensions}</p>}
        <p className="text-foreground font-medium text-sm mt-1">ab CHF {price_from.toFixed(2)}</p>
        {delivery_time && <p className="text-muted-foreground text-xs mt-0.5">Lieferzeit: {delivery_time}</p>}
      </motion.div>
    </Link>
  );
};

export default ProductCard;
