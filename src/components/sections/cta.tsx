"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CTA() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-navy py-28 lg:py-40"
    >
      <Image
        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/85 to-navy" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[150px]" />

      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span className="eyebrow text-gold">Patrimonio 360°</span>
          <h2 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Construyamos tu{" "}
            <span className="text-gold-gradient">próximo patrimonio</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            Agenda una asesoría sin costo con uno de nuestros especialistas y
            descubre las oportunidades que pueden transformar tu futuro
            financiero.
          </p>

          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-9 py-4 text-sm font-semibold text-navy shadow-[0_20px_50px_-15px_rgba(200,161,90,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
            >
              Hablar con un Asesor
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-9 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/5"
            >
              <MessageCircle size={18} />
              WhatsApp directo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
