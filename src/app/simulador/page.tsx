import type { Metadata } from "next";
import { Simulator } from "@/components/simulator/simulator";

export const metadata: Metadata = {
  title: "NEXO Risk Engine — Simulador de Análisis de Remates",
  description:
    "Simulación del proceso de selección y análisis de propiedades en remate bancario de Nexo Patrimonial, mitigando los riesgos jurídicos de un juicio.",
  robots: { index: false, follow: false },
};

export default function SimuladorPage() {
  return <Simulator />;
}
