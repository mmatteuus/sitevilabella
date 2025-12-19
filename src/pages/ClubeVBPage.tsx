import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { subscriptionPlans } from '@/data/products';

export default function ClubeVBPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/50" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl text-primary-foreground">
            <Badge className="mb-4 bg-gold text-foreground">
              <Sparkles className="h-3 w-3 mr-1" />
              Exclusivo
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Clube VB
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Assine e receba flores frescas regularmente em sua casa. 
              Curadoria especial, descontos exclusivos e mimos surpresa.
            </p>
            <Button asChild variant="hero" size="xl">
              <a href="#planos">
                Ver planos
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-rose">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Por que assinar o Clube VB?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Muito mais do que flores, uma experiência completa de bem-estar e elegância
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-card">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Curadoria Especial</h3>
              <p className="text-muted-foreground">
                Flores selecionadas por nossos especialistas, sempre frescas e da estação
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Economia Garantida</h3>
              <p className="text-muted-foreground">
                Até 30% de desconto em relação às compras avulsas
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Mimos Surpresa</h3>
              <p className="text-muted-foreground">
                Em meses de 5 semanas, você recebe um presente especial
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="planos" className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Escolha seu plano
            </h2>
            <p className="text-muted-foreground">
              Cancele quando quiser, sem complicações
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl border p-6 ${
                  plan.popular
                    ? 'border-primary shadow-xl relative scale-105'
                    : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Mais popular
                    </Badge>
                  </div>
                )}

                <div className="aspect-video rounded-lg overflow-hidden mb-6">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-muted-foreground">/{plan.frequency}</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={plan.popular ? 'hero' : 'outline'}
                  className="w-full"
                >
                  <Link to={`/checkout?plano=${plan.id}`}>
                    Assinar agora
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Perguntas frequentes
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-card">
              <h3 className="font-semibold mb-2">Posso cancelar a qualquer momento?</h3>
              <p className="text-muted-foreground">
                Sim! Você pode cancelar sua assinatura quando quiser, sem multas ou taxas extras.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card">
              <h3 className="font-semibold mb-2">Como funciona a entrega?</h3>
              <p className="text-muted-foreground">
                As flores são entregues no dia e período que você escolher durante a assinatura. 
                Você pode alterar o endereço ou data a qualquer momento.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card">
              <h3 className="font-semibold mb-2">E se eu não estiver em casa?</h3>
              <p className="text-muted-foreground">
                Sem problemas! Você pode deixar instruções de entrega ou reagendar para outro dia.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card">
              <h3 className="font-semibold mb-2">Quais formas de pagamento são aceitas?</h3>
              <p className="text-muted-foreground">
                Aceitamos PIX e cartão de crédito (parcelamos em até 3x sem juros).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Comece a receber flores hoje
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Junte-se a centenas de clientes que já transformaram suas casas 
            com flores frescas toda semana
          </p>
          <Button asChild variant="secondary" size="xl">
            <a href="#planos">
              Assinar agora
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
