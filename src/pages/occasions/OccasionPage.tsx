import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Heart, Clock, Shield, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { occasions, products } from '@/data/products';
import { brand } from '@/config/brand';

// Occasion-specific hero images
import aniversarioHero from '@/assets/occasions/aniversario-hero.jpg';
import romanticoHero from '@/assets/occasions/romantico-hero.jpg';
import parabensHero from '@/assets/occasions/parabens-hero.jpg';
import maternidadeHero from '@/assets/occasions/maternidade-hero.jpg';
import condolenciasHero from '@/assets/occasions/condolencias-hero.jpg';
import agradecimentoHero from '@/assets/occasions/agradecimento-hero.jpg';

const heroImages: Record<string, string> = {
  aniversario: aniversarioHero,
  romantico: romanticoHero,
  parabens: parabensHero,
  maternidade: maternidadeHero,
  condolencias: condolenciasHero,
  agradecimento: agradecimentoHero,
};

const occasionThemes: Record<string, { gradient: string; accent: string; emoji: string; tips: string[] }> = {
  aniversario: {
    gradient: 'from-primary/80 via-primary/60 to-primary/30',
    accent: 'text-primary',
    emoji: '🎂',
    tips: [
      'Combine flores com chocolates Ferrero Rocher para um presente memorável',
      'Personalize com uma mensagem no cartão — gratuito!',
      'Entregamos com balão surpresa mediante consulta',
    ],
  },
  romantico: {
    gradient: 'from-rose-900/90 via-primary/70 to-transparent',
    accent: 'text-primary',
    emoji: '❤️',
    tips: [
      'Rosas vermelhas: o clássico que nunca decepciona',
      'Adicione uma cesta romântica para um presente completo',
      'Entregamos à noite (até 22h) para surpresas especiais',
    ],
  },
  parabens: {
    gradient: 'from-amber-800/80 via-primary/60 to-transparent',
    accent: 'text-primary',
    emoji: '🎉',
    tips: [
      'Girassóis e flores coloridas transmitem alegria e energia',
      'Combine com chocolates para um presente ainda mais especial',
      'Disponível para entrega rápida em até 3 horas',
    ],
  },
  maternidade: {
    gradient: 'from-pink-900/80 via-pink-700/50 to-transparent',
    accent: 'text-primary',
    emoji: '🍼',
    tips: [
      'Rosas cor-de-rosa e brancas são perfeitas para maternidade',
      'Adicione pelúcia ou kit bebê mediante consulta',
      'Entregamos diretamente na maternidade',
    ],
  },
  condolencias: {
    gradient: 'from-slate-900/90 via-slate-700/70 to-transparent',
    accent: 'text-muted-foreground',
    emoji: '🕊️',
    tips: [
      'Flores brancas simbolizam paz e respeito',
      'Coroas e arranjos são montados com esmero e dignidade',
      'Entrega prioritária para velórios e homenagens',
    ],
  },
  agradecimento: {
    gradient: 'from-amber-900/80 via-amber-700/50 to-transparent',
    accent: 'text-primary',
    emoji: '🌻',
    tips: [
      'Girassóis e flores amarelas expressam gratidão e calor',
      'Uma mensagem personalizada torna o gesto ainda mais especial',
      'Entregamos em empresas e residências',
    ],
  },
};

export default function OccasionPage() {
  const { occasion: occasionSlug } = useParams<{ occasion: string }>();
  const occasion = occasions.find(o => o.slug === occasionSlug);

  if (!occasion) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Ocasião não encontrada</h1>
        <p className="text-muted-foreground mb-8">A ocasião que você procura não existe.</p>
        <Button asChild>
          <Link to="/loja">Ver todos os produtos</Link>
        </Button>
      </div>
    );
  }

  const theme = occasionThemes[occasion.slug] ?? occasionThemes.aniversario;
  const heroImg = heroImages[occasion.slug];

  // Filter products by occasion tags
  const occasionTagMap: Record<string, string[]> = {
    aniversario: ['aniversário'],
    romantico: ['romântico', 'amor'],
    parabens: ['parabéns', 'alegria'],
    maternidade: ['maternidade'],
    condolencias: ['condolências', 'homenagem', 'paz'],
    agradecimento: ['agradecimento'],
  };

  const tags = occasionTagMap[occasion.slug] ?? [];
  const occasionProducts = products.filter(p =>
    p.tags.some(tag => tags.some(t => tag.toLowerCase().includes(t.toLowerCase())))
  );

  // Fallback to first 4 products if no tags match
  const displayProducts = occasionProducts.length > 0 ? occasionProducts : products.slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient}`} />
        </div>
        <div className="container relative z-10 py-20">
          <div className="max-w-lg text-primary-foreground">
            <div className="inline-flex items-center gap-2 bg-primary/80 text-primary-foreground px-4 py-2 rounded-full text-sm mb-6 animate-fade-in">
              <span>{theme.emoji}</span>
              <span>Flores para {occasion.name}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-up">
              {occasion.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              {occasion.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Button asChild variant="hero" size="xl">
                <a href="#produtos">
                  Ver flores
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="xl" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
                <Link to={`/loja?ocasiao=${occasion.slug}`}>
                  Ver catálogo completo
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Trust strip */}
      <section className="py-8 bg-accent/30 border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: Clock, label: brand.delivery.promiseShort },
              { icon: Shield, label: 'Pagamento seguro' },
              { icon: Heart, label: 'Satisfação garantida' },
              { icon: Gift, label: 'Mensagem personalizada' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="produtos" className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              {theme.emoji} Flores perfeitas para {occasion.name}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{occasion.description}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/loja">
                Ver todos os produtos
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tips section */}
      <section className="py-16 bg-rose">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
              Dicas para um presente inesquecível
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {theme.tips.map((tip, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mb-4">
                    {i + 1}
                  </div>
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other occasions */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-bold mb-6 text-center">Outras ocasiões</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {occasions
              .filter(o => o.slug !== occasion.slug)
              .map((occ) => (
                <Link
                  key={occ.id}
                  to={`/ocasioes/${occ.slug}`}
                  className="group text-center p-4 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                    <img
                      src={heroImages[occ.slug] || occ.image}
                      alt={occ.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-medium text-sm">{occ.name}</h3>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
