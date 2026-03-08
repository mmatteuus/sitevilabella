import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { TrustBadges } from '@/components/ui/trust-badges';
import { Testimonials } from '@/components/home/Testimonials';
import { Newsletter } from '@/components/home/Newsletter';
import { LocationSection } from '@/components/home/LocationSection';
import { categories, getBestSellers, occasions } from '@/data/products';
import { brand } from '@/config/brand';
import heroImg from '@/assets/hero-flowers.jpg';

// AI occasion images
import aniversarioHero from '@/assets/occasions/aniversario-hero.jpg';
import romanticoHero from '@/assets/occasions/romantico-hero.jpg';
import parabensHero from '@/assets/occasions/parabens-hero.jpg';
import maternidadeHero from '@/assets/occasions/maternidade-hero.jpg';
import condolenciasHero from '@/assets/occasions/condolencias-hero.jpg';
import agradecimentoHero from '@/assets/occasions/agradecimento-hero.jpg';

const occasionImages: Record<string, string> = {
  aniversario: aniversarioHero,
  romantico: romanticoHero,
  parabens: parabensHero,
  maternidade: maternidadeHero,
  condolencias: condolenciasHero,
  agradecimento: agradecimentoHero,
};

// Intersection Observer hook for scroll-triggered animations
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function HomePage() {
  const bestSellers = getBestSellers();

  const { ref: trustRef, inView: trustInView } = useInView();
  const { ref: bestsellersRef, inView: bestsellersInView } = useInView();
  const { ref: categoriesRef, inView: categoriesInView } = useInView();
  const { ref: occasionsRef, inView: occasionsInView } = useInView();

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background with parallax-like effect */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[2s]"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/55 to-foreground/20" />
        </div>

        {/* Floating petal decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { size: 'w-3 h-3', top: '15%', left: '70%', delay: '0s', duration: '6s' },
            { size: 'w-2 h-2', top: '30%', left: '80%', delay: '1s', duration: '8s' },
            { size: 'w-4 h-4', top: '60%', left: '75%', delay: '2s', duration: '7s' },
            { size: 'w-2 h-2', top: '75%', left: '85%', delay: '0.5s', duration: '9s' },
            { size: 'w-3 h-3', top: '45%', left: '90%', delay: '3s', duration: '6s' },
          ].map((p, i) => (
            <div
              key={i}
              className={`absolute ${p.size} rounded-full bg-primary/40 animate-float`}
              style={{ top: p.top, left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
            />
          ))}
        </div>

        <div className="container relative z-10 py-24">
          <div className="max-w-xl text-primary-foreground">
            <div
              className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm mb-6"
              style={{ animation: 'slideDown 0.6s ease-out forwards', opacity: 0 }}
            >
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              {brand.delivery.promiseShort}
            </div>

            <h1
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{ animation: 'slideUp 0.7s 0.1s ease-out forwards', opacity: 0 }}
            >
              Flores que<br />
              <span className="text-primary relative">
                emocionam
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/50 rounded" />
              </span>
            </h1>

            <p
              className="text-lg md:text-xl text-primary-foreground/90 mb-8"
              style={{ animation: 'slideUp 0.7s 0.2s ease-out forwards', opacity: 0 }}
            >
              Especialistas em plantar flores e colher sorrisos.
              Entregamos emoções para {brand.address.city} e região.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{ animation: 'slideUp 0.7s 0.35s ease-out forwards', opacity: 0 }}
            >
              <Button asChild variant="hero" size="xl">
                <Link to="/loja">
                  Comprar agora
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
                <Link to="/clube-vb">
                  Assine o Clube VB
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Trust Badges — animated on scroll */}
      <section
        ref={trustRef as React.RefObject<HTMLElement>}
        className={`py-12 -mt-10 relative z-20 transition-all duration-700 ${trustInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="container">
          <TrustBadges />
        </div>
      </section>

      {/* Best Sellers */}
      <section
        ref={bestsellersRef as React.RefObject<HTMLElement>}
        className={`py-16 transition-all duration-700 ${bestsellersInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-primary mb-1">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Destaques</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Mais vendidos</h2>
              <p className="text-muted-foreground mt-1">Os favoritos dos nossos clientes</p>
            </div>
            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link to="/loja">
                Ver todos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product, i) => (
              <div
                key={product.id}
                className={`transition-all duration-500 ${bestsellersInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link to="/loja">
                Ver todos os produtos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        ref={categoriesRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-rose transition-all duration-700 ${categoriesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Explore por categoria
            </h2>
            <p className="text-muted-foreground">
              Encontre o presente perfeito para cada ocasião
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, i) => (
              <Link
                key={category.id}
                to={`/categoria/${category.slug}`}
                className={`group relative aspect-[4/5] rounded-xl overflow-hidden transition-all duration-500 ${categoriesInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-primary-foreground/80 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-primary-foreground/70 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ver produtos <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section
        ref={occasionsRef as React.RefObject<HTMLElement>}
        className={`py-16 transition-all duration-700 ${occasionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Flores para cada ocasião
            </h2>
            <p className="text-muted-foreground">
              Surpreenda com o presente certo no momento perfeito
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {occasions.map((occasion, i) => (
              <Link
                key={occasion.id}
                to={`/ocasioes/${occasion.slug}`}
                className={`group text-center p-4 rounded-xl border bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 ${occasionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-300">
                  <img
                    src={occasionImages[occasion.slug] || occasion.image}
                    alt={occasion.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{occasion.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />

      {/* Location */}
      <LocationSection />
    </main>
  );
}
