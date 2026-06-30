import type { Alert } from '@/types/strapi';

interface AlertEditorialeProps {
  alert: Alert | null;
}

export default function AlertEditoriale({ alert }: AlertEditorialeProps) {
  if (!alert || !alert.attivo) return null;

  return (
    <div className="container mt-3">
      <div
        className="alert alert-rotte alert-dismissible fade show d-flex align-items-start gap-2 mb-0"
        role="alert"
      >
        <i className="bi bi-info-circle-fill text-terracotta fs-5 flex-shrink-0 mt-1"></i>
        <div>
          {alert.testo}{' '}
          {alert.linkUrl && alert.linkTesto && (
            <a href={alert.linkUrl} className="text-terracotta fw-bold ms-1">
              {alert.linkTesto} →
            </a>
          )}
        </div>
        <button
          type="button"
          className="btn-close ms-auto"
          data-bs-dismiss="alert"
          aria-label="Chiudi"
        ></button>
      </div>
    </div>
  );
}
