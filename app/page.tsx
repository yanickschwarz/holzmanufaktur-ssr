import { createServerSupabase } from "@/lib/supabase-server";
import HomeClient from "@/components/HomeClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Holzmanufaktur Eichenberger | Handgefertigte Holzschneidebretter aus Reinach AG, Schweiz",
  description: "Holzmanufaktur Eichenberger - Handgefertigte Holzschneidebretter und Holzprodukte aus Reinach AG im Aargau. Regionale Schweizer Handwerkskunst.",
  alternates: { canonical: "https://holzmanufaktur-eichenberger.ch/" },
};

export default async function HomePage() {
  let products: any[] = [];
  try {
    const supabase = createServerSupabase();
    const { data } = await supabase
      .from("products")
      .select("id, category, category_label, name, wood_type, price_from, main_image, dimensions, delivery_time")
      .eq("is_active", true)
      .order("sort_order");
    products = data || [];
  } catch {
    // Supabase not configured yet, will load client-side
  }
  return <HomeClient initialProducts={products} />;
}
