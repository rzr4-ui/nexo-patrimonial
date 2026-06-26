"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { SITE } from "@/lib/site";
import { ContactForm } from "@/components/contact-form";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CTA() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-navy py-24 lg:py-32"
    >
      <Image
        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/90 to-navy" />
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        {/* Left — emotional + direct contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span className="eyebrow text-gold">Patrimonio 360°</span>
          <h2 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Construyamos tu{" "}
            <span className="text-gold-gradient">próximo patrimonio</span>.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
            Agenda una asesoría sin costo con uno de nuestros especialistas y
            descubre las oportunidades que pueden transformar tu futuro
            financiero.
          </p>

          {/* Direct contact channels */}
          <div className="mt-9 space-y-3">
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-gold/40 hover:bg-white/[0.06]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                <MessageCircle size={20} />
              </span>
              <span>
                <span className="block text-[0.7rem] uppercase tracking-wider text-white/45">
                  Hablar con un asesor
                </span>
                <span className="font-semibold text-white">
                  WhatsApp · {SITE.whatsapp}
                </span>
              </span>
            </a>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${SITE.phoneHref}`}
                className="group flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-gold/40"
              >
                <Phone size={18} className="text-gold" />
                <span className="text-sm font-medium text-white">
                  {SITE.phone}
                </span>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="group flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-gold/40"
              >
                <Mail size={18} className="text-gold" />
                <span className="truncate text-sm font-medium text-white">
                  {SITE.email}
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
