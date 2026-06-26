// Centralized brand + content config for Nexo Patrimonial
// ────────────────────────────────────────────────────────────
// 👉 REEMPLAZA los valores marcados con "PLACEHOLDER" por los reales.

// Número de WhatsApp en formato internacional SIN signos, espacios ni "+".
// Ej. para +52 55 1234 5678  ->  "525512345678"
const WHATSAPP_NUMBER = "525512345678"; // PLACEHOLDER

// Access key de Web3Forms (gratis) para recibir el formulario por correo.
// Consíguela en https://web3forms.com poniendo tu email -> te llega la key.
export const WEB3FORMS_KEY = "REEMPLAZAR_CON_TU_ACCESS_KEY"; // PLACEHOLDER

/** Construye un enlace de WhatsApp con un mensaje prellenado. */
export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const SITE = {
  name: "Nexo Patrimonial",
  tagline: "Patrimonio 360°",
  phone: "+52 55 1234 5678", // PLACEHOLDER
  phoneHref: "+525512345678", // PLACEHOLDER
  whatsapp: "+52 55 1234 5678", // PLACEHOLDER (solo para mostrar)
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappHref: waLink("Hola Nexo Patrimonial, quiero agendar una asesoría."),
  email: "contacto@nexopatrimonial.com", // PLACEHOLDER
  social: {
    linkedin: "https://www.linkedin.com", // PLACEHOLDER
    instagram: "https://www.instagram.com", // PLACEHOLDER
    facebook: "https://www.facebook.com", // PLACEHOLDER
    youtube: "https://www.youtube.com", // PLACEHOLDER
  },
};

export const NAV_LINKS = [
  { label: "Patrimonio 360°", href: "#patrimonio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Oportunidades", href: "#oportunidades" },
  { label: "Asesor IA", href: "#asesor-ia" },
];
