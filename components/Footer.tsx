import type { ImpostazioneGenerale } from '@/types/strapi';

interface FooterProps {
  impostazioni: ImpostazioneGenerale | null;
}

export default function Footer({ impostazioni }: FooterProps) {
  const nome = impostazioni?.nomeRivista ?? 'Rotte';
  const descrizione =
    impostazioni?.descrizioneFooter ??
    'Giornalismo di viaggio indipendente dal 2009. Raccontiamo il mondo per chi vuole capirlo, non solo vederlo.';
  const emailContatto = impostazioni?.email ?? 'redazione@rottemagazine.it';
  const indirizzo = impostazioni?.indirizzo ?? 'Via Zamboni 33, Bologna';
  const telefono = impostazioni?.telefono ?? '+39 051 000 0000';

  return (
    <footer className="mt-5 pt-5 pb-4">
      <div className="container">
        <div className="row g-4 mb-4">

          {/* Brand + social */}
          <div className="col-lg-4">
            <div className="brand mb-2">{nome}<span>.</span></div>
            <p style={{ color: 'var(--muted)', fontSize: '.85rem', maxWidth: '280px' }}>
              {descrizione}
            </p>
            <div className="d-flex gap-3 mt-3">
              {impostazioni?.instagram && (
                <a href={impostazioni.instagram} aria-label="Instagram">
                  <i className="bi bi-instagram fs-5"></i>
                </a>
              )}
              {impostazioni?.twitter && (
                <a href={impostazioni.twitter} aria-label="Twitter/X">
                  <i className="bi bi-twitter-x fs-5"></i>
                </a>
              )}
              {impostazioni?.facebook && (
                <a href={impostazioni.facebook} aria-label="Facebook">
                  <i className="bi bi-facebook fs-5"></i>
                </a>
              )}
              {impostazioni?.youtube && (
                <a href={impostazioni.youtube} aria-label="YouTube">
                  <i className="bi bi-youtube fs-5"></i>
                </a>
              )}
              {/* Fallback se Strapi non ha i social */}
              {!impostazioni && (
                <>
                  <a href="#"><i className="bi bi-instagram fs-5"></i></a>
                  <a href="#"><i className="bi bi-twitter-x fs-5"></i></a>
                  <a href="#"><i className="bi bi-facebook fs-5"></i></a>
                  <a href="#"><i className="bi bi-youtube fs-5"></i></a>
                </>
              )}
            </div>
          </div>

          {/* Sezioni */}
          <div className="col-6 col-lg-2">
            <h6 className="text-uppercase" style={{ fontSize: '.7rem', letterSpacing: '.15em', color: 'var(--gold)' }}>
              Sezioni
            </h6>
            <ul className="list-unstyled mt-2">
              {['Reportage', 'Itinerari', 'Gastronomia', 'Fotografia', 'Video'].map((v) => (
                <li key={v}><a href="#">{v}</a></li>
              ))}
            </ul>
          </div>

          {/* Rivista */}
          <div className="col-6 col-lg-2">
            <h6 className="text-uppercase" style={{ fontSize: '.7rem', letterSpacing: '.15em', color: 'var(--gold)' }}>
              Rivista
            </h6>
            <ul className="list-unstyled mt-2">
              {['Abbonamenti', 'Arretrati', 'Edicola', 'Press kit'].map((v) => (
                <li key={v}><a href="#">{v}</a></li>
              ))}
            </ul>
          </div>

          {/* Contatti */}
          <div className="col-lg-4">
            <h6 className="text-uppercase" style={{ fontSize: '.7rem', letterSpacing: '.15em', color: 'var(--gold)' }}>
              Contatti
            </h6>
            <p style={{ fontSize: '.85rem', color: 'var(--muted)' }} className="mt-2">
              <i className="bi bi-envelope me-2 text-terracotta"></i>{emailContatto}<br />
              <i className="bi bi-geo-alt me-2 text-terracotta"></i>{indirizzo}<br />
              <i className="bi bi-telephone me-2 text-terracotta"></i>{telefono}
            </p>
          </div>

        </div>

        <hr className="footer-divider" />

        <div className="d-flex flex-wrap justify-content-between align-items-center" style={{ fontSize: '.75rem', color: 'var(--muted)' }}>
          <span>© 2025 {nome} Srl · P.IVA 01234567891</span>
          <div className="d-flex gap-3">
            <a href="#">Privacy</a>
            <a href="#">Cookie</a>
            <a href="#">Termini d&apos;uso</a>
            <a href="#">Accessibilità</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
