"use client";

import { motion } from "framer-motion";
import { Landmark, Home, TrendingUp, ShieldCheck, ArrowUpRight } from "lucide-react";
import { staggerContainer, staggerItem, Reveal } from "@/components/motion/reveal";

const SERVICES = [
  {
    n: "01",
    icon: Landmark,
    title: "Remates Bancarios",
    desc: "Acceso a oportunidades con alto potencial de plusvalía, depuradas jurídica y financieramente.",
  },
  {
    n: "02",
    icon: Home,
    title: "Venta de Residencias",
    desc: "Propiedades seleccionadas para vivir o invertir, en zonas de alta revalorización.",
  },
  {
    n: "03",
    icon: TrendingUp,
    title: "Inversiones Inmobiliarias",
    desc: "Estrategias para generar flujo y crecimiento patrimonial sostenido en el tiempo.",
  },
  {
    n: "04",
    icon: ShieldCheck,
    title: "Asesoría Patrimonial",
    desc: "Planeación y protección del patrimonio familiar con visión de largo plazo.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="relative bg-navy py-24 lg:py-32">
      <div className="absolute inset-0 luxe-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow text-gold">Servicios</span>
            </div>
            <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Soluciones para cada etapa de tu{" "}
              <span className="text-gold-gradient">patrimonio</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-base leading-relaxed text-white/55">
              Cuatro divisiones especializadas que operan de forma integrada
              para maximizar valor y resguardar tu capital.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.n}
                variants={staggerItem}
                className="group relative overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:bg-white/[0.06]"
              >
                {/* hover glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/0 blur-3xl transition-all duration-500 group-hover:bg-gold/20" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-navy-700 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-navy">
                      <Icon size={26} strokeWidth={1.6} />
                    </span>
                    <span className="text-xs font-semibold tracking-widest text-white/25">
                      {s.n}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {s.desc}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-gold opacity-0 transition-all duration-500 group-hover:opacity-100">
                    Conocer más
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
