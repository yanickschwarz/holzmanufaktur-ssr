import type { Metadata } from "next";
import AdminClient from "@/components/AdminClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | Holzmanufaktur Eichenberger",
};

export default function AdminPage() {
  return <AdminClient />;
}
