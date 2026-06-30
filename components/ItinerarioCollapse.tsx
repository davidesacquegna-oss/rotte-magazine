'use client';

import type { Itinerario } from '@/types/strapi';

interface ItinerarioCollapseProps {
  itinerario: Itinerario | null;
}

export default function ItinerarioCollapse({ itinerario }: ItinerarioCollapseProps) {
  if (!itinerario) return null;

  // Separa il primo giorno (titolo del collapse) dagli altri
  const [primoGiorno, ...altriGiorni] = itinerario.giorni ?? [];

  return (
    <div className="mb-5">
      <p className="section-label mb-1">Itinerario della settimana</p>
      <h2 className="section-title mb-3">{itinerario.titolo}</h2>
      <p className="mb-3" style={{ color: 'var(--muted)' }}>
        {/* CORRETTO: Strapi restituisce introduzione, non sottotitolo */}
        {itinerario.introduzione}
        {itinerario.autore && (
          <> — <em>{itinerario.autore}</em></>
        )}
      </p>

      <div className="collapse-section mb-3">
        <div className="d-flex justify-content-between align-items-center">
          {/* CORRETTO: Strapi usa titolo_giorno */}
          <strong>{primoGiorno?.titolo_giorno}</strong>
          <button
            className="btn-rotte-outline btn-sm"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseItinerario"
            aria-expanded="false"
            aria-controls="collapseItinerario"
          >
            <i className="bi bi-chevron-down me-1"></i> Vedi dettagli
          </button>
        </div>
      </div>

      <div className="collapse" id="collapseItinerario">
        {primoGiorno && (
          <div className="card card-rotte p-4 mb-3">
            <h6 className="fw-bold mb-2" style={{ fontFamily: 'var(--serif)' }}>
              {/* CORRETTO: titolo_giorno */}
              {primoGiorno.titolo_giorno}
            </h6>
            <p className="mb-0" style={{ fontSize: '.9rem', color: 'var(--muted)' }}>
              {/* CORRETTO: contenuto */}
              {primoGiorno.contenuto}
            </p>
          </div>
        )}

        {altriGiorni.length > 0 && (
          <div className="card card-rotte p-4">
            {altriGiorni.map((giorno) => (
              <div key={giorno.id} className="mb-3 last:mb-0">
                <h6 className="fw-bold mb-2" style={{ fontFamily: 'var(--serif)' }}>
                  {/* CORRETTO: titolo_giorno */}
                  {giorno.titolo_giorno}
                </h6>
                <p className="mb-0" style={{ fontSize: '.9rem', color: 'var(--muted)' }}>
                  {/* CORRETTO: contenuto */}
                  {giorno.contenuto}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}