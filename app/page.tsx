import {
  getArticlesHero,
  getArticlesInEvidenza,
  getArticoliPiuLetti,
  getAlert,
  getFaqs,
  getItinerario,
  getEventiCulturali,
  getImpostazioniGenerali,
} from '@/lib/strapi';

import AlertEditoriale from '@/components/AlertEditoriale';
import HeroCarousel from '@/components/HeroCarousel';
import ReportageGrid from '@/components/ReportageGrid';
import FaqAccordion from '@/components/FaqAccordion';
import ItinerarioCollapse from '@/components/ItinerarioCollapse';
import Sidebar from '@/components/Sidebar';
import BootstrapClient from '@/components/BootstrapClient';
import PopoverInit from '@/components/PopoverInit';

/**
 * page.tsx è un Server Component: tutto il fetch avviene server-side,
 * nessun dato sensibile (es. token Strapi) viene esposto al browser.
 *
 * I componenti interattivi (carousel, accordion, modal…) sono
 * 'use client' e ricevono i dati già fetchati come props.
 */
export default async function HomePage() {
  // Fetch parallelo di tutti i dati necessari
  const [
    articoliHero,
    articoliEvidenza,
    articoliPiuLetti,
    alert,
    faqs,
    itinerario,
    eventi,
    impostazioni,
  ] = await Promise.allSettled([
    getArticlesHero(),
    getArticlesInEvidenza(),
    getArticoliPiuLetti(),
    getAlert(),
    getFaqs(),
    getItinerario(),
    getEventiCulturali(),
    getImpostazioniGenerali(),
  ]);

  // Helper per estrarre il valore o fallback
  function val<T>(result: PromiseSettledResult<T>, fallback: T): T {
    return result.status === 'fulfilled' ? result.value : fallback;
  }

  const hero = val(articoliHero, []);
  const evidenza = val(articoliEvidenza, []);
  const piuLetti = val(articoliPiuLetti, []);
  const alertData = val(alert, null);
  const faqData = val(faqs, []);
  const itinerarioData = val(itinerario, null);
  const eventiData = val(eventi, []);
  const impostazioniData = val(impostazioni, null);

  return (
    <>
      {/* Bootstrap JS (solo client) */}
      <BootstrapClient />

      {/* ── ALERT EDITORIALE ── */}
      <AlertEditoriale alert={alertData} />

      {/* ── HERO CAROUSEL ── */}
      <HeroCarousel articles={hero} />

      {/* ── MAIN CONTENT ── */}
      <div className="container py-5">
        <div className="row g-5">

          {/* ── COLONNA PRINCIPALE ── */}
          <div className="col-lg-8">

            {/* Reportage in evidenza */}
            <ReportageGrid articles={evidenza} />

            <hr className="divider-gold" />

            {/* FAQ Accordion */}
            <FaqAccordion faqs={faqData} />

            <hr className="divider-gold" />

            {/* Itinerario della settimana */}
            <ItinerarioCollapse itinerario={itinerarioData} />

          </div>

          {/* ── SIDEBAR ── */}
          <Sidebar
            articoliPiuLetti={piuLetti}
            eventi={eventiData}
          />

        </div>
      </div>



      {/* Inizializza popover Bootstrap dopo il mount */}
      <PopoverInit />
    </>
  );
}
