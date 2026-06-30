import Link from 'next/link';

// Funzione che interroga le API di Strapi
async function getArticoliEuropa() {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}/api/articles?populate=*&filters[destinazione][$in][0]=Italia&filters[destinazione][$in][1]=Islanda`;
  
  try {
    const res = await fetch(url, { cache: 'no-store' }); // Evita cache per vedere subito le modifiche di Strapi
    if (!res.ok) throw new Error('Errore nel recupero dati da Strapi');
    const json = await res.json();
    return json.data; // Restituisce l'array degli articoli
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function EuropaPage() {
  const articoli = await getArticoliEuropa();

  return (
    <div className="container py-5">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: '680px' }}>
        {/* Label e Titolo coerenti con l'estetica della piattaforma */}
        <span className="section-label d-block mb-2">Destinazioni</span>
        <h1 className="display-4 fw-bold mb-3 section-title">Esplora l&apos;Europa</h1>
        <p className="lead text-muted mt-3">
          Dalle colline toscane baciate dal sole fino alle terre selvagge e glaciali ai confini del Circolo Polare.
        </p>
      </div>

      {/* Divisore dorato personalizzato invece dell'hr standard */}
      <div className="divider-gold"></div>

      <h2 className="h4 fw-bold mb-4 section-title">Articoli dinamici da Strapi</h2>
      <div className="row g-4 mt-2">
        {articoli.length === 0 ? (
          <p className="text-muted">Nessun articolo trovato per questa destinazione.</p>
        ) : (
          articoli.map((art: any) => {
            const campi = art.attributes || art; 
            const imgUrl = campi.immagine?.formats?.thumbnail?.url || '';

            return (
              <div key={art.id || campi.slug} className="col-md-4">
                {/* Applicata la classe card-rotte */}
                <div className="card h-100 card-rotte position-relative">
                  
                  {campi.in_evidenza && (
                    <span className="position-absolute top-0 start-0 m-3 badge bg-warning text-dark fw-bold shadow-sm" style={{ zIndex: 2 }}>
                      ★ In Evidenza
                    </span>
                  )}
                  
                  <div className="bg-secondary-subtle text-center text-muted small border-bottom" style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {imgUrl ? (
                      <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}${imgUrl}`} alt={campi.titolo} className="w-100 h-100 object-fit-cover" />
                    ) : (
                      <span>📸 {campi.titolo}</span>
                    )}
                  </div>

                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      {/* Rubrica con il colore text-gold o stile dedicato */}
                      <span className="text-uppercase text-gold small fw-bold" style={{ letterSpacing: '.08em' }}>
                        {campi.rubrica}
                      </span>
                      {/* Badge difficoltà personalizzato */}
                      <span className="badge badge-diff">
                        {campi.difficolta}
                      </span>
                    </div>
                    
                    <h3 className="card-title mb-2">{campi.titolo}</h3>
                    <p className="card-text flex-grow-1">{campi.estratto}</p>
                    
                    <div className="d-flex justify-content-between align-items-center mt-3 pt-2" style={{ borderTop: '1px solid var(--sand)' }}>
                      <span className="text-muted small">👁 {campi.visite || 0} letture</span>
                      {/* Pulsante outline personalizzato */}
                      <Link href={`/europa/${campi.slug}`} className="btn-rotte-outline">
                        Leggi rotta →
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}