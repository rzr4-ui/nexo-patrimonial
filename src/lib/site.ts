// Centralized brand + content config for Nexo Patrimonial
// ────────────────────────────────────────────────────────────
// 👉 REEMPLAZA los valores marcados con "PLACEHOLDER" por los reales.

// Número de WhatsApp en formato internacional SIN signos, espacios ni "+".
// Ej. para +52 55 1234 5678  ->  "525512345678"
const WHATSAPP_NUMBER = "527771625574";

// Access key de Web3Forms — los leads llegan a contacto@nexopatrimonial.tech
// (formulario "NexoPat"). La key es pública/frontend; solo permite enviar.
export const WEB3FORMS_KEY = "e80a93fc-6710-4cb8-9c6c-baf8ebcf7c1d";

/** Construye un enlace de WhatsApp con un mensaje prellenado. */
export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const SITE = {
  name: "Nexo Patrimonial",
  tagline: "Patrimonio 360°",
  phone: "+52 777 162 5574",
  phoneHref: "+527771625574",
  whatsapp: "+52 777 162 5574",
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappHref: waLink("Hola Nexo Patrimonial, quiero agendar una asesoría."),
  email: "contacto@nexopatrimonial.tech",
  social: {
    tiktok: "https://vt.tiktok.com/ZSCKuny7H/",
    linkedin: "https://www.linkedin.com", // PLACEHOLDER
    instagram: "https://www.instagram.com", // PLACEHOLDER
    facebook: "https://www.facebook.com", // PLACEHOLDER
    youtube: "https://www.youtube.com", // PLACEHOLDER
  },
};

export const NAV_LINKS = [
  { label: "Patrimonio 360°", href: "#patrimonio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Tecnología", href: "#tecnologia" },
  { label: "Proceso", href: "#proceso" },
  { label: "Oportunidades", href: "#oportunidades" },
  { label: "Asesor IA", href: "#asesor-ia" },
];
