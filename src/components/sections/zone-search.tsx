"use client";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/funnel';
import { waLink } from '@/lib/site';

const prices = [3500000, 1850000, 4200000, 2750000, 5100000, 2300000, 6800000, 3150000, 1450000, 3900000, 4650000, 2050000, 5700000, 2950000, 7400000, 1650000, 3850000, 6250000, 2450000, 4900000, 8200000, 3250000, 5550000, 2150000];
const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
export function ZoneSearch() {
  const [query, setQuery] = useState('');
  const [zone, setZone] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('local');
  const [attribution, setAttribution] = useState('');
  const results = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const abort = new AbortController();
    const timer = setTimeout(async () => {
      if (query.trim().length < 3) { setSuggestions([]); return; }
      try {
        const response = await fetch(`/api/zonas?q=${encodeURIComponent(query)}`, { signal: abort.signal });
        const data = await response.json();
        setSuggestions(data.suggestions); setMode(data.mode); setAttribution(data.attribution || ''); setActive(-1);
      } catch { if (!abort.signal.aborted) setSuggestions([]); }
    }, 400);
    return () => { clearTimeout(timer); abort.abort(); };
  }, [query]);
  function explore() {
    if (query.trim().length < 3) return;
    setZone(query.trim()); setOpen(false); track('demo_search', { count: prices.length });
    requestAnimationFrame(() => results.current?.focus());
  }
  function conversation(index?: number) {
    return waLink(`Hola Nexo Patrimonial. Vi las referencias de inversión y me interesa invertir en ${zone}.\n${index === undefined ? '' : `Me llamó la atención la referencia ilustrativa ${String(index + 1).padStart(2, '0')}, con importe ilustrativo de ${money.format(prices[index])} MXN.\n`}Entiendo que las referencias son ilustrativas y no corresponden a inmuebles anunciados. Quiero saber cómo funciona la adquisición de un inmueble de este tipo y coordinar una asesoría o videollamada. ¿Podemos conversar?`);
  }
  function advise(index = 0) {
    track('scheduling_contact', { source: 'demo_card', card: index });
  }
  return <section id="buscador-zonas" className="bg-navy py-24 text-white scroll-mt-24">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <span className="eyebrow text-gold">Patrimonio 360° · Explora tu zona</span>
      <h2 className="mt-5 max-w-3xl text-4xl font-bold sm:text-5xl">Tu zona de interés.<br /><span className="text-gold">El primer paso para aprender.</span></h2>
      <p className="mt-6 max-w-2xl text-white/80">Dinos en qué colonia, municipio o zona de México te gustaría invertir. Explora 24 referencias de inversión sin llenar un formulario. Si alguna te interesa, conversa con nosotros por WhatsApp para conocer la modalidad de remates inmobiliarios.</p>
      <form onSubmit={e => { e.preventDefault(); if (active >= 0 && open) { setQuery(suggestions[active]); setOpen(false); setActive(-1); } else explore(); }} className="relative mt-8 max-w-3xl">
        <label htmlFor="zone-search" className="mb-2 block font-semibold">Dinos tu zona de interés</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input id="zone-search" role="combobox" aria-autocomplete="list" aria-expanded={open && suggestions.length > 0} aria-controls="zone-options" aria-activedescendant={open && active >= 0 ? `zone-${active}` : undefined} aria-describedby="zone-help" autoComplete="off" required minLength={3} maxLength={120} value={query} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)} onChange={e => { setQuery(e.target.value); setOpen(true); }} onKeyDown={e => { if (e.key === 'Escape') setOpen(false); if (['ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); setOpen(true); setActive(i => suggestions.length ? (i + (e.key === 'ArrowDown' ? 1 : -1) + suggestions.length) % suggestions.length : -1); } }} placeholder="Ej. Bosques de las Lomas, CDMX" className="min-w-0 flex-1 rounded-xl border border-white/30 bg-white px-5 py-4 text-navy" />
          <button className="rounded-xl bg-gold px-6 py-4 font-semibold text-navy">Explorar referencias</button>
        </div>
        {open && suggestions.length > 0 && <ul id="zone-options" role="listbox" aria-label="Zonas sugeridas" className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl bg-white text-navy shadow-xl">{suggestions.map((s, i) => <li id={`zone-${i}`} key={s} role="option" aria-selected={active === i} onMouseDown={e => e.preventDefault()} onClick={() => { setQuery(s); setOpen(false); setActive(-1); }} className={`cursor-pointer p-4 ${active === i ? 'bg-gold/30' : 'hover:bg-gold/10'}`}>{s}</li>)}</ul>}
        <p id="zone-help" className="mt-3 text-sm text-white/75">{mode === 'national' ? 'Sugerencias geográficas de México · Mapbox.' : 'Sugerencias de ejemplo. Puedes escribir cualquier zona de México; el texto libre no se valida geográficamente.'}</p>
        {attribution && <p className="mt-1 text-xs text-white/70">{attribution}</p>}
      </form>
      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/75"><span className="font-medium">Datos ilustrativos.</span> Estas referencias no corresponden a inmuebles anunciados. Los importes e imágenes son orientativos y no se calculan a partir de la zona.</p>
      {zone && <div className="mt-12">
        <h3 ref={results} tabIndex={-1} className="text-2xl font-semibold">{prices.length} referencias de inversión · {zone}</h3>
        <p role="status" className="mt-2 text-white/80">Explora primero y contáctanos cuando quieras. No necesitas dejar tus datos ni autorizar contacto para explorar estas referencias.</p>
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{prices.map((price, i) => <article key={`${zone}-${i}`} className="overflow-hidden rounded-2xl border border-white/20 bg-white/5">
          <div className="relative h-44 overflow-hidden"><Image src={`/demo-home.svg`} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="scale-110 object-cover blur-md" /><span className="absolute left-3 top-3 rounded-lg bg-navy px-3 py-2 text-xs font-medium text-white/90">Datos ilustrativos</span><span className="absolute bottom-3 left-3 rounded bg-navy px-2 py-1 text-xs">Imagen de referencia</span></div>
          <div className="p-5"><h4 className="font-bold">Referencia de inversión {String(i + 1).padStart(2, '0')}</h4><p className="mt-2 break-words text-sm text-white/80">Zona consultada: {zone}</p><p className="mt-4 text-xs text-white/80">Importe ilustrativo</p><p className="mt-1 text-2xl font-bold text-gold">{money.format(price)} <span className="text-sm">MXN</span></p><p className="mt-3 text-sm text-white/75">Referencia educativa, sin inmueble asociado.</p><a href={conversation(i)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar oportunidades en esta zona por WhatsApp, referencia ${i + 1}`} onClick={() => advise(i + 1)} className="mt-5 block rounded-xl bg-gold px-4 py-3 text-center text-sm font-semibold text-navy">Consultar oportunidades en esta zona por WhatsApp ↗</a><p className="mt-2 text-xs text-white/75">Abre WhatsApp con la zona y la referencia. Tú decides si envías el mensaje.</p></div>
        </article>)}</div>
        <div className="mt-8 rounded-2xl border border-gold/40 p-6"><h3 className="text-xl font-bold">Da el siguiente paso con una asesoría</h3><p className="mt-3 text-white/80">Conoce el proceso, los riesgos, los costos y las preguntas que conviene hacer antes de invertir. Las oportunidades verificadas requieren revisión documental y confirmación por separado.</p><a href={conversation()} target="_blank" rel="noopener noreferrer" onClick={() => advise()} className="mt-5 inline-block rounded-full bg-gold px-6 py-3 font-semibold text-navy">Conversar por WhatsApp</a></div>
      </div>}
    </div>
  </section>;
}
