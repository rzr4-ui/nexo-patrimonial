"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Wallet,
  MapPin,
  Target,
  ArrowLeft,
  Check,
  TrendingUp,
  RefreshCw,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { waLink } from "@/lib/site";

type Opt = { value: string; label: string };

const BUDGETS: Opt[] = [
  { value: "lt5", label: "Hasta $5M MXN" },
  { value: "5-10", label: "$5M – $10M MXN" },
  { value: "10-20", label: "$10M – $20M MXN" },
  { value: "gt20", label: "Más de $20M MXN" },
];

const LOCATIONS: Opt[] = [
  { value: "cdmx", label: "CDMX" },
  { value: "edomex", label: "Edo. de México" },
  { value: "jalisco", label: "Guadalajara / Jalisco" },
  { value: "caribe", label: "Caribe Mexicano" },
];

const GOALS: Opt[] = [
  { value: "plusvalia", label: "Máxima plusvalía" },
  { value: "flujo", label: "Flujo / Renta" },
  { value: "vivir", label: "Vivir en ella" },
  { value: "diversificar", label: "Diversificar capital" },
];

type Rec = {
  title: string;
  location: string;
  roi: string;
  match: number;
  tag: string;
};

const ALL_RECS: Rec[] = [
  { title: "Residencia Bosque Real", location: "Huixquilucan, Edo. Méx.", roi: "21% ROI", match: 96, tag: "Remate Bancario" },
  { title: "Torre Inversión Reforma", location: "Reforma, CDMX", roi: "18% ROI", match: 92, tag: "Inversión" },
  { title: "Villa Punta Esmeralda", location: "Playa del Carmen", roi: "26% ROI", match: 89, tag: "Pre-venta" },
  { title: "Residencia Valle Real", location: "Zapopan, Jalisco", roi: "19% ROI", match: 88, tag: "Remate Bancario" },
];

const STEPS = [
  { key: "budget", title: "¿Cuál es tu presupuesto?", icon: Wallet, options: BUDGETS },
  { key: "location", title: "¿Dónde quieres invertir?", icon: MapPin, options: LOCATIONS },
  { key: "goal", title: "¿Cuál es tu objetivo?", icon: Target, options: GOALS },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export function Finder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"form" | "loading" | "results">("form");

  const current = STEPS[step];
  const progress = ((step + (phase === "form" ? 0 : 1)) / STEPS.length) * 100;

  const select = (value: string) => {
    const next = { ...answers, [current.key]: value };
    setAnswers(next);
    if (step < STEPS.length - 1) {
      setTimeout(() => setStep(step + 1), 220);
    } else {
      setPhase("loading");
      setTimeout(() => setPhase("results"), 2100);
    }
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    setPhase("form");
  };

  return (
    <section
      id="asesor-ia"
      className="relative overflow-hidden bg-navy py-24 lg:py-32"
    >
      <div className="absolute inset-0 luxe-grid opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-gold">
            <Sparkles size={15} />
            <span className="text-xs font-semibold tracking-wider">
              Asesor Patrimonial IA
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Encuentra tu próxima{" "}
            <span className="text-gold-gradient">oportunidad</span>.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/60">
            Responde tres preguntas y nuestro motor patrimonial seleccionará los
            activos con mejor encaje para tu perfil.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-luxe backdrop-blur-xl">
          {/* Progress bar */}
          <div className="h-1 w-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-400 to-gold-600"
              animate={{ width: `${phase === "results" ? 100 : progress}%` }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>

          <div className="p-8 sm:p-11">
            <AnimatePresence mode="wait">
              {phase === "form" && (
                <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <div className="flex items-center gap-3 text-gold">
                    <current.icon size={20} />
                    <span className="text-xs font-semibold tracking-widest text-white/40">
                      PASO {step + 1} DE {STEPS.length}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                    {current.title}
                  </h3>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {current.options.map((opt) => {
                      const selected = answers[current.key] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => select(opt.value)}
                          className={`group flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all duration-300 ${
                            selected
                              ? "border-gold bg-gold text-navy"
                              : "border-white/10 bg-white/[0.03] text-white hover:border-gold/50 hover:bg-white/[0.07]"
                          }`}
                        >
                          {opt.label}
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
                              selected
                                ? "border-navy bg-navy text-gold"
                                : "border-white/20 text-transparent group-hover:border-gold"
                            }`}
                          >
                            <Check size={13} />
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {step > 0 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white"
                    >
                      <ArrowLeft size={16} />
                      Anterior
                    </button>
                  )}
                </motion.div>
              )}

              {phase === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-14 text-center"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
                    className="text-gold"
                  >
                    <Loader2 size={42} strokeWidth={1.5} />
                  </motion.span>
                  <p className="mt-6 text-lg font-semibold text-white">
                    Analizando oportunidades…
                  </p>
                  <div className="mt-5 w-full max-w-xs space-y-2 text-left">
                    {[
                      "Cruzando 1,240 activos disponibles",
                      "Validando perfil jurídico y plusvalía",
                      "Calculando encaje patrimonial",
                    ].map((t, i) => (
                      <motion.div
                        key={t}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.5 }}
                        className="flex items-center gap-2 text-xs text-white/55"
                      >
                        <Check size={13} className="text-gold" />
                        {t}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {phase === "results" && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div className="flex items-center gap-2 text-gold">
                    <Sparkles size={18} />
                    <span className="text-sm font-semibold">
                      {ALL_RECS.length} oportunidades para ti
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {ALL_RECS.map((r, i) => (
                      <motion.div
                        key={r.title}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, ease: EASE }}
                        className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-gold/40 hover:bg-white/[0.06]"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="truncate font-semibold text-white">
                              {r.title}
                            </span>
                            <span className="shrink-0 rounded-full bg-gold/15 px-2 py-0.5 text-[0.6rem] font-semibold text-gold">
                              {r.tag}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-3 text-xs text-white/50">
                            <span className="flex items-center gap-1">
                              <MapPin size={11} /> {r.location}
                            </span>
                            <span className="flex items-center gap-1 text-gold">
                              <TrendingUp size={11} /> {r.roi}
                            </span>
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="text-lg font-bold text-gold">
                            {r.match}%
                          </div>
                          <div className="text-[0.6rem] uppercase tracking-wider text-white/40">
                            encaje
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={waLink(
                        `Hola Nexo Patrimonial, usé el Asesor IA y me interesa una asesoría.\n\n` +
                          `• Presupuesto: ${BUDGETS.find((o) => o.value === answers.budget)?.label ?? "—"}\n` +
                          `• Zona: ${LOCATIONS.find((o) => o.value === answers.location)?.label ?? "—"}\n` +
                          `• Objetivo: ${GOALS.find((o) => o.value === answers.goal)?.label ?? "—"}\n\n` +
                          `¿Me pueden contactar con las oportunidades recomendadas?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy transition-all hover:bg-gold-400"
                    >
                      <MessageCircle size={16} />
                      Hablar por WhatsApp con esta selección
                    </a>
                    <button
                      onClick={reset}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40"
                    >
                      <RefreshCw size={15} />
                      Reiniciar
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
