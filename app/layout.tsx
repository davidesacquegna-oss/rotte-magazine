'use client'; // <-- Diventa un componente client solo per gestire il controllo del backend

import { useEffect, useState } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BootstrapClient from '@/components/BootstrapClient';
import PopoverInit from '@/components/PopoverInit';
import OffcanvasNewsletter from '@/components/OffcanvasNewsletter';
import ModalAbbonamento from '@/components/ModalAbbonamento';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isBackendReady, setIsBackendReady] = useState(false);

  useEffect(() => {
    const svegliaBackend = async () => {
      // Interroghiamo le API chiedendo 0 elementi per non sprecare dati, serve solo a svegliarlo
      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?pagination[limit]=0`;
      
      while (true) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            setIsBackendReady(true); // Sveglio! Interrompi il ciclo e sblocca il sito
            break;
          }
        } catch (error) {
          console.log("Il backend sta dormendo, riprovo tra 3 secondi...");
        }
        // Attendi 3 secondi prima di riprovare a bussare
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    };

    svegliaBackend();
  }, []);

  return (
    <html lang="it">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <BootstrapClient />

        {isBackendReady ? (
          // Se il backend è già attivo e risponde, il sito funziona normalmente
          <>
            <Navbar impostazioni={null} />

            <main>
              {children}
            </main>

            <OffcanvasNewsletter />
            <ModalAbbonamento />
            <Footer impostazioni={null} />
            <PopoverInit />
          </>
        ) : (
          // Se il backend sta effettuando il cold start su Render, mostra questa attesa
          <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            flexDirection: 'column',
            fontFamily: 'sans-serif',
            backgroundColor: '#ffffff'
          }}>
            <div className="spinner-border text-primary" role="status"></div>
            <p style={{ marginTop: '20px', color: '#333', fontSize: '18px', fontWeight: '500' }}>
              Preparazione di Rotte Magazine in corso...
            </p>
            <span style={{ color: '#888', fontSize: '13px' }}>
              Il primo avvio dopo una pausa richiede circa 40 secondi.
            </span>
          </div>
        )}
      </body>
    </html>
  );
}