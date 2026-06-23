"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Stethoscope,
  Target,
  Scale,
  KeyRound,
  Gem,
} from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: Stethoscope,
    title: "Diagnóstico",
    desc: "Analizamos tu perfil, objetivos y capacidad para definir la estrategia patrimonial ideal.",
  },
  {
    n: "02",
    icon: Target,
    title: "Selección de Oportunidad",
    desc: "Curamos activos alineados a tu meta: remates, residencias o vehículos de inversión.",
  },
  {
    n: "03",
    icon: Scale,
    title: "Análisis Jurídico",
    desc: "Validamos títulos, gravámenes y situación legal para una adquisición sin riesgos.",
  },
  {
    n: "04",
    icon: KeyRound,
    title: "Adquisición",
    desc: "Estructuramos y ejecutamos la operación con acompañamiento integral de principio a fin.",
  },
  {
    n: "05",
    icon: Gem,
    title: "Consolidación Patrimonial",
    desc: "Optimizamos, protegemos y proyectamos el crecimiento de tu nuevo activo en el tiempo.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 70%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="proceso" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow text-gold-600">Proceso de Inversión</span>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Un método probado, <br className="hidden sm:block" />
            <span className="text-gold-gradient">paso a paso</span>.
          </h2>
        </div>

        <div ref={ref} className="relative mx-auto mt-20 max-w-3xl">
          {/* Track */}
          <div className="absolute left-7 top-0 h-full w-px bg-navy/10 lg:left-1/2 lg:-translate-x-1/2" />
          {/* Progress fill */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-7 top-0 w-px origin-top bg-gradient-to-b from-gold to-gold-600 lg:left-1/2 lg:-translate-x-1/2"
          />

          <div className="space-y-12 lg:space-y-20">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className={`relative flex items-start gap-6 pl-20 lg:w-1/2 lg:pl-0 ${
                    left
                      ? "lg:ml-0 lg:pr-16 lg:text-right"
                      : "lg:ml-auto lg:pl-16"
                  }`}
                >
                  {/* Node */}
                  <span
                    className={`absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-white text-gold shadow-card lg:left-auto ${
                      left
                        ? "lg:-right-7 lg:translate-x-1/2"
                        : "lg:-left-7 lg:-translate-x-1/2"
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.7} />
                  </span>

                  <div className={left ? "lg:flex lg:flex-col lg:items-end" : ""}>
                    <span className="text-sm font-bold tracking-widest text-gold-600">
                      {s.n}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-navy sm:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-navy/60">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
