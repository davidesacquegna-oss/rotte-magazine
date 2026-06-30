import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BootstrapClient from '@/components/BootstrapClient';
import PopoverInit from '@/components/PopoverInit';
import OffcanvasNewsletter from '@/components/OffcanvasNewsletter';
import ModalAbbonamento from '@/components/ModalAbbonamento';

export const metadata: Metadata = {
  title: 'Rotte Magazine — Viaggi che ispirano',
  description: 'Giornalismo di viaggio indipendente dal 2009.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        {/* Script Bootstrap client-side */}
        <BootstrapClient />

        {/* Header ovunque nel sito */}
        <Navbar impostazioni={null} />

        {/* Contenuto delle pagine (Home, Europa, ecc.) */}
        <main>
          {children}
        </main>

        {/* Componenti interattivi pronti all'uso su ogni pagina */}
        <OffcanvasNewsletter />
        <ModalAbbonamento />

        {/* Footer ovunque nel sito */}
        <Footer impostazioni={null} />

        {/* Inizializzazione dei popover */}
        <PopoverInit />
      </body>
    </html>
  );
}