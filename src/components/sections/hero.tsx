"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80"
          alt="Arquitectura residencial de lujo"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-navy/25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/30 to-navy/55" />
      <div className="absolute inset-0 -z-10 luxe-grid opacity-40" />

      {/* Floating gold accent */}
      <div className="pointer-events-none absolute right-[8%] top-1/4 -z-10 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-7xl px-6 pt-28 lg:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="mb-7 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-gold" />
          <span className="eyebrow text-gold">Patrimonio 360°</span>
        </motion.div>

        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
          {["Conectamos Personas con", "Oportunidades que", "Construyen Patrimonio."].map(
            (line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.35 + i * 0.15 }}
                className="block"
              >
                {i === 2 ? (
                  <span className="text-gold-gradient">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            )
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.9 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Remates bancarios, inversión inmobiliaria, venta de residencias y
          asesoría patrimonial integral.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.05 }}
          className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a
            href="#contacto"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-navy shadow-[0_20px_50px_-15px_rgba(200,161,90,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
          >
            Agenda una Asesoría
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#oportunidades"
            className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/5"
          >
            Explorar Oportunidades
          </a>
        </motion.div>

        {/* Mini trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-7 text-white/55"
        >
          {[
            ["+$350M", "En operaciones"],
            ["+500", "Clientes"],
            ["+15 años", "Experiencia"],
          ].map(([k, v]) => (
            <div key={v} className="flex items-baseline gap-2.5">
              <span className="text-xl font-bold text-white">{k}</span>
              <span className="text-xs uppercase tracking-wider">{v}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#patrimonio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 lg:flex"
        aria-label="Desplázate"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
