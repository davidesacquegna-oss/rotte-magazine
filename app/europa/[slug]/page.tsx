import Link from 'next/link';
import { notFound } from 'next/navigation';

// Testi provvisori da usare se il campo "descrizione" non è ancora compilato su Strapi
const descrizioniBackup: Record<string, string> = {
  "val-d-orcia-strade-bianche-e-cipressi-infiniti": "La Val d'Orcia è un capolavoro paesaggistico dove la mano dell'uomo e la natura hanno trovato un equilibrio perfetto, tanto da essere inserita nel patrimonio UNESCO. Questo itinerario si snoda lungo le leggendarie strade bianche, costeggiate da filari di cipressi...",
  "sulle-tracce-dell-aurora-l-islanda-in-inverno-oltre-i-cliche": "Affrontare l'Islanda durante i mesi invernali è un'esperienza che ridefinisce il concetto stesso di viaggio. Lontano dalle folle estive, l'isola del ghiaccio e del fuoco si mostra nella sua veste più autentica e spietata...",
  "fiordi-dell-ovest-la-penisola-dimenticata": "I Fiordi dell'Ovest (Westfjords) rappresentano la frontiera più remota d'Islanda. Esclusi dalle rotte turistiche di massa a causa di strade sterrate tortuose, offrono un senso di solitudine quasi mistico..."
};

async function getArticoloSingolo(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337'}/api/articles?filters[slug][$eq]=${slug}&populate=*`;
  
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data[0] || null; // Ritorna il primo articolo trovato
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface ParamProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticoloEuropaPage({ params }: ParamProps) {
  const { slug } = await params;
  const data = await getArticoloSingolo(slug);

  if (!data) {
    notFound(); // Mostra la pagina 404 nativa di Next se lo slug non esiste su Strapi
  }

  const articolo = data.attributes || data;
  const imgUrl = articolo.immagine?.url || '';
  
  // Se "descrizione" esiste su Strapi usa quella, altrimenti usa il testo provvisorio qui sopra
  const testoArticolo = articolo.descrizione || descrizioniBackup[slug] || "Contenuto in corso di scrittura...";

  return (
    <article className="container py-5" style={{ maxWidth: '800px' }}>
      <div className="mb-4">
        <Link href="/europa" className="text-muted text-decoration-none small">
          ← Torna all&apos;elenco Europa
        </Link>
      </div>

      <header className="mb-5">
        <div className="d-flex gap-2 mb-3 align-items-center">
          <span className="text-uppercase text-gold font-monospace px-2 py-1 bg-light border rounded small">{articolo.rubrica}</span>
          <span className="text-muted small">• Difficoltà: <strong>{articolo.difficolta}</strong></span>
          <span className="text-muted small">• Letture: {articolo.visite || 0}</span>
        </div>
        
        <h1 className="display-4 fw-bold mb-3">{articolo.titolo}</h1>
        <p className="lead text-secondary border-start border-4 ps-3 fst-italic">
          {articolo.estratto}
        </p>
      </header>

      {imgUrl && (
        <div className="mb-5 rounded overflow-hidden shadow-sm" style={{ height: '400px' }}>
          <img 
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337'}${imgUrl}`} 
            alt={articolo.titolo} 
            className="w-100 h-100 object-fit-cover"
          />
        </div>
      )}

      {/* Corpo del testo dinamico */}
      <div className="article-content fs-5 text-dark lh-base" style={{ whiteSpace: 'pre-line' }}>
        {testoArticolo}
      </div>

      <footer className="mt-5 pt-4 border-top text-center text-muted small">
        Fine del diario di viaggio di Rotte. • Destinazione: {articolo.destinazione}
      </footer>
    </article>
  );
}