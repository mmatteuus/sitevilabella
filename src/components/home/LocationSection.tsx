import { MapPin, Clock, Phone } from 'lucide-react';
import { brand, getAddressLine, getWhatsAppUrl } from '@/config/brand';

export function LocationSection() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-lg h-[300px] lg:h-[400px]">
            <iframe
              src={brand.maps.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Localização ${brand.legalName}`}
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Visite nossa loja
              </h2>
              <p className="text-muted-foreground">
                Estamos prontos para ajudá-lo a encontrar o presente perfeito
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-card rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Endereço</h3>
                  <p className="text-muted-foreground">
                    {getAddressLine()}<br />
                    {brand.locationLabel}, {brand.address.postalCode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-card rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Horário de funcionamento</h3>
                  <p className="text-muted-foreground">
                    {brand.hours.weekdays}<br />
                    {brand.hours.sunday}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-card rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Contato</h3>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {brand.contact.whatsapp.numberDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Delivery badge */}
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-success rounded-full animate-pulse" />
                <span className="font-semibold text-success">{brand.delivery.promiseShort}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {brand.delivery.sameDayCutoff}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
