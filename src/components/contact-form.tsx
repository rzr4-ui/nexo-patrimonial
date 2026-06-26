"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { WEB3FORMS_KEY, waLink } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

const KEY_MISSING =
  !WEB3FORMS_KEY || WEB3FORMS_KEY.startsWith("REEMPLAZAR");

const INTERESES = [
  "Remates Bancarios",
  "Venta de Residencias",
  "Inversiones Inmobiliarias",
  "Asesoría Patrimonial",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    // Fallback: si aún no se configura la key de Web3Forms, enviamos por WhatsApp.
    if (KEY_MISSING) {
      const msg =
        `Hola Nexo Patrimonial, solicito una asesoría.\n\n` +
        `• Nombre: ${data.nombre || "—"}\n` +
        `• Teléfono: ${data.telefono || "—"}\n` +
        `• Email: ${data.email || "—"}\n` +
        `• Interés: ${data.interes || "—"}\n` +
        `• Mensaje: ${data.mensaje || "—"}`;
      window.open(waLink(msg), "_blank", "noopener,noreferrer");
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "Nueva solicitud de asesoría — Nexo Patrimonial",
          from_name: "Sitio Nexo Patrimonial",
          ...data,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.message || "No se pudo enviar. Intenta de nuevo.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Error de conexión. Revisa tu internet e intenta de nuevo.");
    }
  }

  return (
    <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-luxe backdrop-blur-xl sm:p-9">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-navy">
              <Check size={30} />
            </span>
            <h3 className="mt-6 text-2xl font-bold text-white">
              ¡Mensaje enviado!
            </h3>
            <p className="mt-3 max-w-xs text-sm text-white/60">
              Gracias por tu interés. Un asesor patrimonial te contactará muy
              pronto.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-7 text-sm font-semibold text-gold hover:text-gold-400"
            >
              Enviar otra solicitud
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div>
              <h3 className="text-xl font-bold text-white">
                Agenda tu asesoría sin costo
              </h3>
              <p className="mt-1 text-sm text-white/55">
                Déjanos tus datos y te contactamos en menos de 24 h.
              </p>
            </div>

            {/* Honeypot anti-spam */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <label htmlFor="nombre" className="sr-only">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  required
                  placeholder="Nombre completo"
                  className={inputCls}
                />
              </Field>
              <Field>
                <label htmlFor="telefono" className="sr-only">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  placeholder="Teléfono / WhatsApp"
                  className={inputCls}
                />
              </Field>
            </div>

            <Field>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Correo electrónico"
                className={inputCls}
              />
            </Field>

            <Field>
              <label htmlFor="interes" className="sr-only">
                Interés
              </label>
              <select id="interes" name="interes" required defaultValue="" className={inputCls}>
                <option value="" disabled>
                  ¿En qué estás interesado?
                </option>
                {INTERESES.map((i) => (
                  <option key={i} value={i} className="text-navy">
                    {i}
                  </option>
                ))}
              </select>
            </Field>

            <Field>
              <label htmlFor="mensaje" className="sr-only">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={3}
                placeholder="Cuéntanos brevemente tu objetivo (opcional)"
                className={`${inputCls} resize-none`}
              />
            </Field>

            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={15} /> {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-navy transition-all duration-300 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Enviando…
                </>
              ) : (
                <>
                  Solicitar asesoría
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
            <p className="text-center text-[0.7rem] leading-relaxed text-white/35">
              Al enviar aceptas ser contactado por Nexo Patrimonial. Tus datos
              se tratan de forma confidencial.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder-white/40 outline-none transition-all focus:border-gold/60 focus:bg-white/[0.06] [&>option]:text-navy";

function Field({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}
