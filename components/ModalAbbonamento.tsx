'use client';

import { useState, useEffect } from 'react';
import { creaAbbonamento, getPianiAbbonamento } from '@/lib/strapi';
import { PianoAbbonamento } from '@/types/strapi';

export default function ModalAbbonamento() {
  const [piani, setPiani] = useState<PianoAbbonamento[]>([]);
  const [pianoSelezionato, setPianoSelezionato] = useState<PianoAbbonamento | null>(null);
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [indirizzo, setIndirizzo] = useState('');
  const [stato, setStato] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  // Load piani da Strapi
  useEffect(() => {
    getPianiAbbonamento().then((data) => {
      setPiani(data);
      if (data.length > 0) {
        // Seleziona di default quello "popolare" oppure il primo
        const defaultPiano = data.find((p) => p.popolare) || data[0];
        setPianoSelezionato(defaultPiano);
      }
    });
  }, []);

  async function handlePagamento() {
    if (!nome || !email || !pianoSelezionato) return;
    setStato('loading');
    const ok = await creaAbbonamento({
      nome,
      email,
      indirizzo: pianoSelezionato.richiedeIndirizzo ? indirizzo : '',
      piano: pianoSelezionato.slug,
    });
    setStato(ok ? 'ok' : 'error');
  }

  return (
    <div className="modal fade" id="modalAbbonamento" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg modal-rotte">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="bi bi-newspaper me-2"></i>Abbonati a Rotte Magazine
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Chiudi"></button>
          </div>
          <div className="modal-body p-4">
            {stato === 'ok' ? (
              <div className="text-center py-4">
                <i className="bi bi-check-circle fs-1 text-terracotta d-block mb-3"></i>
                <h5 style={{ fontFamily: 'var(--serif)' }}>Grazie per esserti abbonato!</h5>
                <p>Riceverai una conferma a <strong>{email}</strong> entro pochi minuti.</p>
              </div>
            ) : (
              <>
                {/* Rendering Dinamico Piani */}
                <div className="row g-4">
                  {piani.map((p) => {
                    const isSelected = pianoSelezionato?.id === p.id;
                    return (
                      <div className="col-md-6" key={p.id}>
                        <div
                          className={`card card-rotte p-3 h-100 border-2 ${isSelected ? 'border-terracotta' : ''}`}
                          style={{
                            borderColor: isSelected ? 'var(--terracotta)' : 'var(--sand)',
                            cursor: 'pointer',
                          }}
                          onClick={() => setPianoSelezionato(p)}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <h6 style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem' }}>{p.titolo}</h6>
                            {p.popolare && <span className="badge badge-dest">Popolare</span>}
                          </div>
                          <p className="fw-bold fs-4 mb-1" style={{ color: 'var(--terracotta)' }}>
                            €{p.prezzo}
                            <span style={{ fontSize: '.8rem', fontWeight: 400, color: 'var(--muted)' }}>
                              {p.frequenza}
                            </span>
                          </p>
                          <ul className="list-unstyled small text-muted">
                            {p.caratteristiche?.map((item) => (
                              <li key={item.id}>
                                <i className="bi bi-check-circle text-terracotta me-1"></i>
                                {item.testo}
                              </li>
                            ))}
                          </ul>
                          <button
                            className={isSelected ? 'btn-rotte-primary mt-2' : 'btn-rotte-outline mt-2'}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPianoSelezionato(p);
                            }}
                          >
                            Scegli {p.titolo}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <hr className="divider-gold" />

                {/* Form Dati */}
                <h6 className="fw-bold mb-3" style={{ fontFamily: 'var(--serif)' }}>
                  Dati per l&apos;abbonamento
                </h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small">Nome e cognome</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Marco Rossi"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="marco@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {pianoSelezionato?.richiedeIndirizzo && (
                    <div className="col-12">
                      <label className="form-label small">Indirizzo di spedizione</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Via Garibaldi 12, 40121 Bologna BO"
                        value={indirizzo}
                        onChange={(e) => setIndirizzo(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {stato === 'error' && (
                  <p className="text-danger small mt-3 mb-0">
                    Si è verificato un errore. Riprova o contattaci.
                  </p>
                )}
              </>
            )}
          </div>

          {stato !== 'ok' && (
            <div className="modal-footer border-top" style={{ borderColor: 'var(--sand)' }}>
              <button type="button" className="btn-rotte-outline" data-bs-dismiss="modal">
                Annulla
              </button>
              <button
                type="button"
                className="btn-rotte-primary"
                onClick={handlePagamento}
                disabled={stato === 'loading' || !pianoSelezionato}
              >
                {stato === 'loading' ? 'Elaborazione…' : 'Procedi al pagamento →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}