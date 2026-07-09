import { Phone, Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/logo";
import { NAV_LINKS, SITE } from "@/lib/site";

type IconProps = { size?: number; className?: string };

const Tiktok = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M16.5 3c.29 2.06 1.44 3.3 3.44 3.43v2.32c-1.16.11-2.18-.27-3.36-.99v5.99c0 3.79-3.32 5.34-6.07 4.66-2.31-.57-3.77-2.66-3.5-5.06.27-2.4 2.37-4.15 4.85-3.86v2.5c-.3-.05-.62-.09-.94-.06-1.12.11-1.98.98-1.93 2.12.05 1.14.94 1.96 2.11 1.9 1.19-.06 2.05-.99 2.05-2.36V3h3.35z" />
  </svg>
);

const SERVICES = [
  "Remates Bancarios",
  "Venta de Residencias",
  "Inversiones Inmobiliarias",
  "Asesoría Patrimonial",
];

export function Footer() {
  const year = 2026;
  return (
    <footer className="relative bg-navy-800 text-white/70">
      <div className="hairline" />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo className="text-white" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
              Conectamos personas con oportunidades inmobiliarias que generan
              riqueza, seguridad y crecimiento financiero a largo plazo.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Tiktok, href: SITE.social.tiktok, label: "TikTok" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Navegación
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="transition-colors hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Servicios
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICES.map((s) => (
                <li key={s}>
                  <a href="#servicios" className="transition-colors hover:text-gold">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Contacto
            </h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                >
                  <MessageCircle size={16} className="text-gold" />
                  WhatsApp · {SITE.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                >
                  <Phone size={16} className="text-gold" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                >
                  <Mail size={16} className="text-gold" />
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-white/40 sm:flex-row">
            <p>
              © {year} {SITE.name}. {SITE.tagline}. Todos los derechos
              reservados.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <a href="#" className="transition-colors hover:text-white/70">
                Aviso de Privacidad
              </a>
              <a href="#" className="transition-colors hover:text-white/70">
                Términos y Condiciones
              </a>
              <a href="#" className="transition-colors hover:text-white/70">
                Política de Cookies
              </a>
            </div>
          </div>
          <p className="mt-6 max-w-4xl text-[0.7rem] leading-relaxed text-white/30">
            La información presentada en este sitio tiene fines informativos y no
            constituye una oferta vinculante ni asesoría financiera, legal o
            fiscal individualizada. Los rendimientos (ROI) mostrados son
            estimaciones de referencia y no garantizan resultados futuros. Toda
            operación se encuentra sujeta a disponibilidad, validación jurídica y
            análisis particular de cada activo.
          </p>
        </div>
      </div>
    </footer>
  );
}
