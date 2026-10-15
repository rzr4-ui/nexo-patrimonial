const examples = ['Bosques de las Lomas, Ciudad de México', 'Polanco, Miguel Hidalgo, Ciudad de México', 'Del Valle, Benito Juárez, Ciudad de México', 'Huixquilucan, Estado de México', 'Zapopan, Jalisco', 'Monterrey, Nuevo León', 'Mérida, Yucatán', 'Puebla, Puebla', 'Tijuana, Baja California', 'Querétaro, Querétaro', 'Cancún, Quintana Roo'];
const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get('q')?.trim() || '';
  if (q.length < 3 || q.length > 120) return Response.json({ suggestions: [], mode: 'local' });
  const fallback = { suggestions: examples.filter(s => normalize(s).includes(normalize(q))).slice(0, 6), mode: 'local' };
  const token = process.env.MAPBOX_ACCESS_TOKEN;
  if (!token) return Response.json(fallback);
  try {
    const params = new URLSearchParams({ q, country: 'mx', language: 'es', autocomplete: 'true', limit: '6', types: 'region,district,place,locality,neighborhood', access_token: token });
    const response = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?${params}`, { cache: 'no-store', signal: AbortSignal.timeout(4000) });
    if (!response.ok) throw new Error('geocoder');
    const data = await response.json();
    return Response.json({ suggestions: data.features.map((f: { properties: { full_address: string } }) => f.properties.full_address).filter(Boolean), mode: 'national', attribution: data.attribution }, { headers: { 'Cache-Control': 'no-store' } });
  } catch { return Response.json(fallback); }
}
