import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { brand, getAddressLine, getWhatsAppUrl } from '@/config/brand';

export default function ContatoPage() {
  return (
    <main className="py-12 md:py-20">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm mb-4">
            <MapPin className="h-4 w-4" />
            Contato & Localização
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Visite-nos ou fale conosco</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Estamos sempre prontos para ajudá-lo a encontrar o presente perfeito.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 space-y-5">
              <h2 className="font-display text-xl font-bold">Informações de contato</h2>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Endereço</p>
                  <p className="text-muted-foreground text-sm">{getAddressLine()}</p>
                  <p className="text-muted-foreground text-sm">{brand.address.city} - {brand.address.state}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    {brand.contact.whatsapp.numberDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">E-mail</p>
                  <a
                    href={`mailto:${brand.contact.email}`}
                    className="text-primary hover:underline text-sm"
                  >
                    {brand.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Horário de funcionamento</p>
                  <p className="text-muted-foreground text-sm">{brand.hours.weekdays}</p>
                  <p className="text-muted-foreground text-sm">{brand.hours.sunday}</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-primary rounded-xl p-6 text-primary-foreground">
              <MessageCircle className="h-8 w-8 mb-3" />
              <h3 className="font-display text-xl font-bold mb-2">Atendimento rápido via WhatsApp</h3>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Respondemos em minutos! Tire dúvidas, faça pedidos especiais ou agende entregas.
              </p>
              <Button asChild variant="secondary" size="lg" className="w-full">
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  Abrir WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Map */}
          <div>
            <div className="rounded-xl overflow-hidden border border-border h-64 md:h-80 mb-4">
              <iframe
                src={brand.maps.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Villa Bella Floricultura"
              />
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="font-semibold text-sm mb-1">Villa Bella Floricultura</p>
              <p className="text-muted-foreground text-sm">{getAddressLine()}, {brand.address.city} - {brand.address.state}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(getAddressLine() + ', ' + brand.address.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm hover:underline mt-2 inline-block"
              >
                Abrir no Google Maps →
              </a>
            </div>

            {/* Social */}
            <div className="mt-4 bg-card border border-border rounded-xl p-4">
              <p className="font-semibold text-sm mb-3">Siga-nos nas redes sociais</p>
              <div className="flex gap-3">
                <a
                  href={brand.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center p-3 rounded-lg border border-border hover:bg-accent transition-colors text-sm font-medium"
                >
                  Instagram
                </a>
                <a
                  href={brand.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center p-3 rounded-lg border border-border hover:bg-accent transition-colors text-sm font-medium"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
