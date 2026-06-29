"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu,
  ScanLine,
  ShieldCheck,
  Scale,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  {
    icon: ScanLine,
    title: "Análisis automatizado",
    desc: "Cruza miles de activos en remate y depura los inviables.",
  },
  {
    icon: Scale,
    title: "Validación jurídica",
    desc: "Detecta juicios, gravámenes y vicios de título antes de invertir.",
  },
  {
    icon: TrendingUp,
    title: "Scoring de riesgo",
    desc: "Clasifica cada oportunidad y prioriza las de menor riesgo.",
  },
];

export function Innovation() {
  return (
    <section
      id="tecnologia"
      className="relative overflow-hidden bg-navy py-24 lg:py-32"
    >
      <div className="absolute inset-0 luxe-grid opacity-30" />
      <div className="pointer-events-none absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-[150px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        {/* Left — message */}
        <div>
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-gold">
              <Cpu size={15} />
              <span className="text-xs font-semibold tracking-wider">
                Pioneros en Inteligencia Artificial
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl">
              Tecnología propia para{" "}
              <span className="text-gold-gradient">
                invertir sin riesgos
              </span>
              .
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Somos pioneros en el desarrollo de herramientas de inteligencia
              artificial: creamos nuestro propio software para la mitigación y
              reducción de riesgos de inversión sobre propiedades en remate
              bancario. Un motor que analiza, valida y descarta los riesgos
              jurídicos de un juicio antes de que inviertas.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 space-y-4">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gold">
                      <Icon size={19} strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{f.title}</h3>
                      <p className="text-sm leading-relaxed text-white/55">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Link
              href="/simulador"
              className="group mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-navy shadow-[0_20px_50px_-15px_rgba(200,161,90,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
            >
              Ver el simulador en acción
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* Right — software preview mock */}
        <Reveal direction="left">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-800/80 shadow-luxe backdrop-blur-xl">
            {/* chrome */}
            <div className="flex items-center gap-3 border-b border-white/8 bg-navy-700/60 px-5 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex items-center gap-2 font-mono text-[0.7rem] text-white/55">
                <ScanLine size={12} className="text-gold" />
                NEXO Risk Engine
              </div>
            </div>

            <div className="p-7">
              <div className="font-mono text-[0.66rem] uppercase tracking-widest text-gold">
                Índice de riesgo jurídico
              </div>

              {/* gauge */}
              <div className="relative mx-auto mt-4 h-28 w-52">
                <svg viewBox="0 0 200 110" className="h-full w-full">
                  <path
                    d="M10 100 A 90 90 0 0 1 190 100"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M10 100 A 90 90 0 0 1 190 100"
                    fill="none"
                    stroke="#28c840"
                    strokeWidth="12"
                    strokeLinecap="round"
                    initial={{ pathLength: 0.88 }}
                    whileInView={{ pathLength: 0.12 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: EASE }}
                  />
                </svg>
                <div className="absolute inset-x-0 bottom-0 text-center">
                  <span className="text-3xl font-bold tabular-nums text-[#28c840]">
                    12
                  </span>
                  <span className="text-base text-white/40">/100</span>
                </div>
              </div>

              <div className="mx-auto mt-3 flex w-fit items-center gap-2 rounded-full bg-[#28c840]/15 px-4 py-1.5 font-mono text-[0.7rem] font-semibold text-[#28c840]">
                <ShieldCheck size={13} /> RIESGO MITIGADO
              </div>

              <div className="mt-6 space-y-2">
                {[
                  "Sin litigio activo en tribunales",
                  "Hipoteca liberable identificada",
                  "Descuento del 38% sobre avalúo",
                ].map((t, i) => (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.2, ease: EASE }}
                    className="flex items-center gap-2.5 rounded-lg border border-white/8 bg-white/[0.03] px-3.5 py-2.5"
                  >
                    <CheckCircle2 size={15} className="text-[#28c840]" />
                    <span className="font-mono text-[0.72rem] text-white/75">
                      {t}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
