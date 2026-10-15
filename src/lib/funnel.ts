// Only fixed event names and non-personal metadata enter analytics.
export function track(event: string, details: Record<string, string | number> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...details });
}
