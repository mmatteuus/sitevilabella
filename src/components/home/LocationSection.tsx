import { MapPin, Clock, Phone } from 'lucide-react';

export function LocationSection() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-lg h-[300px] lg:h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.9086850458287!2d-48.20507908520961!3d-7.186908894819897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92d90c1e4f0c4a6d%3A0x2f5c2e0f7e6e2d0e!2sAv.%20Amazonas%2C%20529%20-%20St.%20Central%2C%20Aragua%C3%ADna%20-%20TO!5e0!3m2!1spt-BR!2sbr!4v1703123456789!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Villa Bella Floricultura"
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
                    Av. Amazonas, 529 - St. Central<br />
                    Araguaína - TO, 77804-010
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
                    Segunda a Sábado: 8h às 18h<br />
                    Domingo: 8h às 12h
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
                    href="https://wa.me/5563992379935"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    +55 63 99237-9935
                  </a>
                </div>
              </div>
            </div>

            {/* Delivery badge */}
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-success rounded-full animate-pulse" />
                <span className="font-semibold text-success">Entrega em até 3 horas</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Para pedidos realizados até às 15h, entregamos no mesmo dia!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
