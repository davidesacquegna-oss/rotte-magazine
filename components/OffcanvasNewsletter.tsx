'use client';

import { useState, useEffect, useRef } from 'react';
import { iscriviNewsletter } from '@/lib/strapi';

const INTERESSI = [
  { id: 'europa', label: 'Europa & Mediterraneo' },
  { id: 'asia', label: 'Asia & Oriente' },
  { id: 'avventura', label: 'Avventura & Natura' },
  { id: 'gastro', label: 'Gastronomia & Vino' },
];

export default function OffcanvasNewsletter() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [interessi, setInteressi] = useState<string[]>(['europa']);
  const [stato, setStato] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const offcanvasRef = useRef<HTMLDivElement>(null);



  function toggleInteresse(id: string) {
    setInteressi((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function handleSubmit() {
    if (!email) return;
    setStato('loading');
    const ok = await iscriviNewsletter({ nome, email, interessi });
    setStato(ok ? 'ok' : 'error');
  }

  return (
    <div
      ref={offcanvasRef}
      className="offcanvas offcanvas-end offcanvas-rotte"
      tabIndex={-1}
      id="offcanvasNewsletter"
      aria-labelledby="offcanvasNewsletterLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNewsletterLabel">
          <i className="bi bi-envelope-heart me-2"></i>Newsletter Rotte
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Chiudi"
        ></button>
      </div>
      <div className="offcanvas-body">
        {stato === 'ok' ? (
          <div className="text-center py-4">
            <i className="bi bi-check-circle fs-1 text-gold d-block mb-3"></i>
            <p>
              Iscrizione confermata! Ti aspettiamo venerdì mattina.
            </p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: '.92rem' }}>
              Ogni venerdì mattina, una destinazione raccontata bene, consigli pratici
              e una foto che mette voglia di partire. Niente spam, solo viaggi.
            </p>
            <hr style={{ borderColor: '#333' }} />

            <div className="mb-3">
              <label className="form-label small">Il tuo nome</label>
              <input
                type="text"
                className="form-control rounded-0 bg-dark text-light border-secondary"
                placeholder="Marco"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small">Email</label>
              <input
                type="email"
                className="form-control rounded-0 bg-dark text-light border-secondary"
                placeholder="marco@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <p className="small mb-2">Interessi principali:</p>
              {INTERESSI.map(({ id, label }) => (
                <div className="form-check" key={id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`chk-${id}`}
                    checked={interessi.includes(id)}
                    onChange={() => toggleInteresse(id)}
                  />
                  <label className="form-check-label small" htmlFor={`chk-${id}`}>
                    {label}
                  </label>
                </div>
              ))}
            </div>

            {stato === 'error' && (
              <p className="text-danger small mb-2">
                Errore durante l&apos;iscrizione. Riprova.
              </p>
            )}

            <button
              className="btn-rotte-primary w-100 py-2"
              onClick={handleSubmit}
              disabled={stato === 'loading'}
            >
              {stato === 'loading' ? 'Iscrizione in corso…' : 'Iscriviti gratuitamente'}
            </button>

            <p style={{ fontSize: '.72rem' }} className="mt-3 text-center">
              Ci vuole un secondo. Ti disiscriverai in un clic.
            </p>
          </>
        )}
      </div>
    </div>
  );
}