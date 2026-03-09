import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
  showRemoveFromWishlist?: boolean;
}

export function ProductCard({ product, showQuickAdd = true, showRemoveFromWishlist = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-card rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <Badge className="bg-success text-primary-foreground">Novo</Badge>
        )}
        {product.isBestSeller && (
          <Badge className="bg-gold text-foreground">Mais vendido</Badge>
        )}
        {discount > 0 && (
          <Badge variant="destructive">-{discount}%</Badge>
        )}
      </div>

      {/* Wishlist heart button */}
      <button
        onClick={() => toggleItem(product)}
        aria-label={wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${
          wishlisted
            ? 'bg-primary text-primary-foreground scale-110'
            : 'bg-background/80 text-muted-foreground hover:bg-background hover:text-primary'
        }`}
      >
        <Heart className={`h-4 w-4 ${wishlisted ? 'fill-current' : ''}`} />
      </button>

      {/* Image */}
      <Link to={`/produto/${product.slug}`} className="block aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </Link>

      {/* Quick actions overlay */}
      {showQuickAdd && (
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg"
              onClick={() => addItem(product)}
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
            <Link to={`/produto/${product.slug}`}>
              <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-3 md:p-4">
        <Link to={`/produto/${product.slug}`}>
          <h3 className="font-medium text-xs md:text-sm line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-muted'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="text-base md:text-lg font-bold text-primary leading-tight">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs md:text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Fast delivery badge */}
        <div className="mt-2 flex items-center gap-1 text-xs text-success">
          <span className="inline-block w-1.5 h-1.5 shrink-0 bg-success rounded-full" />
          <span className="truncate">Entrega em até 3h</span>
        </div>
      </div>
    </div>
  );
}
