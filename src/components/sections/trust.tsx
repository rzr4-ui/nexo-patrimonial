"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, Scale, LineChart } from "lucide-react";
import { staggerContainer, staggerItem, Reveal } from "@/components/motion/reveal";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Seguridad",
    desc: "Cada operación se estructura para resguardar tu capital y minimizar riesgos.",
  },
  {
    icon: Eye,
    title: "Transparencia",
    desc: "Información clara y completa en cada etapa. Sin sorpresas, sin letras pequeñas.",
  },
  {
    icon: Scale,
    title: "Respaldo Legal",
    desc: "Due diligence jurídico riguroso que valida títulos, gravámenes y situación legal.",
  },
  {
    icon: LineChart,
    title: "Expertise en Inversión",
    desc: "+15 años convirtiendo oportunidades inmobiliarias en patrimonio real.",
  },
];

export function Trust() {
  return (
    <section id="confianza" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-luxe">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                  alt="Estrategia patrimonial corporativa"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              </div>
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-6 -left-6 rounded-2xl bg-navy p-6 shadow-luxe sm:-left-8"
              >
                <div className="text-3xl font-bold text-gold">98%</div>
                <p className="mt-1 max-w-[8rem] text-xs text-white/70">
                  Clientes que recomiendan Nexo Patrimonial
                </p>
              </motion.div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="mb-5 flex items-center gap-4">
                <span className="h-px w-10 bg-gold" />
                <span className="eyebrow text-gold-600">Confianza</span>
              </div>
              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl">
                Tu patrimonio merece una{" "}
                <span className="text-gold-gradient">estrategia</span>.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-navy/60">
                No vendemos propiedades: diseñamos decisiones inteligentes
                respaldadas por método, datos y rigor legal.
              </p>
            </Reveal>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-10 grid gap-6 sm:grid-cols-2"
            >
              {PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    variants={staggerItem}
                    className="group"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cloud text-gold-600 transition-all duration-300 group-hover:bg-navy group-hover:text-gold">
                      <Icon size={22} strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-navy">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy/60">
                      {p.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
