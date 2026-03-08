import { Eye, Keyboard, Volume2, MonitorSmartphone, CheckCircle2 } from 'lucide-react';
import { brand } from '@/config/brand';

export default function AcessibilidadePage() {
  return (
    <main className="py-12 md:py-20">
      <div className="container max-w-3xl">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold mb-3">Acessibilidade</h1>
          <p className="text-muted-foreground text-lg">
            Nosso compromisso com uma experiência inclusiva para todos
          </p>
        </div>

        {/* Commitment */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mb-10">
          <p className="text-foreground leading-relaxed">
            A {brand.legalName} está comprometida em tornar nosso site acessível a todas as pessoas, 
            independentemente de suas habilidades ou limitações. Trabalhamos continuamente para melhorar 
            a acessibilidade de nosso conteúdo digital.
          </p>
        </div>

        {/* Features */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-6">Recursos de acessibilidade implementados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: Eye,
                title: 'Contraste e legibilidade',
                items: [
                  'Alto contraste entre texto e fundo',
                  'Tamanhos de fonte legíveis',
                  'Não dependemos apenas de cor para transmitir informações',
                ],
              },
              {
                icon: Keyboard,
                title: 'Navegação por teclado',
                items: [
                  'Todos os elementos interativos acessíveis por Tab',
                  'Foco visível e bem definido',
                  'Atalhos de teclado disponíveis',
                ],
              },
              {
                icon: Volume2,
                title: 'Leitores de tela',
                items: [
                  'Textos alternativos em todas as imagens',
                  'Estrutura semântica com HTML correto',
                  'Labels descritivos em formulários',
                ],
              },
              {
                icon: MonitorSmartphone,
                title: 'Responsividade',
                items: [
                  'Design adaptável para todos os tamanhos de tela',
                  'Compatível com zoom do navegador',
                  'Touch-friendly para dispositivos móveis',
                ],
              },
            ].map(({ icon: Icon, title, items }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                </div>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Standards */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">Padrões seguidos</h2>
          <div className="space-y-3">
            {[
              { standard: 'WCAG 2.1 Nível AA', description: 'Diretrizes de Acessibilidade para Conteúdo Web do W3C' },
              { standard: 'eMAG', description: 'Modelo de Acessibilidade em Governo Eletrônico (como referência)' },
              { standard: 'ARIA', description: 'Accessible Rich Internet Applications — atributos semânticos para tecnologias assistivas' },
            ].map(({ standard, description }) => (
              <div key={standard} className="flex items-start gap-4 p-4 border border-border rounded-lg bg-card">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{standard}</p>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Known limitations */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">Limitações conhecidas</h2>
          <div className="bg-muted/50 rounded-xl p-6">
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              Embora nos esforcemos para alcançar a máxima acessibilidade, algumas partes do site podem ainda não estar totalmente em conformidade. Estamos trabalhando continuamente para melhorar:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Galeria de imagens de produtos com zoom (em desenvolvimento)</li>
              <li>Algumas funcionalidades de filtro do catálogo</li>
            </ul>
          </div>
        </section>

        {/* Feedback */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4">Feedback e contato</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Encontrou alguma barreira de acessibilidade em nosso site? Por favor, nos informe. 
            Estamos comprometidos em responder e resolver problemas de acessibilidade em até 5 dias úteis.
          </p>
          <div className="bg-card border border-border rounded-xl p-5 space-y-2">
            <p className="text-sm">
              <span className="font-semibold">E-mail:</span>{' '}
              <a href={`mailto:${brand.contact.email}`} className="text-primary hover:underline">{brand.contact.email}</a>
            </p>
            <p className="text-sm">
              <span className="font-semibold">WhatsApp:</span>{' '}
              <a href={`https://wa.me/${brand.contact.whatsapp.numberE164}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {brand.contact.whatsapp.numberDisplay}
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
