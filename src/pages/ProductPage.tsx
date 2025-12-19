import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, Heart, Share2, Truck, Shield, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product/ProductCard';
import { TrustBadgesCompact } from '@/components/ui/trust-badges';
import { useCart } from '@/contexts/CartContext';
import { 
  getProductBySlug, 
  getRelatedProducts, 
  getCombinesWith, 
  getRecommendedAddOns 
} from '@/data/products';
import { brand } from '@/config/brand';

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug || '');
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState(product?.variations?.[0]?.id || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cardMessage, setCardMessage] = useState('');
  const [cardSignature, setCardSignature] = useState('');
  const [showMessageForm, setShowMessageForm] = useState(false);

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        <Button asChild>
          <Link to="/loja">Voltar para a loja</Link>
        </Button>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id);
  const combinesWith = getCombinesWith(product.id);
  const addOns = getRecommendedAddOns(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariation ? 
      product.variations?.find(v => v.id === selectedVariation)?.name : undefined
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <main className="py-8">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/loja" className="hover:text-primary">Loja</Link>
          <span className="mx-2">/</span>
          <Link to={`/categoria/${product.category}`} className="hover:text-primary capitalize">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product Detail */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
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

              {/* Navigation arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 hover:bg-background flex items-center justify-center shadow-md transition-colors"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 hover:bg-background flex items-center justify-center shadow-md transition-colors"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Imagem ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-muted'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviewCount} avaliações)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Fast delivery badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success">
              <Truck className="h-4 w-4" />
              <span className="text-sm font-medium">{brand.delivery.promiseShort}</span>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            {/* Variations */}
            {product.variations && product.variations.length > 0 && (
              <div>
                <Label className="text-base font-semibold mb-3 block">Escolha a cor</Label>
                <div className="flex flex-wrap gap-3">
                  {product.variations.map((variation) => (
                    <button
                      key={variation.id}
                      onClick={() => setSelectedVariation(variation.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        selectedVariation === variation.id
                          ? 'border-primary bg-accent'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {variation.color && (
                        <span
                          className="w-5 h-5 rounded-full border border-border"
                          style={{ backgroundColor: variation.color }}
                        />
                      )}
                      <span className="text-sm">{variation.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Card Message */}
            <div className="border rounded-lg p-4 bg-accent/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Mensagem do cartão</span>
                  <Badge variant="outline" className="text-xs">Grátis</Badge>
                </div>
                <button
                  onClick={() => setShowMessageForm(!showMessageForm)}
                  className="text-sm text-primary hover:underline"
                >
                  {showMessageForm ? 'Fechar' : 'Adicionar'}
                </button>
              </div>
              
              {showMessageForm && (
                <div className="space-y-3 animate-slide-down">
                  <div>
                    <Label htmlFor="cardMessage">Sua mensagem</Label>
                    <Textarea
                      id="cardMessage"
                      placeholder="Escreva aqui sua mensagem especial..."
                      value={cardMessage}
                      onChange={(e) => setCardMessage(e.target.value)}
                      maxLength={200}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{cardMessage.length}/200 caracteres</p>
                  </div>
                  <div>
                    <Label htmlFor="cardSignature">Assinatura (opcional)</Label>
                    <Input
                      id="cardSignature"
                      placeholder="Deixe em branco para enviar anônimo"
                      value={cardSignature}
                      onChange={(e) => setCardSignature(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="hero"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                Adicionar ao carrinho
              </Button>

              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust badges */}
            <TrustBadgesCompact />

            {/* Share */}
            <div className="flex items-center gap-2 pt-4 border-t">
              <span className="text-sm text-muted-foreground">Compartilhar:</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Complete your gift - Add-ons */}
        {addOns.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-6">Complete seu presente</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {addOns.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Combines with */}
        {combinesWith.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-6">Você também pode gostar de...</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {combinesWith.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold mb-6">Produtos relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
