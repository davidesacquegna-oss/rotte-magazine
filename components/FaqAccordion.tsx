'use client';

import type { Faq } from '@/types/strapi';

interface FaqAccordionProps {
  faqs: Faq[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  if (!faqs.length) return null;

  return (
    <div className="mb-5">
      <p className="section-label mb-1">Guida pratica</p>
      <h2 className="section-title mb-4">Domande frequenti del viaggiatore</h2>

      <div className="accordion accordion-rotte" id="accordionFAQ">
        {faqs.map((faq, i) => {
          const collapseId = `faq-${faq.id}`;
          const isFirst = i === 0;

          return (
            <div className="accordion-item" key={faq.id}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button${isFirst ? '' : ' collapsed'}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${collapseId}`}
                  aria-expanded={isFirst ? 'true' : 'false'}
                  aria-controls={collapseId}
                >
                  {faq.domanda}
                </button>
              </h2>
              <div
                id={collapseId}
                className={`accordion-collapse collapse${isFirst ? ' show' : ''}`}
                data-bs-parent="#accordionFAQ"
              >
                <div className="accordion-body">{faq.risposta}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
