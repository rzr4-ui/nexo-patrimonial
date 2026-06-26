"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useReducedMotion,
} from "framer-motion";
import {
  Database,
  ShieldCheck,
  ScanLine,
  Scale,
  FileSearch,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Gauge,
  Play,
  RotateCcw,
  ArrowLeft,
  Landmark,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";

const EASE = [0.22, 1, 0.36, 1] as const;

const PHASES = [
  { key: "connect", label: "Conexión", icon: Database, ms: 4600 },
  { key: "legal", label: "Análisis Jurídico", icon: Scale, ms: 6200 },
  { key: "scoring", label: "Scoring de Riesgo", icon: Gauge, ms: 4800 },
  { key: "result", label: "Resultado", icon: ShieldCheck, ms: 7000 },
] as const;

/* ────────────────────────── helpers ────────────────────────── */

function useCount(active: boolean, to: number, dur = 1.6) {
  const [v, setV] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!active) return; // initial state is already 0
    if (reduce) {
      const id = requestAnimationFrame(() => setV(to));
      return () => cancelAnimationFrame(id);
    }
    const controls = animate(0, to, {
      duration: dur,
      ease: EASE,
      onUpdate: (x) => setV(x),
    });
    return () => controls.stop();
  }, [active, to, dur, reduce]);
  return v;
}

const fmt = (n: number) =>
  Math.round(n).toLocaleString("en-US");

/* ────────────────────────── main ────────────────────────── */

export function Simulator() {
  const [phase, setPhase] = useState(0);
  const [runId, setRunId] = useState(0);
  const [paused, setPaused] = useState(false);

  // Orchestrator: auto-advance, loop back from last phase
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => {
      setPhase((p) => {
        if (p >= PHASES.length - 1) {
          setRunId((r) => r + 1);
          return 0;
        }
        return p + 1;
      });
    }, PHASES[phase].ms);
    return () => clearTimeout(id);
  }, [phase, paused, runId]);

  const jump = (i: number) => {
    setPhase(i);
    setRunId((r) => r + 1);
  };
  const replay = () => {
    setPhase(0);
    setRunId((r) => r + 1);
    setPaused(false);
  };

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-navy px-4 py-8 lg:px-8">
      {/* ambient bg */}
      <div className="absolute inset-0 luxe-grid opacity-30" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-gold/10 blur-[160px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-navy-600/40 blur-[160px]" />

      {/* top utility bar */}
      <div className="relative z-10 mb-4 flex w-full max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft size={15} /> Volver al sitio
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaused((p) => !p)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-gold/50 hover:text-white"
          >
            <Play size={13} /> {paused ? "Reanudar" : "Pausar"}
          </button>
          <button
            onClick={replay}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-gold/50 hover:text-white"
          >
            <RotateCcw size={13} /> Reiniciar
          </button>
        </div>
      </div>

      {/* App window */}
      <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-navy-800/80 shadow-luxe backdrop-blur-xl">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-white/8 bg-navy-700/60 px-5 py-3">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex items-center gap-2 font-mono text-[0.72rem] text-white/55">
              <ScanLine size={13} className="text-gold" />
              nexo://risk-engine · análisis de remates bancarios
            </div>
          </div>
          <Logo className="hidden text-white sm:flex" showTagline={false} />
        </div>

        {/* progress steps */}
        <div className="flex border-b border-white/8 bg-navy-800/40">
          {PHASES.map((p, i) => {
            const Icon = p.icon;
            const active = i === phase;
            const done = i < phase;
            return (
              <button
                key={p.key}
                onClick={() => jump(i)}
                className={`group relative flex flex-1 items-center justify-center gap-2 px-2 py-3 text-[0.68rem] font-semibold uppercase tracking-wider transition-colors sm:text-xs ${
                  active
                    ? "text-gold"
                    : done
                      ? "text-white/55"
                      : "text-white/30"
                }`}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{p.label}</span>
                <span className="sm:hidden">{i + 1}</span>
                {active && (
                  <motion.span
                    layoutId="phase-underline"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gold"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* stage */}
        <div
          className="relative overflow-hidden"
          style={{ height: "clamp(520px, 60vh, 560px)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${phase}-${runId}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-0 p-6 sm:p-9"
            >
              {phase === 0 && <ConnectScene />}
              {phase === 1 && <LegalScene />}
              {phase === 2 && <ScoringScene />}
              {phase === 3 && <ResultScene />}
            </motion.div>
          </AnimatePresence>

          {/* scanline overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px] opacity-40" />
        </div>
      </div>

      {/* caption */}
      <p className="relative z-10 mt-4 max-w-2xl text-center font-mono text-[0.7rem] leading-relaxed text-white/35">
        Simulación ilustrativa del proceso de análisis de Nexo Patrimonial ·
        Cifras y fuentes con fines demostrativos
      </p>
    </div>
  );
}

/* ────────────────────────── Scene 1: Connect ────────────────────────── */

const SOURCES = [
  "Banca comercial (carteras vencidas)",
  "INFONAVIT · FOVISSSTE",
  "SAE — Servicio de Administración de Bienes",
  "Subastas y juzgados civiles",
  "Fideicomisos y SOFOMES",
];

function ConnectScene() {
  const count = useCount(true, 1240, 2.4);
  return (
    <div className="grid h-full gap-6 lg:grid-cols-2">
      <div>
        <SceneTitle icon={Database} kicker="Fase 01 — Ingesta de datos">
          Conectando a fuentes de remates
        </SceneTitle>
        <div className="mt-6 space-y-2.5">
          {SOURCES.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.45, ease: EASE }}
              className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3"
            >
              <span className="font-mono text-[0.78rem] text-white/75">{s}</span>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.45 + 0.35 }}
                className="flex items-center gap-1.5 font-mono text-[0.65rem] font-semibold text-[#28c840]"
              >
                <CheckCircle2 size={13} /> CONECTADO
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-navy/40 p-8">
        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-white/40">
          Propiedades ingestadas
        </span>
        <div className="mt-3 text-6xl font-bold tabular-nums text-gold sm:text-7xl">
          {fmt(count)}
        </div>
        <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.6, ease: EASE }}
            className="h-full bg-gradient-to-r from-gold-400 to-gold-600"
          />
        </div>
        <span className="mt-3 font-mono text-[0.68rem] text-white/40">
          Normalizando registros y geolocalizando activos…
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────── Scene 2: Legal ────────────────────────── */

const CHECKS = [
  { label: "Título de propiedad", detail: "Folio real verificado", ok: true },
  { label: "Gravámenes y embargos", detail: "Hipoteca liberable identificada", ok: true },
  { label: "Juicios y litigios", detail: "Sin litigio activo en tribunales", ok: true },
  { label: "Posesión física", detail: "Inmueble desocupado", ok: true },
  { label: "Adeudos predial / agua", detail: "Cuantificados y previstos", ok: true },
  { label: "Avalúo vs. precio de remate", detail: "Descuento del 38% sobre avalúo", ok: true },
];

function LegalScene() {
  const risk = useCount(true, 12, 4.2); // ends at "12 / 100" = bajo
  return (
    <div className="grid h-full gap-6 lg:grid-cols-2">
      <div className="min-h-0">
        <SceneTitle icon={FileSearch} kicker="Fase 02 — Due diligence jurídico">
          Validando riesgos legales
        </SceneTitle>

        <div className="mt-5 rounded-lg border border-gold/20 bg-gold/[0.06] px-4 py-2.5 font-mono text-[0.72rem] text-gold">
          ▸ Analizando: Residencia Bosque Real · Huixquilucan, Edo. Méx.
        </div>

        <div className="mt-4 space-y-2">
          {CHECKS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.55, ease: EASE }}
              className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.03] px-4 py-2.5"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.55 + 0.3, type: "spring", stiffness: 300 }}
                className="text-[#28c840]"
              >
                <CheckCircle2 size={17} />
              </motion.span>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[0.78rem] text-white/80">
                  {c.label}
                </div>
                <div className="font-mono text-[0.66rem] text-white/40">
                  {c.detail}
                </div>
              </div>
              <span className="font-mono text-[0.62rem] font-semibold text-[#28c840]">
                OK
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Risk gauge */}
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-navy/40 p-6">
        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-white/40">
          Índice de riesgo jurídico
        </span>
        <div className="relative mt-6 h-32 w-56">
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
              pathLength={1}
              initial={{ pathLength: 0.88 }}
              animate={{ pathLength: 0.12 }}
              transition={{ duration: 4, ease: EASE }}
            />
          </svg>
          <div className="absolute inset-x-0 bottom-0 text-center">
            <div className="text-4xl font-bold tabular-nums text-[#28c840]">
              {fmt(risk)}
              <span className="text-lg text-white/40">/100</span>
            </div>
          </div>
        </div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#28c840]/15 px-4 py-1.5 font-mono text-[0.72rem] font-semibold text-[#28c840]">
          <ShieldCheck size={14} /> RIESGO MITIGADO
        </div>
        <p className="mt-4 text-center font-mono text-[0.66rem] leading-relaxed text-white/40">
          7 variables jurídicas evaluadas y respaldadas por análisis legal
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────── Scene 3: Scoring ────────────────────────── */

// deterministic risk distribution for 64 cells
const CELLS = Array.from({ length: 64 }, (_, i) => {
  const m = i % 7;
  if (m === 0 || m === 3) return "high"; // red
  if (m === 5) return "med"; // amber
  return "low"; // green
});
const colorOf: Record<string, string> = {
  high: "#ff5f57",
  med: "#febc2e",
  low: "#28c840",
};

function ScoringScene() {
  const highN = CELLS.filter((c) => c === "high").length;
  const medN = CELLS.filter((c) => c === "med").length;
  const lowN = CELLS.filter((c) => c === "low").length;
  const high = useCount(true, highN, 1.6);
  const med = useCount(true, medN, 1.6);
  const low = useCount(true, lowN, 1.6);

  return (
    <div className="grid h-full gap-6 lg:grid-cols-2">
      <div>
        <SceneTitle icon={Gauge} kicker="Fase 03 — Clasificación de cartera">
          Scoring de riesgo masivo
        </SceneTitle>
        <div className="mt-6 grid grid-cols-8 gap-1.5">
          {CELLS.map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.3, backgroundColor: "#243a55" }}
              animate={{
                opacity: c === "high" ? 0.25 : 1,
                scale: 1,
                backgroundColor: colorOf[c],
              }}
              transition={{ delay: (i % 8) * 0.04 + Math.floor(i / 8) * 0.05, ease: EASE }}
              className="aspect-square rounded-[3px]"
            />
          ))}
        </div>
        <p className="mt-5 font-mono text-[0.68rem] text-white/40">
          ▸ Descartando activos de alto riesgo (litigios, invasión, vicios de
          título)…
        </p>
      </div>

      <div className="flex flex-col justify-center gap-3">
        <ScoreRow
          color="#ff5f57"
          icon={XCircle}
          n={high}
          label="Alto riesgo — descartadas"
          tag="EXCLUIDAS"
        />
        <ScoreRow
          color="#febc2e"
          icon={AlertTriangle}
          n={med}
          label="Riesgo medio — en observación"
          tag="REVISIÓN"
        />
        <ScoreRow
          color="#28c840"
          icon={CheckCircle2}
          n={low}
          label="Aptas — riesgo mitigado"
          tag="APROBADAS"
          highlight
        />
      </div>
    </div>
  );
}

function ScoreRow({
  color,
  icon: Icon,
  n,
  label,
  tag,
  highlight,
}: {
  color: string;
  icon: typeof XCircle;
  n: number;
  label: string;
  tag: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-xl border px-5 py-4 ${
        highlight
          ? "border-[#28c840]/40 bg-[#28c840]/[0.08]"
          : "border-white/8 bg-white/[0.03]"
      }`}
    >
      <Icon size={22} style={{ color }} />
      <div className="flex-1">
        <div className="text-3xl font-bold tabular-nums text-white">
          {fmt(n)}
        </div>
        <div className="font-mono text-[0.68rem] text-white/50">{label}</div>
      </div>
      <span
        className="rounded-full px-2.5 py-1 font-mono text-[0.58rem] font-semibold"
        style={{ color, backgroundColor: `${color}22` }}
      >
        {tag}
      </span>
    </div>
  );
}

/* ────────────────────────── Scene 4: Result ────────────────────────── */

function ResultScene() {
  const apt = useCount(true, 37, 1.8);
  const roi = useCount(true, 22, 1.8);
  const desc = useCount(true, 38, 1.8);
  const plus = useCount(true, 350, 1.8);

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <motion.span
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-navy shadow-[0_0_50px_-5px_rgba(200,161,90,0.7)]"
      >
        <ShieldCheck size={32} />
      </motion.span>

      <h3 className="mt-6 max-w-xl text-2xl font-bold leading-tight text-white sm:text-3xl">
        <span className="tabular-nums text-gold">{fmt(apt)}</span> oportunidades
        viables con{" "}
        <span className="text-gold-gradient">riesgo mitigado</span>
      </h3>
      <p className="mt-3 max-w-md font-mono text-[0.72rem] text-white/45">
        Filtradas de 1,240 activos · validadas jurídica y financieramente
      </p>

      <div className="mt-8 grid w-full max-w-2xl grid-cols-3 gap-3">
        <Metric icon={TrendingUp} value={`${fmt(roi)}%`} label="ROI promedio est." />
        <Metric icon={Landmark} value={`${fmt(desc)}%`} label="Descuento vs. avalúo" />
        <Metric icon={Database} value={`$${fmt(plus)}M`} label="En operaciones" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, ease: EASE }}
        className="mt-8 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/[0.06] px-6 py-3"
      >
        <Logo className="text-white" showTagline={false} />
        <span className="h-4 w-px bg-white/15" />
        <span className="font-mono text-[0.7rem] font-semibold tracking-wider text-gold">
          ANÁLISIS VALIDADO
        </span>
      </motion.div>
    </div>
  );
}

function Metric({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof TrendingUp;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
      <Icon size={18} className="mx-auto text-gold" />
      <div className="mt-2 text-2xl font-bold tabular-nums text-white">
        {value}
      </div>
      <div className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-white/45">
        {label}
      </div>
    </div>
  );
}

/* ────────────────────────── shared ────────────────────────── */

function SceneTitle({
  icon: Icon,
  kicker,
  children,
}: {
  icon: typeof Database;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-gold">
        <Icon size={14} /> {kicker}
      </div>
      <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
        {children}
      </h3>
    </div>
  );
}
