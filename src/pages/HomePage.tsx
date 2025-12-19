import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { TrustBadges } from '@/components/ui/trust-badges';
import { Testimonials } from '@/components/home/Testimonials';
import { Newsletter } from '@/components/home/Newsletter';
import { LocationSection } from '@/components/home/LocationSection';
import { categories, getBestSellers, occasions } from '@/data/products';
import { brand } from '@/config/brand';

export default function HomePage() {
  const bestSellers = getBestSellers();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-xl text-primary-foreground">
            <div className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm mb-6 animate-slide-down">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              {brand.delivery.promiseShort}
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Flores que<br />
              <span className="text-primary">emocionam</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Especialistas em plantar flores e colher sorrisos. 
              Entregamos emoções para {brand.address.city} e região.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
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

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Trust Badges */}
      <section className="py-12 -mt-8 relative z-20">
        <div className="container">
          <TrustBadges />
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
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
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
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
      <section className="py-16 bg-rose">
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
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categoria/${category.slug}`}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-primary-foreground/80 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="py-16">
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
            {occasions.map((occasion) => (
              <Link
                key={occasion.id}
                to={`/ocasioes/${occasion.slug}`}
                className="group text-center p-4 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                  <img
                    src={occasion.image}
                    alt={occasion.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-medium text-sm">{occasion.name}</h3>
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
