'use client';

import { useState, useEffect, useRef } from 'react';
import type { ImpostazioneGenerale } from '@/types/strapi';
import Link from 'next/link';
interface NavbarProps {
  impostazioni: ImpostazioneGenerale | null;
}

export default function Navbar({ impostazioni }: NavbarProps) {
  const nome = impostazioni?.nomeRivista ?? 'Rotte';

  // Stati locali per la Navbar stabili e indipendenti
  const [dropdownAperto, setDropdownAperto] = useState(false);
  const [mobileAperto, setMobileAperto] = useState(false);

  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    // Chiude il menu a tendina in automatico se si clicca fuori dalla Navbar
    const chiudiSeFuori = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownAperto(false);
      }
    };

    document.addEventListener('click', chiudiSeFuori);
    return () => document.removeEventListener('click', chiudiSeFuori);
  }, []);

  return (
    <>
      {/* Carica Bootstrap a livello globale di pagina. 
        Essendo "afterInteractive", si attiva subito e sblocca il Carousel della Hero.
      */}

      <nav className="navbar navbar-expand-lg navbar-rotte py-2">
        <div className="container">
          <a className="navbar-brand navbar-brand-title me-4" href="/">
            {nome}<span>.</span>
          </a>

          {/* Pulsante Hamburger Mobile (Controllato da React) */}
          <button
            className="navbar-toggler border-secondary"
            type="button"
            onClick={() => setMobileAperto(!mobileAperto)}
            aria-expanded={mobileAperto}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu di Navigazione */}
          <div className={`collapse navbar-collapse ${mobileAperto ? 'show' : ''}`} id="navMenu">
            <ul className="navbar-nav me-auto gap-1">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>

              {/* Dropdown Destinazioni */}
              <li ref={dropdownRef} className={`nav-item dropdown ${dropdownAperto ? 'show' : ''}`}>
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdownAperto(!dropdownAperto);
                  }}
                  aria-expanded={dropdownAperto}
                >
                  Destinazioni
                </a>
                
                <ul className={`dropdown-menu ${dropdownAperto ? 'show' : ''}`} data-bs-popper="static">
                  <li>
                    <Link className="dropdown-item" href="/europa">
                      <i className="bi bi-sun me-2"></i>Europa
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bi bi-tree me-2"></i>Africa &amp; Asia
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bi bi-globe-americas me-2"></i>Americhe
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item text-gold" href="#">
                      🗺 Mappa interattiva
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">Itinerari</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Cultura</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Gastronomia</a>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-2">
              <button
                className="btn-rotte-outline text-white border-secondary"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNewsletter"
                aria-controls="offcanvasNewsletter"
              >
                <i className="bi bi-envelope me-1"></i> Newsletter
              </button>
              <button
                className="btn-rotte-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalAbbonamento"
              >
                Abbonati
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}