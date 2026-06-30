# Rotte Magazine — Next.js Frontend

Frontend Next.js 14 (App Router) per Rotte Magazine, collegato a un backend Strapi.

## Struttura progetto

```
rotte-magazine/
├── app/
│   ├── layout.tsx          ← Root layout (Bootstrap CSS, font Google)
│   ├── page.tsx            ← Homepage (Server Component, fetch parallelo)
│   └── globals.css         ← Tutte le variabili CSS e classi custom
├── components/
│   ├── BootstrapClient.tsx ← Carica Bootstrap JS lato client
│   ├── PopoverInit.tsx     ← Inizializza popover Bootstrap dopo mount
│   ├── Navbar.tsx          ← Navbar con dropdown
│   ├── AlertEditoriale.tsx ← Banner dismissibile
│   ├── HeroCarousel.tsx    ← Carousel hero (Client Component)
│   ├── ReportageGrid.tsx   ← Griglia card articoli
│   ├── FaqAccordion.tsx    ← FAQ accordion (Client Component)
│   ├── ItinerarioCollapse.tsx ← Sezione collapse (Client Component)
│   ├── Sidebar.tsx         ← I più letti, cambio, eventi
│   ├── OffcanvasNewsletter.tsx ← Form newsletter (Client Component)
│   ├── ModalAbbonamento.tsx   ← Modal abbonamento (Client Component)
│   └── Footer.tsx          ← Footer con dati da Strapi
├── lib/
│   └── strapi.ts           ← Tutte le funzioni fetch verso Strapi
├── types/
│   └── strapi.ts           ← Tipi TypeScript per le response
├── next.config.js
├── tsconfig.json
└── .env.local.example
```

## Setup rapido

### 1. Installa le dipendenze

```bash
npm install
```

### 2. Configura le variabili d'ambiente

```bash
cp .env.local.example .env.local
# Modifica NEXT_PUBLIC_STRAPI_URL se necessario
```

### 3. Avvia in sviluppo

```bash
# Assicurati che Strapi sia già avviato su localhost:1337
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000)

---

## Mappatura endpoint Strapi → Componenti

| Endpoint Strapi | Componente | Note |
|---|---|---|
| `GET /api/articles?filters[inHero]=true` | `HeroCarousel` | max 3, ordinati per data |
| `GET /api/articles?filters[inEvidenza]=true` | `ReportageGrid` | max 4 card |
| `GET /api/articles?sort=visite:desc` | `Sidebar` | top 5 più letti |
| `GET /api/alert` | `AlertEditoriale` | Single Type |
| `GET /api/faqs?sort=ordine:asc` | `FaqAccordion` | ordinati per campo `ordine` |
| `GET /api/itinerarios` | `ItinerarioCollapse` | prende il più recente |
| `GET /api/evento-culturales` | `Sidebar` | lista eventi |
| `GET /api/impostazione-generale` | `Navbar` + `Footer` | Single Type |
| `POST /api/iscritto-newsletters` | `OffcanvasNewsletter` | |
| `POST /api/abbonamentos` | `ModalAbbonamento` | |

---

## Campi attesi in Strapi

### Article (Collection)
- `titolo` (text)
- `sommario` (text)
- `slug` (uid)
- `destinazione` (text)
- `difficolta` (enum: Facile, Media, Avanzato)
- `rubrica` (text)
- `inEvidenza` (boolean)
- `inHero` (boolean)
- `visite` (integer)
- `immagine` (media, singola)

### Alert (Single Type)
- `testo` (text)
- `linkTesto` (text)
- `linkUrl` (text)
- `attivo` (boolean)

### Faq (Collection)
- `domanda` (text)
- `risposta` (richtext o text)
- `ordine` (integer)

### Itinerario (Collection)
- `titolo` (text)
- `sottotitolo` (text)
- `autore` (text)
- `giorni` (component ripetibile con: `titolo`, `descrizione`)

### EventoCulturale (Collection)
- `titolo` (text)
- `luogo` (text)
- `mese` (text, es. "APR")
- `badge` (text, es. "Imperdibile", "Gratis")
- `badgeColore` (enum: terracotta, gold, secondary)

### ImpostazioneGenerale (Single Type)
- `nomeRivista` (text)
- `tagline` (text)
- `descrizioneFooter` (text)
- `email` (email)
- `indirizzo` (text)
- `telefono` (text)
- `instagram`, `twitter`, `facebook`, `youtube` (text, URL)

### IscrittoNewsletter (Collection)
- `nome` (text)
- `email` (email)
- `interessi` (json o text)

### Abbonamento (Collection)
- `nome` (text)
- `email` (email)
- `indirizzo` (text)
- `piano` (enum: digital, carta)

---

## Permessi Strapi necessari

In **Strapi Admin → Settings → Users & Permissions → Roles → Public**, abilita:

- `article`: find, findOne
- `alert`: find
- `faq`: find
- `itinerario`: find
- `evento-culturale`: find
- `impostazione-generale`: find
- `iscritto-newsletter`: create
- `abbonamento`: create

---

## ISR (Incremental Static Regeneration)

Le pagine si rigenerano ogni 60 secondi per default (configurabile in `lib/strapi.ts` nel parametro `revalidate`).

Per forzare la rigenerazione al salvataggio da Strapi, configura un **webhook** in Strapi Admin → Settings → Webhooks che chiami:

```
POST https://tuo-dominio.com/api/revalidate
```
