import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Holzmanufaktur Eichenberger | Handgefertigte Holzschneidebretter aus Reinach AG, Schweiz",
  description: "Holzmanufaktur Eichenberger - Handgefertigte Holzschneidebretter und Holzprodukte aus Reinach AG im Aargau. Regionale Schweizer Handwerkskunst.",
  keywords: "Holzschneidebretter Schweiz, Handgefertigte Schneidebretter Reinach AG, Holzmanufaktur Aargau, Schneidebrett handgemacht, Regionale Holzprodukte Reinach",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
