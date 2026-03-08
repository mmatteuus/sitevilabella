import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { useWishlist } from '@/contexts/WishlistContext';

export default function WishlistPage() {
  const { items, removeItem, count } = useWishlist();

  return (
    <main className="py-8 min-h-[60vh]">
      <div className="container">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary fill-primary" />
              Minha Lista de Favoritos
            </h1>
            <p className="text-muted-foreground mt-1">
              {count} {count === 1 ? 'produto salvo' : 'produtos salvos'}
            </p>
          </div>
          {count > 0 && (
            <Button asChild variant="outline">
              <Link to="/loja">Ver mais produtos</Link>
            </Button>
          )}
        </div>

        {count === 0 ? (
          <div className="text-center py-20 space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Sua lista está vazia</h2>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Salve seus produtos favoritos aqui para encontrá-los facilmente depois.
              </p>
            </div>
            <Button asChild variant="hero">
              <Link to="/loja">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Explorar produtos
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} showRemoveFromWishlist />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
