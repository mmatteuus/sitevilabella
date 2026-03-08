import { Link } from 'react-router-dom';
import { Clock, MapPin, Truck, AlertCircle, CheckCircle2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { brand, getWhatsAppUrl } from '@/config/brand';

export default function EntregaFretePage() {
  return (
    <main className="py-12 md:py-20">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm mb-4">
            <Truck className="h-4 w-4" />
            Entrega & Frete
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Como funciona nossa entrega</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Levamos seus presentes com cuidado e pontualidade para Araguaína e região.
          </p>
        </div>

        {/* Delivery promise */}
        <div className="bg-primary rounded-2xl p-8 text-primary-foreground mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">Entrega em até 3 horas</h2>
              <p className="text-primary-foreground/80">Para pedidos realizados até às 15h</p>
            </div>
          </div>
          <p className="text-primary-foreground/90">
            Nossa entrega expressa garante que suas flores cheguem frescas e no momento certo. 
            Trabalhamos com dedicação para que cada entrega seja especial.
          </p>
        </div>

        {/* Delivery windows */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-6">Janelas de entrega</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                period: 'Manhã',
                time: '8h às 12h',
                description: 'Ideal para surpresas matinais',
                available: true,
              },
              {
                period: 'Tarde',
                time: '12h às 17h',
                description: 'O horário mais solicitado',
                available: true,
              },
              {
                period: 'Noite',
                time: '17h às 21h',
                description: 'Para surpresas ao fim do dia',
                available: true,
              },
              {
                period: 'Expressa',
                time: 'Em até 3 horas',
                description: 'Disponível conforme pedido e localização',
                available: true,
                highlight: true,
              },
            ].map((window) => (
              <div
                key={window.period}
                className={`p-6 rounded-xl border ${window.highlight ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{window.period}</h3>
                  {window.available ? (
                    <span className="flex items-center gap-1 text-success text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      Disponível
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-muted-foreground text-sm">
                      <AlertCircle className="h-4 w-4" />
                      Consulte
                    </span>
                  )}
                </div>
                <p className={`text-xl font-bold mb-1 ${window.highlight ? 'text-primary' : ''}`}>{window.time}</p>
                <p className="text-sm text-muted-foreground">{window.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Coverage area */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-6">Área de cobertura</h2>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <MapPin className="h-6 w-6 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Araguaína - TO (cidade)</h3>
                <p className="text-muted-foreground text-sm">Entrega disponível em todos os bairros da cidade</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <Truck className="h-6 w-6 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Região metropolitana</h3>
                <p className="text-muted-foreground text-sm">Consulte disponibilidade e prazo para municípios próximos</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-accent/30 rounded-lg">
              <p className="text-sm flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                Para entregas fora da área de cobertura padrão, entre em contato via WhatsApp para verificar disponibilidade e calcular o frete.
              </p>
            </div>
          </div>
        </section>

        {/* Fees */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-6">Taxas de entrega</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-4 rounded-tl-lg font-semibold">Região</th>
                  <th className="text-left p-4 font-semibold">Prazo</th>
                  <th className="text-left p-4 rounded-tr-lg font-semibold">Taxa</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { region: 'Centro e bairros próximos', deadline: 'Até 3 horas', fee: 'A partir de R$ 8,00' },
                  { region: 'Demais bairros de Araguaína', deadline: 'Até 3 horas', fee: 'A partir de R$ 12,00' },
                  { region: 'Setor industrial / periferia', deadline: 'Até 4 horas', fee: 'A partir de R$ 15,00' },
                  { region: 'Municípios próximos', deadline: 'Consultar', fee: 'Consultar' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="p-4 text-sm">{row.region}</td>
                    <td className="p-4 text-sm text-muted-foreground">{row.deadline}</td>
                    <td className="p-4 text-sm font-medium text-primary">{row.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">* Valores podem variar. Frete calculado no checkout conforme endereço.</p>
        </section>

        {/* Important info */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-6">Informações importantes</h2>
          <div className="space-y-4">
            {[
              'As flores são preparadas e embaladas com cuidado no momento da entrega para garantir máxima frescor.',
              'Em caso de ausência do destinatário, tentamos entrar em contato. Se não houver resposta, o produto é devolvido e remarcamos a entrega.',
              'Pedidos realizados após às 15h serão entregues no próximo dia útil, salvo combinação prévia via WhatsApp.',
              'Para pedidos em datas comemorativas (Dia dos Namorados, Dia das Mães, etc.), recomendamos realizar o pedido com antecedência.',
              'Não realizamos entregas em endereços de acesso restrito sem autorização prévia.',
            ].map((info, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                <p className="text-sm">{info}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-accent/30 rounded-2xl p-8">
          <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">Dúvidas sobre entrega?</h2>
          <p className="text-muted-foreground mb-6">Fale conosco pelo WhatsApp e esclarecemos tudo rapidinho.</p>
          <Button asChild variant="hero" size="lg">
            <a href={getWhatsAppUrl('Olá! Tenho dúvidas sobre entrega e frete.')} target="_blank" rel="noopener noreferrer">
              Falar no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
