// ── Strapi v5 response wrapper ──────────────────────────────────────────────

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

// ── Article ─────────────────────────────────────────────────────────────────

export interface Article {
  id: number;
  documentId: string;
  titolo: string;
  estratto: string;
  slug: string;
  destinazione: string;
  difficolta: 'Facile' | 'Media' | 'Avanzato';
  rubrica: string;
  inEvidenza: boolean;
  inHero: boolean;
  visite: number;
  immagine: StrapiImage | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ── Alert (Single Type) ──────────────────────────────────────────────────────

export interface Alert {
  id: number;
  documentId: string;
  testo: string;
  linkTesto: string;
  linkUrl: string;
  attivo: boolean;
}

// ── FAQ ──────────────────────────────────────────────────────────────────────

export interface Faq {
  id: number;
  documentId: string;
  domanda: string;
  risposta: string;
  ordine: number;
}

// ── Itinerario ───────────────────────────────────────────────────────────────

export interface GiornoItinerario {
  id: number;
  titolo_giorno: string; // <-- Cambiato da titolo a titolo_giorno
  contenuto: string;     // <-- Cambiato da descrizione a contenuto
}

export interface Itinerario {
  id: number;
  documentId: string;
  titolo: string;
  introduzione: string;  // <-- Cambiato da sottotitolo a introduzione
  autore: string;
  giorni: GiornoItinerario[];
}

// ── Evento Culturale ─────────────────────────────────────────────────────────

export interface EventoCulturale {
  id: number;
  documentId: string;
  titolo: string;
  luogo: string;
  mese: string;
  badge: string;
  badgeColore: 'terracotta' | 'gold' | 'secondary';
}

// ── Impostazione Generale (Single Type) ──────────────────────────────────────

export interface ImpostazioneGenerale {
  id: number;
  documentId: string;
  nomeRivista: string;
  tagline: string;
  descrizioneFooter: string;
  email: string;
  indirizzo: string;
  telefono: string;
  instagram: string;
  twitter: string;
  facebook: string;
  youtube: string;
  prezzoDigitale: number;
  prezzoCarta: number;
}

// ── Strapi List Response ──────────────────────────────────────────────────────

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}
