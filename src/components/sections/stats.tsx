"use client";

import { CountUp } from "@/components/motion/count-up";
import { staggerContainer, staggerItem } from "@/components/motion/reveal";
import { motion } from "framer-motion";

const STATS = [
  { to: 500, prefix: "+", suffix: "", label: "Clientes Atendidos" },
  { to: 350, prefix: "+$", suffix: "M", label: "En Operaciones" },
  { to: 98, prefix: "", suffix: "%", label: "Satisfacción" },
  { to: 15, prefix: "+", suffix: " Años", label: "Experiencia Acumulada" },
];

export function Stats() {
  return (
    <section className="relative border-y border-navy/5 bg-cloud py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              variants={staggerItem}
              className={`flex flex-col items-center text-center lg:items-start lg:text-left ${
                i !== STATS.length - 1 ? "lg:border-r lg:border-navy/10" : ""
              }`}
            >
              <div className="text-5xl font-bold tracking-tight text-navy lg:text-6xl">
                <CountUp
                  to={s.to}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  duration={2.2}
                />
              </div>
              <div className="mt-3 h-px w-12 bg-gold" />
              <p className="mt-3 text-sm font-medium uppercase tracking-wider text-navy/55">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
