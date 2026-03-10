import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createServerSupabase } from "@/lib/supabase-server";
import ProductDetailClient from "@/components/ProductDetailClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const supabase = createServerSupabase();
    const { data } = await supabase
      .from("products")
      .select("name, wood_type, price_from")
      .eq("id", id)
      .single();

    if (!data) return { title: "Produkt nicht gefunden" };

    return {
      title: `${data.name} | Holzmanufaktur Eichenberger`,
      description: `${data.name} – ${data.wood_type || ""} ab CHF ${data.price_from}. Handgefertigt in Reinach AG.`,
    };
  } catch {
    return { title: "Produkt | Holzmanufaktur Eichenberger" };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  
  let product: any = null;
  try {
    const supabase = createServerSupabase();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    product = data;
  } catch {
    // Will try client-side
  }

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
