import { ExternalLink, MapPin } from 'lucide-react';

type ContactMapProps = {
  embedUrl: string;
  linkUrl?: string | null;
};

export const ContactMap = ({ embedUrl, linkUrl }: ContactMapProps) => (
  <section aria-labelledby="contact-map-title" className="space-y-4">
    <div className="flex items-center gap-3">
      <span className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
        <MapPin aria-hidden="true" className="size-5" />
      </span>
      <div>
        <h2 id="contact-map-title" className="text-2xl font-semibold">
          Як нас знайти
        </h2>
        <p className="text-sm text-muted-foreground">
          м. Луцьк, вул. Львівська, 28
        </p>
      </div>
    </div>

    <div className="overflow-hidden rounded-xl border bg-muted shadow-sm">
      <iframe
        allowFullScreen
        className="h-[360px] w-full md:h-[460px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={embedUrl}
        title="Карта розташування Луцької школи № 2"
      />
    </div>

    {linkUrl ? (
      <a
        className="inline-flex items-center gap-2 font-medium text-blue-700 hover:underline"
        href={linkUrl}
        rel="noreferrer"
        target="_blank"
      >
        Відкрити в Google Maps
        <ExternalLink aria-hidden="true" className="size-4" />
      </a>
    ) : null}
  </section>
);
