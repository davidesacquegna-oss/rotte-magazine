import type {
  Article,
  Alert,
  Faq,
  Itinerario,
  EventoCulturale,
  ImpostazioneGenerale,
  StrapiListResponse,
  StrapiSingleResponse,
} from '@/types/strapi';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// ── Generic fetch helper ─────────────────────────────────────────────────────

async function fetchStrapi<T>(
  path: string,
  params: Record<string, string> = {},
  revalidate = 60
): Promise<T> {
  const qs = new URLSearchParams({ populate: '*', ...params }).toString();
  const url = `${STRAPI_URL}/api${path}?${qs}`;

  const res = await fetch(url, { next: { revalidate } });

  if (!res.ok) {
    // Restituisce null-safe per evitare crash in sviluppo con Strapi spento
    console.error(`[Strapi] ${res.status} ${url}`);
    throw new Error(`Strapi fetch error: ${res.status} ${path}`);
  }

  return res.json() as Promise<T>;
}

// ── Helper URL immagine ───────────────────────────────────────────────────────

export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

// ── Articles ─────────────────────────────────────────────────────────────────

export async function getArticlesHero(): Promise<Article[]> {
  const res = await fetchStrapi<StrapiListResponse<Article>>(
    '/articles',
    { 'filters[in_evidenza][$ne]': 'true', 'pagination[pageSize]': '3', 'sort': 'publishedAt:desc' }
  );
  return res.data;
}

export async function getArticlesInEvidenza(): Promise<Article[]> {
  const res = await fetchStrapi<StrapiListResponse<Article>>(
    '/articles',
    { 'filters[in_evidenza][$eq]': 'true', 'pagination[pageSize]': '4', 'sort': 'publishedAt:desc' }
  );
  return res.data;
}

export async function getArticoliPiuLetti(): Promise<Article[]> {
  const res = await fetchStrapi<StrapiListResponse<Article>>(
    '/articles',
    { 'pagination[pageSize]': '5', 'sort': 'visite:desc' }
  );
  return res.data;
}

// ── Alert ────────────────────────────────────────────────────────────────────

export async function getAlert(): Promise<Alert | null> {
  try {
    const res = await fetchStrapi<StrapiSingleResponse<Alert>>('/alert');
    return res.data;
  } catch {
    return null;
  }
}

// ── FAQ ──────────────────────────────────────────────────────────────────────

export async function getFaqs(): Promise<Faq[]> {
  const res = await fetchStrapi<StrapiListResponse<Faq>>(
    '/faqs',
    { 'sort': 'ordine:asc', 'pagination[pageSize]': '20' }
  );
  return res.data;
}

// ── Itinerari ────────────────────────────────────────────────────────────────

export async function getItinerario(): Promise<Itinerario | null> {
  try {
    const res = await fetchStrapi<StrapiListResponse<Itinerario>>(
      '/itinerarios',
      { 'pagination[pageSize]': '1', 'sort': 'publishedAt:desc' }
    );
    return res.data[0] ?? null;
  } catch {
    return null;
  }
}

// ── Eventi Culturali ─────────────────────────────────────────────────────────

export async function getEventiCulturali(): Promise<EventoCulturale[]> {
  const res = await fetchStrapi<StrapiListResponse<EventoCulturale>>(
    '/evento-culturales',
    { 'sort': 'id:asc', 'pagination[pageSize]': '10' }
  );
  return res.data;
}

// ── Impostazioni Generali ────────────────────────────────────────────────────

export async function getImpostazioniGenerali(): Promise<ImpostazioneGenerale | null> {
  try {
    const res = await fetchStrapi<StrapiSingleResponse<ImpostazioneGenerale>>(
      '/impostazione-generale'
    );
    return res.data;
  } catch {
    return null;
  }
}

// ── POST: Iscrizione Newsletter ───────────────────────────────────────────────

export async function iscriviNewsletter(data: {
  nome: string;
  email: string;
  interessi: string[];
}): Promise<boolean> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/iscritto-newsletters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ── POST: Abbonamento ────────────────────────────────────────────────────────

export async function creaAbbonamento(data: {
  nome: string;
  email: string;
  indirizzo?: string;
  piano: 'digital' | 'carta';
}): Promise<boolean> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/abbonamentos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
