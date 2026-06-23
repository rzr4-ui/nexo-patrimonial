"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, ArrowUpRight } from "lucide-react";
import { staggerContainer, staggerItem, Reveal } from "@/components/motion/reveal";

type Status = "Remate Bancario" | "Disponible" | "Pre-venta" | "Inversión";

const PROPERTIES: {
  title: string;
  location: string;
  roi: string;
  status: Status;
  price: string;
  img: string;
}[] = [
  {
    title: "Residencia Bosque Real",
    location: "Huixquilucan, Edo. de México",
    roi: "21% ROI",
    status: "Remate Bancario",
    price: "$8.4M MXN",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Penthouse Polanco",
    location: "Polanco, CDMX",
    roi: "14% ROI",
    status: "Disponible",
    price: "$24.9M MXN",
    img: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Torre Inversión Reforma",
    location: "Reforma, CDMX",
    roi: "18% ROI",
    status: "Inversión",
    price: "$12.1M MXN",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Villa Punta Esmeralda",
    location: "Playa del Carmen, Q. Roo",
    roi: "26% ROI",
    status: "Pre-venta",
    price: "$15.7M MXN",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Residencia Valle Real",
    location: "Zapopan, Jalisco",
    roi: "19% ROI",
    status: "Remate Bancario",
    price: "$9.8M MXN",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Loft Corporativo Santa Fe",
    location: "Santa Fe, CDMX",
    roi: "16% ROI",
    status: "Inversión",
    price: "$6.3M MXN",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
];

const statusStyle: Record<Status, string> = {
  "Remate Bancario": "bg-gold text-navy",
  Disponible: "bg-emerald-500/90 text-white",
  "Pre-venta": "bg-sky-500/90 text-white",
  Inversión: "bg-white text-navy",
};

export function Properties() {
  return (
    <section id="oportunidades" className="relative bg-cloud py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow text-gold-600">Oportunidades</span>
            </div>
            <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Activos seleccionados con{" "}
              <span className="text-gold-gradient">visión de plusvalía</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="#contacto"
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
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {PROPERTIES.map((p) => (
            <motion.article
              key={p.title}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-3xl bg-navy shadow-card"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />

                {/* Status badge */}
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle[p.status]}`}
                >
                  {p.status}
                </span>

                {/* ROI */}
                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-navy/70 px-3 py-1.5 text-xs font-semibold text-gold backdrop-blur-sm">
                  <TrendingUp size={13} />
                  {p.roi}
                </span>
              </div>

              <div className="relative p-7">
                <div className="flex items-center gap-2 text-xs text-white/55">
                  <MapPin size={14} className="text-gold" />
                  {p.location}
                </div>
                <h3 className="mt-2 text-xl font-bold text-white">{p.title}</h3>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
                  <div>
                    <span className="block text-[0.65rem] uppercase tracking-wider text-white/40">
                      Desde
                    </span>
                    <span className="text-lg font-bold text-gold">
                      {p.price}
                    </span>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 group-hover:bg-gold group-hover:text-navy">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
