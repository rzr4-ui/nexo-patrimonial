"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  BedDouble,
  Bath,
  Car,
  Maximize2,
  Warehouse,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { staggerContainer, staggerItem, Reveal } from "@/components/motion/reveal";
import { waLink } from "@/lib/site";

type Remate = {
  id: string;
  tipo: string;
  ubicacion: string;
  precioRemate: number;
  valorComercial: number;
  recamaras: number;
  banos: number;
  mediosBanos?: number;
  estacionamiento?: number;
  bodegas?: number;
  terreno: number;
  construccion: number;
  descripcion: string;
  estatus: string;
  img: string;
};

const REMATES: Remate[] = [
  {
    id: "miguel-laurent-203",
    tipo: "Departamento en condominio",
    ubicacion: "Del Valle Sur, Benito Juárez, CDMX",
    precioRemate: 1_350_000,
    valorComercial: 5_441_000,
    recamaras: 3,
    banos: 2,
    mediosBanos: 1,
    estacionamiento: 2,
    terreno: 107,
    construccion: 107.61,
    descripcion:
      "Acceso, estancia, comedor, cocina, área de lavado, cuarto de servicio con baño, medio baño, sala familiar, 2 recámaras con clóset y recámara principal con balcón, vestidor y baño integrado.",
    estatus: "Ejecución de fideicomiso",
    img: "/remates/miguel-laurent.jpg",
  },
  {
    id: "calle-27-8",
    tipo: "Casa · Dos plantas",
    ubicacion: "Valentín Gómez Farías, Venustiano Carranza, CDMX",
    precioRemate: 1_100_000,
    valorComercial: 3_117_000,
    recamaras: 5,
    banos: 1,
    mediosBanos: 2,
    estacionamiento: 2,
    bodegas: 2,
    terreno: 152,
    construccion: 204,
    descripcion:
      "Planta baja: cocina, estancia, comedor, medio baño, garaje para 2 autos y cuarto de servicio. Planta alta: 4 recámaras, 1 baño completo y ½ baño. Parte trasera: 2 bodegas.",
    estatus: "Ejecución de fideicomiso",
    img: "/remates/calle-27.jpg",
  },
  {
    id: "tuy-23",
    tipo: "Departamento en edificio",
    ubicacion: "Postal, Benito Juárez, CDMX",
    precioRemate: 1_300_000,
    valorComercial: 2_000_000,
    recamaras: 1,
    banos: 1,
    terreno: 30,
    construccion: 30,
    descripcion:
      "Departamento con estancia, comedor, cocina, recámara y baño, cuarto de servicios y zona de lavaderos.",
    estatus: "Etapa 5 / 10",
    img: "/remates/tuy-23.jpg",
  },
];

const mxn = (n: number) =>
  "$" + n.toLocaleString("es-MX", { maximumFractionDigits: 0 });

function descuento(r: Remate) {
  return Math.round((1 - r.precioRemate / r.valorComercial) * 100);
}

export function Properties() {
  return (
    <section id="oportunidades" className="relative bg-cloud py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow text-gold-600">Remates disponibles</span>
            </div>
            <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Oportunidades por{" "}
              <span className="text-gold-gradient">debajo de su valor comercial</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={waLink(
                "Hola Nexo Patrimonial, quiero recibir el portafolio completo de remates disponibles.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-navy/15 px-6 py-3 text-sm font-semibold text-navy transition-all hover:border-navy hover:bg-navy hover:text-white"
            >
              Ver portafolio completo
              <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {REMATES.map((r) => (
            <motion.article
              key={r.id}
              variants={staggerItem}
              className="group flex flex-col overflow-hidden rounded-3xl bg-navy shadow-card"
            >
              {/* Imagen */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={r.img}
                  alt={r.tipo}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent" />

                <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wide text-navy">
                  {r.estatus}
                </span>
                <span className="absolute right-4 top-4 rounded-full bg-navy/80 px-3 py-1.5 text-[0.7rem] font-bold text-gold backdrop-blur-sm ring-1 ring-gold/40">
                  −{descuento(r)}% vs. comercial
                </span>
              </div>

              {/* Cuerpo */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start gap-2 text-xs text-white/55">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-gold" />
                  <span className="leading-snug">{r.ubicacion}</span>
                </div>
                <h3 className="mt-2 text-lg font-bold leading-tight text-white">
                  {r.tipo}
                </h3>

                {/* Precio */}
                <div className="mt-4 border-t border-white/10 pt-4">
                  <span className="block text-[0.65rem] uppercase tracking-wider text-white/40">
                    Precio de remate
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-gold">
                      {mxn(r.precioRemate)}
                    </span>
                    <span className="text-sm text-white/40 line-through">
                      {mxn(r.valorComercial)}
                    </span>
                  </div>
                </div>

                {/* Specs */}
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/70">
                  <span className="inline-flex items-center gap-1.5">
                    <BedDouble size={15} className="text-gold" />
                    {r.recamaras} rec.
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Bath size={15} className="text-gold" />
                    {r.banos}
                    {r.mediosBanos ? ` + ${r.mediosBanos}½` : ""} baño
                    {r.banos + (r.mediosBanos ?? 0) === 1 ? "" : "s"}
                  </span>
                  {r.estacionamiento ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Car size={15} className="text-gold" />
                      {r.estacionamiento} autos
                    </span>
                  ) : null}
                  {r.bodegas ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Warehouse size={15} className="text-gold" />
                      {r.bodegas} bodegas
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1.5">
                    <Maximize2 size={15} className="text-gold" />
                    {r.construccion} m² constr.
                  </span>
                </div>

                {/* Descripción */}
                <p className="mt-4 line-clamp-3 text-xs leading-relaxed text-white/55">
                  {r.descripcion}
                </p>

                {/* CTA */}
                <a
                  href={waLink(
                    `Hola Nexo Patrimonial, me interesa el remate "${r.tipo}" en ${r.ubicacion} (precio de remate ${mxn(
                      r.precioRemate,
                    )}). ¿Me comparten más información?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-navy transition-all hover:bg-gold-400"
                >
                  <MessageCircle size={16} />
                  Solicitar información
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-3xl text-xs leading-relaxed text-navy/45">
            Las imágenes y descripciones se muestran únicamente como referencia y no
            exponen datos privados del caso. Los remates están sujetos a disponibilidad y
            a la etapa procesal de cada expediente. Nexo Patrimonial acompaña el análisis
            jurídico, financiero y estratégico de cada oportunidad.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
