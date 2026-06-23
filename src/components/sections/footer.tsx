import { Phone, Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/logo";
import { NAV_LINKS, SITE } from "@/lib/site";

type IconProps = { size?: number; className?: string };

const Linkedin = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.4 8.65 22 11 22 14.1V21h-4v-6.1c0-1.46-.03-3.33-2.03-3.33-2.03 0-2.34 1.58-2.34 3.22V21h-4z" />
  </svg>
);
const Instagram = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const Facebook = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M14 9h3V5.5h-3c-2.2 0-3.5 1.4-3.5 3.6V11H8v3.5h2.5V22h3.5v-7.5h2.7l.5-3.5H14V9.3c0-.2.2-.3.5-.3z" />
  </svg>
);
const Youtube = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.6A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.6 7.9.6 7.9.6s6 0 7.9-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22.4 12 31 31 0 0 0 22 8.2zM10 15V9l5.2 3z" />
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
                { Icon: Linkedin, href: SITE.social.linkedin, label: "LinkedIn" },
                { Icon: Instagram, href: SITE.social.instagram, label: "Instagram" },
                { Icon: Facebook, href: SITE.social.facebook, label: "Facebook" },
                { Icon: Youtube, href: SITE.social.youtube, label: "YouTube" },
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
