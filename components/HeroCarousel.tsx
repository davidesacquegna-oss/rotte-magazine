'use client';

import { useEffect, useRef } from 'react';
import type { Article } from '@/types/strapi';
import { getStrapiMedia } from '@/lib/strapi';

interface HeroCarouselProps {
  articles: Article[];
}

// Gradiente scuro sotto la foto per leggibilità del testo
const OVERLAY =
  'linear-gradient(to top, rgba(26,18,8,.85) 40%, rgba(26,18,8,.2))';

// Fallback images se non c'è immagine in Strapi
const FALLBACKS = [
  'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&q=80',
  'https://images.unsplash.com/photo-1513415277900-a62401e19be4?w=1200&q=80',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
];

export default function HeroCarousel({ articles }: HeroCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verifichiamo di essere lato client (nel browser)
    if (typeof window !== 'undefined' && articles && articles.length > 0) {
      // Usiamo l'istanza globale di Bootstrap registrata nella window
      const win = window as any;
      if (win.bootstrap?.Carousel && carouselRef.current) {
        const carousel = new win.bootstrap.Carousel(carouselRef.current, {
          interval: 5000,
          ride: 'carousel',
          wrap: true
        });
        carousel.cycle();
      } else {
        // Se non è ancora globale, forziamo un evento di trigger sui data-attributes nativi
        const carouselEl = carouselRef.current;
        if (carouselEl) {
          carouselEl.setAttribute('data-bs-ride', 'carousel');
        }
      }
    }
  }, [articles]);

  if (!articles.length) return null;

  return (
    <div
      id="carouselHero"
      ref={carouselRef}
      className="carousel slide carousel-fade carousel-rotte mt-3"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      {/* Indicatori */}
      <div className="carousel-indicators">
        {articles.map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#carouselHero"
            data-bs-slide-to={i}
            className={i === 0 ? 'active' : ''}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {articles.map((article, i) => {
          const imgUrl = article.immagine
            ? getStrapiMedia(article.immagine.url)
            : FALLBACKS[i % FALLBACKS.length];

          const bgStyle = {
            background: `${OVERLAY}, url('${imgUrl}') center/cover`,
          };

          return (
            <div
              key={article.id}
              className={`carousel-item${i === 0 ? ' active' : ''}`}
            >
              <div className="carousel-slide" style={bgStyle}>
                <div className="carousel-caption-rotte">
                  <p className="rubrica">
                    {article.rubrica} · {article.destinazione}
                  </p>
                  <h2>{article.titolo}</h2>
                  <p>{article.estratto}</p>
                  <a
                    href={`/articoli/${article.slug}`}
                    className="btn-rotte-primary mt-2 d-inline-block"
                  >
                    Leggi il reportage
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controlli */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselHero"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Precedente</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselHero"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Successivo</span>
      </button>
    </div>
  );
}