'use client';

import { useEffect } from 'react';

/**
 * Bootstrap usa window/document, quindi va importato solo lato client.
 * Inserisci questo componente una volta sola in ogni page che usa
 * componenti Bootstrap interattivi (carousel, accordion, modal, ecc.)
 */
export default function BootstrapClient() {
  useEffect(() => {
    // Dynamic import per evitare SSR crash
    import('bootstrap/dist/js/bootstrap.bundle.min.js').catch(() => {
      // fallback: carica da CDN se il pacchetto npm non è installato
      const script = document.createElement('script');
      script.src =
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
      document.body.appendChild(script);
    });
  }, []);

  return null;
}
