import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const SITE_URL = "https://nexopatrimonial.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nexo Patrimonial — Patrimonio 360°",
    template: "%s · Nexo Patrimonial",
  },
  description:
    "Conectamos personas con oportunidades que construyen patrimonio: remates bancarios, inversión inmobiliaria, venta de residencias y asesoría patrimonial integral.",
  keywords: [
    "remates bancarios",
    "inversión inmobiliaria",
    "patrimonio",
    "bienes raíces de lujo",
    "asesoría patrimonial",
    "Nexo Patrimonial",
  ],
  authors: [{ name: "Nexo Patrimonial" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: "Nexo Patrimonial",
    title: "Nexo Patrimonial — Patrimonio 360°",
    description:
      "Estrategia inmobiliaria de alto patrimonio. Remates bancarios, inversión, residencias y asesoría patrimonial integral.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexo Patrimonial — Patrimonio 360°",
    description:
      "Estrategia inmobiliaria de alto patrimonio. Construyamos tu próximo patrimonio.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-navy">
        {children}
      </body>
    </html>
  );
}
