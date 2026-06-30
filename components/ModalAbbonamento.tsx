'use client';

import { useState } from 'react';
import { creaAbbonamento } from '@/lib/strapi';

export default function ModalAbbonamento() {
  const [piano, setPiano] = useState<'digital' | 'carta'>('carta');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [indirizzo, setIndirizzo] = useState('');
  const [stato, setStato] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  async function handlePagamento() {
    if (!nome || !email) return;
    setStato('loading');
    const ok = await creaAbbonamento({ nome, email, indirizzo, piano });
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
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Chiudi"
            ></button>
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
                {/* Scelta piano */}
                <div className="row g-4">
                  {/* Digital */}
                  <div className="col-md-6">
                    <div
                      className={`card card-rotte p-3 h-100 border-2${piano === 'digital' ? ' border-terracotta' : ''}`}
                      style={{ borderColor: piano === 'digital' ? 'var(--terracotta)' : 'var(--sand)', cursor: 'pointer' }}
                      onClick={() => setPiano('digital')}
                    >
                      <h6 style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem' }}>Digital</h6>
                      <p className="fw-bold fs-4 mb-1" style={{ color: 'var(--terracotta)' }}>
                        €29<span style={{ fontSize: '.8rem', fontWeight: 400, color: 'var(--muted)' }}>/anno</span>
                      </p>
                      <ul className="list-unstyled small text-muted">
                        <li><i className="bi bi-check-circle text-terracotta me-1"></i>Accesso illimitato al sito</li>
                        <li><i className="bi bi-check-circle text-terracotta me-1"></i>Archivio completo (10 anni)</li>
                        <li><i className="bi bi-check-circle text-terracotta me-1"></i>Newsletter premium</li>
                        <li><i className="bi bi-check-circle text-terracotta me-1"></i>PDF scaricabili</li>
                      </ul>
                      <button
                        className={piano === 'digital' ? 'btn-rotte-primary mt-2' : 'btn-rotte-outline mt-2'}
                        onClick={(e) => { e.stopPropagation(); setPiano('digital'); }}
                      >
                        Scegli Digital
                      </button>
                    </div>
                  </div>

                  {/* Carta + Digital */}
                  <div className="col-md-6">
                    <div
                      className={`card card-rotte p-3 h-100 border-2`}
                      style={{ borderColor: 'var(--terracotta)', cursor: 'pointer' }}
                      onClick={() => setPiano('carta')}
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <h6 style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem' }}>Carta + Digital</h6>
                        <span className="badge badge-dest">Popolare</span>
                      </div>
                      <p className="fw-bold fs-4 mb-1" style={{ color: 'var(--terracotta)' }}>
                        €49<span style={{ fontSize: '.8rem', fontWeight: 400, color: 'var(--muted)' }}>/anno</span>
                      </p>
                      <ul className="list-unstyled small text-muted">
                        <li><i className="bi bi-check-circle text-terracotta me-1"></i>Rivista cartacea (6 numeri)</li>
                        <li><i className="bi bi-check-circle text-terracotta me-1"></i>Tutto il piano Digital</li>
                        <li><i className="bi bi-check-circle text-terracotta me-1"></i>Guida omaggio a scelta</li>
                        <li><i className="bi bi-check-circle text-terracotta me-1"></i>Accesso a eventi esclusivi</li>
                      </ul>
                      <button
                        className={piano === 'carta' ? 'btn-rotte-primary mt-2' : 'btn-rotte-outline mt-2'}
                        onClick={(e) => { e.stopPropagation(); setPiano('carta'); }}
                      >
                        Scegli Carta + Digital
                      </button>
                    </div>
                  </div>
                </div>

                <hr className="divider-gold" />

                {/* Form dati */}
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
                  {piano === 'carta' && (
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
              <button
                type="button"
                className="btn-rotte-outline"
                data-bs-dismiss="modal"
              >
                Annulla
              </button>
              <button
                type="button"
                className="btn-rotte-primary"
                onClick={handlePagamento}
                disabled={stato === 'loading'}
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
