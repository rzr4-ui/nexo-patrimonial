"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Home, TrendingUp, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const PILLARS = [
  {
    key: "remates",
    label: "Remates Bancarios",
    icon: Landmark,
    angle: -90,
    desc: "Identificamos activos bancarios y distressed con descuentos reales y alto potencial de plusvalía, validados jurídica y financieramente.",
  },
  {
    key: "residencial",
    label: "Residencial",
    icon: Home,
    angle: 0,
    desc: "Residencias seleccionadas para habitar o invertir, en ubicaciones con demanda sostenida y revalorización a largo plazo.",
  },
  {
    key: "inversiones",
    label: "Inversiones",
    icon: TrendingUp,
    angle: 90,
    desc: "Estrategias inmobiliarias diseñadas para generar flujo, diversificar y hacer crecer tu capital de forma estructurada.",
  },
  {
    key: "asesoria",
    label: "Asesoría Patrimonial",
    icon: ShieldCheck,
    angle: 180,
    desc: "Planeación, blindaje y sucesión patrimonial para proteger lo que construyes y trascender a la siguiente generación.",
  },
] as const;

const RADIUS = 150;

export function Patrimonio360() {
  const [active, setActive] = useState(0);
  const current = PILLARS[active];

  return (
    <section
      id="patrimonio"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow text-gold-600">Por qué Nexo</span>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Patrimonio <span className="text-gold-gradient">360°</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-navy/60 sm:text-lg">
            Acompañamos a nuestros clientes en cada etapa de la creación de
            riqueza. Un ecosistema integral que conecta oportunidad, estrategia
            y protección alrededor de un solo eje: tu patrimonio.
          </p>
        </Reveal>

        <div className="mt-16 grid items-center gap-14 lg:mt-20 lg:grid-cols-2">
          {/* Circular diagram */}
          <Reveal direction="right" className="flex justify-center">
            <div className="relative aspect-square w-[330px] sm:w-[420px]">
              {/* Rotating rings */}
              <div className="animate-spin-slow absolute inset-6 rounded-full border border-dashed border-navy/10" />
              <div className="animate-spin-slower-rev absolute inset-16 rounded-full border border-gold/20" />

              {/* Connector lines */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 420 420"
                fill="none"
              >
                {PILLARS.map((p, i) => {
                  const rad = (p.angle * Math.PI) / 180;
                  const cx = 210 + Math.cos(rad) * RADIUS;
                  const cy = 210 + Math.sin(rad) * RADIUS;
                  return (
                    <line
                      key={p.key}
                      x1="210"
                      y1="210"
                      x2={cx}
                      y2={cy}
                      stroke={i === active ? "#C8A15A" : "#0d1b2a"}
                      strokeOpacity={i === active ? 0.6 : 0.1}
                      strokeWidth={i === active ? 2 : 1}
                      className="transition-all duration-500"
                    />
                  );
                })}
              </svg>

              {/* Center NEXO */}
              <div className="absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-navy text-white shadow-luxe sm:h-32 sm:w-32">
                <span className="text-[0.6rem] tracking-[0.3em] text-gold">
                  NEXO
                </span>
                <span className="text-[0.55rem] tracking-[0.2em] text-white/50">
                  360°
                </span>
              </div>

              {/* Nodes */}
              {PILLARS.map((p, i) => {
                const rad = (p.angle * Math.PI) / 180;
                const Icon = p.icon;
                const isActive = i === active;
                return (
                  <button
                    key={p.key}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-label={p.label}
                    className="group absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                    style={{
                      transform: `translate(calc(-50% + ${
                        Math.cos(rad) * RADIUS
                      }px), calc(-50% + ${Math.sin(rad) * RADIUS}px))`,
                    }}
                  >
                    <span
                      className={`flex h-16 w-16 items-center justify-center rounded-full border transition-all duration-400 sm:h-[4.5rem] sm:w-[4.5rem] ${
                        isActive
                          ? "scale-110 border-gold bg-gold text-navy shadow-[0_15px_35px_-10px_rgba(200,161,90,0.7)]"
                          : "border-navy/10 bg-white text-navy shadow-card group-hover:border-gold/50"
                      }`}
                    >
                      <Icon size={26} strokeWidth={1.6} />
                    </span>
                    <span
                      className={`mt-2 max-w-[5.5rem] text-center text-[0.68rem] font-semibold leading-tight transition-colors ${
                        isActive ? "text-navy" : "text-navy/50"
                      }`}
                    >
                      {p.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Description panel */}
          <Reveal direction="left">
            <div className="relative rounded-3xl border border-navy/5 bg-cloud p-9 lg:p-11">
              <div className="absolute left-9 top-0 h-1 w-16 -translate-y-1/2 rounded-full bg-gold" />
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-gold-600">
                0{active + 1} / 04
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="mt-4 text-2xl font-bold text-navy sm:text-3xl">
                    {current.label}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-navy/65">
                    {current.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex gap-2">
                {PILLARS.map((p, i) => (
                  <button
                    key={p.key}
                    onClick={() => setActive(i)}
                    aria-label={`Ver ${p.label}`}
                    className={`h-1.5 rounded-full transition-all duration-400 ${
                      i === active ? "w-10 bg-gold" : "w-4 bg-navy/15"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
