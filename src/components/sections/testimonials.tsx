"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Quote, Star } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const TESTIMONIALS = [
  {
    name: "Mariana Robles",
    role: "Inversionista patrimonial",
    quote:
      "Adquirí mi primer remate bancario con Nexo. El acompañamiento jurídico me dio total tranquilidad y hoy ese activo ya se revalorizó más del 20%.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Eduardo Lazcano",
    role: "Empresario",
    quote:
      "Reestructuramos mi portafolio inmobiliario con una estrategia clara. Pasé de propiedades ociosas a flujo constante. Es otra forma de ver el patrimonio.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Familia Treviño",
    role: "Protección patrimonial",
    quote:
      "Nos ayudaron a blindar y ordenar el patrimonio familiar pensando en la siguiente generación. Profesionalismo y discreción de primer nivel.",
    img: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Ricardo Fuentes",
    role: "Médico e inversionista",
    quote:
      "No tenía tiempo para analizar expedientes. El scoring de riesgo de Nexo me dio claridad en minutos y adquirí un departamento muy por debajo de su valor comercial.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Alejandra Nava",
    role: "Emprendedora",
    quote:
      "Los remates me daban miedo por la parte jurídica. Aquí validaron cada documento antes de avanzar; hoy tengo un activo que ya genera renta y total tranquilidad.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Jorge y Patricia Sandoval",
    role: "Patrimonio familiar",
    quote:
      "Convertimos nuestros ahorros en una propiedad con plusvalía real. Una asesoría cercana y transparente, con datos claros y sin promesas vacías.",
    img: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=900&q=80",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  return (
    <section className="relative overflow-hidden bg-navy-800 py-24 lg:py-32">
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-gold/5 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow text-gold">Testimonios</span>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Historias de{" "}
            <span className="text-gold-gradient">patrimonio construido</span>.
          </h2>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          {/* Video frame */}
          <Reveal direction="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-luxe">
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={t.img}
                    alt={t.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

              {/* Play button */}
              <button
                className="group absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold/90 text-navy shadow-[0_10px_40px_rgba(200,161,90,0.5)] transition-transform duration-300 hover:scale-110"
                aria-label="Reproducir testimonio"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" />
                <Play size={26} className="ml-1" fill="currentColor" />
              </button>

              <div className="absolute bottom-6 left-6">
                <p className="text-lg font-bold text-white">{t.name}</p>
                <p className="text-sm text-gold">{t.role}</p>
              </div>
            </div>
          </Reveal>

          {/* Quote + selector */}
          <Reveal direction="left">
            <Quote size={48} className="text-gold/40" />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={t.quote}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-5 text-xl font-light leading-relaxed text-white/85 sm:text-2xl"
              >
                “{t.quote}”
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-6 flex gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.name}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 rounded-2xl border p-2 pr-4 transition-all duration-300 ${
                    i === active
                      ? "border-gold/50 bg-white/5"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <span className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                  <span className="hidden text-left text-xs font-semibold text-white sm:block">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
