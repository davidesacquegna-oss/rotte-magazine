import type { Article } from '@/types/strapi';
import { getStrapiMedia } from '@/lib/strapi';

interface ReportageGridProps {
  articles: Article[];
}

const FALLBACK_IMAGES = [
  'https://plus.unsplash.com/premium_photo-1683658500071-3a2facfeaed2?w=600&q=80',
  'https://images.unsplash.com/photo-1476900164809-ff19b8ae5968?w=600&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
  'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80',
];

export default function ReportageGrid({ articles }: ReportageGridProps) {
  if (!articles.length) return null;

  return (
    <div className="mb-5">
      <p className="section-label mb-1">Ultime uscite</p>
      <h2 className="section-title mb-4">Reportage in evidenza</h2>

      <div className="row g-4">
        {articles.map((article, i) => {
          const imgUrl = article.immagine
            ? getStrapiMedia(article.immagine.url)
            : FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];

          return (
            <div className="col-md-6" key={article.id}>
              <div className="card card-rotte h-100">
                <img
                  src={imgUrl}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                  alt={article.immagine?.alternativeText ?? article.titolo}
                />
                <div className="card-body">
                  <div className="d-flex gap-2 mb-2">
                    <span className="badge badge-dest">{article.destinazione}</span>
                    <span className="badge badge-diff">{article.difficolta}</span>
                  </div>
                  <h5 className="card-title">{article.titolo}</h5>
                  <p className="card-text">{article.estratto}</p>
                </div>
                <div className="card-footer bg-transparent border-top-0 pb-3">
                  <a href={`/articoli/${article.slug}`} className="btn-rotte-outline">
                    Leggi →
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
