import type { Article, EventoCulturale } from '@/types/strapi';

interface SidebarProps {
  articoliPiuLetti: Article[];
  eventi: EventoCulturale[];
}

// Icone per posizione classifica
const RANK_ICONS = [
  'bi-1-circle-fill',
  'bi-2-circle-fill',
  'bi-3-circle-fill',
  'bi-4-circle-fill',
  'bi-5-circle-fill',
];

// Cambio statico (in produzione puoi creare un endpoint Strapi o chiamare ECB)
const CAMBI = [
  { flag: '🇺🇸', codice: 'USD', valore: '1.09', titolo: 'Dollaro USA', info: 'Il dollaro è stabile nell\'ultima settimana. Ottimo momento per acquistare valuta in anticipo se viaggi in autunno.' },
  { flag: '🇬🇧', codice: 'GBP', valore: '0.86', titolo: 'Sterlina britannica', info: 'La sterlina ha guadagnato l\'1.2% questa settimana dopo i dati sull\'inflazione UK.' },
  { flag: '🇯🇵', codice: 'JPY', valore: '161.4', titolo: 'Yen giapponese', info: 'Lo yen rimane debole rispetto all\'euro: ottimo momento per chi parte per il Giappone.' },
  { flag: '🇹🇷', codice: 'TRY', valore: '37.8', titolo: 'Lira turca', info: 'La lira turca continua la sua svalutazione. Cambia solo piccole somme alla volta.' },
];

function formatVisite(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function Sidebar({ articoliPiuLetti, eventi }: SidebarProps) {
  return (
    <div className="col-lg-4">
      <div className="sidebar-sticky">

        {/* ── I più letti ── */}
        {articoliPiuLetti.length > 0 && (
          <div className="mb-4">
            <p className="section-label mb-1">Classifiche</p>
            <h5 className="section-title mb-3">I più letti questo mese</h5>
            <ul className="list-group list-group-rotte list-group-flush">
              {articoliPiuLetti.slice(0, 5).map((article, i) => (
                <li key={article.id} className="list-group-item justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <i className={`bi ${RANK_ICONS[i]}`} style={{ color: 'var(--terracotta)' }}></i>
                    <span>
                      <a href={`/articoli/${article.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {article.titolo}
                      </a>
                    </span>
                  </div>
                  <span className="badge bg-secondary rounded-pill ms-2">
                    {formatVisite(article.visite)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Cambio del giorno ── */}
        <div className="card card-rotte p-4 mb-4">
          <h6 className="fw-bold mb-3" style={{ fontFamily: 'var(--serif)' }}>
            <i className="bi bi-currency-exchange text-terracotta me-2"></i>Cambio del giorno
          </h6>
          <div className="d-flex flex-column gap-2" style={{ fontSize: '.9rem' }}>
            {CAMBI.map((cambio) => (
              <div key={cambio.codice} className="d-flex justify-content-between align-items-center">
                <span>{cambio.flag} {cambio.codice}</span>
                <div>
                  <strong>{cambio.valore}</strong>
                  <button
                    type="button"
                    className="btn btn-sm btn-link p-0 ms-2 text-terracotta"
                    data-bs-toggle="popover"
                    data-bs-placement="left"
                    data-bs-title={cambio.titolo}
                    data-bs-content={cambio.info}
                  >
                    <i className="bi bi-info-circle"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '.72rem', color: 'var(--muted)' }} className="mt-3 mb-0">
            Tassi indicativi rispetto all&apos;Euro · Fonte: ECB
          </p>
        </div>

        {/* ── Prossimi eventi culturali ── */}
{eventi.length > 0 && (
  <div className="card card-rotte p-4 mb-4">
    <h6 className="fw-bold mb-3" style={{ fontFamily: 'var(--serif)' }}>
      <i className="bi bi-calendar-event text-terracotta me-2"></i>Prossimi eventi culturali
    </h6>
    <ul className="list-unstyled mb-0" style={{ fontSize: '.88rem' }}>
      {eventi.map((ev) => {
        const evento = ev as any; // 👈 Dice a TypeScript di non controllare rigidamente i campi qui sotto
        return (
          <li key={evento.id} className="mb-2 d-flex gap-2 align-items-start">
            <span className="badge badge-dest mt-1">{evento.mese}</span>
            <span>
              <strong>{evento.nome}</strong> — {evento.luogo}{' '}
              {evento.etichetta && (
                <BadgeEvento 
                  colore={evento.badgeColore || 'success'} 
                  testo={evento.etichetta} 
                />
              )}
            </span>
          </li>
        );
      })}
    </ul>
  </div>
)}

        {/* ── CTA Abbonamento ── */}
        <button
          className="btn-rotte-gold w-100 py-2 mb-2 fs-6"
          data-bs-toggle="modal"
          data-bs-target="#modalAbbonamento"
        >
          <i className="bi bi-newspaper me-2"></i>Abbonati a Rotte Magazine
        </button>
        <p className="text-center" style={{ fontSize: '.78rem', color: 'var(--muted)' }}>
          Carta + digitale · 6 numeri l&apos;anno · da €49/anno
        </p>

      </div>
    </div>
  );
}

function BadgeEvento({ colore, testo }: { colore: string; testo: string }) {
  if (colore === 'gold') {
    return (
      <span className="text-gold fw-bold">★ {testo}</span>
    );
  }
  const bg =
    colore === 'terracotta'
      ? { background: 'var(--terracotta)', color: 'var(--cream)' }
      : { background: '#6c757d', color: '#fff' };

  return (
    <span className="badge" style={{ ...bg, borderRadius: 0, fontSize: '.65rem' }}>
      {testo}
    </span>
  );
}
