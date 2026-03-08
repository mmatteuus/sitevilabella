import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Truck, Tag, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/product/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { getRecommendedAddOns } from '@/data/products';
import { brand, getWhatsAppUrl } from '@/config/brand';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, discount, total, coupon, applyCoupon, removeCoupon } = useCart();
  const { toast } = useToast();
  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

  const addOns = items.length > 0 ? getRecommendedAddOns(items[0].product.id).slice(0, 4) : [];

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    await new Promise(r => setTimeout(r, 500)); // simulate API check
    const result = applyCoupon(couponInput);
    setCouponLoading(false);
    toast({
      title: result.success ? '🎉 Cupom aplicado!' : 'Cupom inválido',
      description: result.message,
      variant: result.success ? 'default' : 'destructive',
    });
    if (result.success) setCouponInput('');
  };

  if (items.length === 0) {
    return (
      <main className="py-16">
        <div className="container max-w-2xl mx-auto text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground/30 mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
          <p className="text-muted-foreground mb-8">Adicione produtos para continuar sua compra</p>
          <Button asChild variant="hero" size="lg">
            <Link to="/loja">
              Ver produtos
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="py-8">
      <div className="container">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Seu Carrinho</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedVariation}`}
                className="flex gap-4 p-4 rounded-xl bg-card border"
              >
                <Link to={`/produto/${item.product.slug}`} className="shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/produto/${item.product.slug}`}
                    className="font-semibold hover:text-primary transition-colors line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  {item.selectedVariation && (
                    <p className="text-sm text-muted-foreground mt-1">Variação: {item.selectedVariation}</p>
                  )}
                  {item.cardMessage && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Cartão: "{item.cardMessage.slice(0, 30)}..."
                    </p>
                  )}
                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center border rounded-lg w-fit">
                      <Button variant="ghost" size="icon" className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <Button variant="ghost" size="sm"
                      className="text-muted-foreground hover:text-destructive ml-auto"
                      onClick={() => removeItem(item.product.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remover
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add-ons */}
            {addOns.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <h2 className="font-display text-xl font-bold mb-4">Leve junto</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {addOns.map((product) => (
                    <ProductCard key={product.id} product={product} showQuickAdd />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">Resumo do pedido</h2>

              {/* Coupon input */}
              {coupon ? (
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 text-success text-sm">
                    <Check className="h-4 w-4" />
                    <span className="font-medium">{coupon.code}</span>
                    <span className="text-success/80">– {coupon.description}</span>
                  </div>
                  <button onClick={removeCoupon} aria-label="Remover cupom"
                    className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Cupom de desconto"
                      className="pl-9 text-sm uppercase"
                    />
                  </div>
                  <Button type="submit" variant="outline" size="sm" disabled={couponLoading || !couponInput.trim()}>
                    {couponLoading ? '...' : 'Aplicar'}
                  </Button>
                </form>
              )}

              {/* Hint */}
              {!coupon && (
                <p className="text-xs text-muted-foreground -mt-2">
                  Tente: <button onClick={() => setCouponInput('VILLABELLA10')} className="text-primary hover:underline">VILLABELLA10</button> ou <button onClick={() => setCouponInput('FRETE20')} className="text-primary hover:underline">FRETE20</button>
                </p>
              )}

              {/* Pricing */}
              <div className="space-y-2 text-sm border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} itens)</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Desconto ({coupon?.code})</span>
                    <span>– {formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-success font-medium">Calcular no checkout</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Delivery badge */}
              <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium text-success">{brand.delivery.promiseShort}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button asChild variant="hero" size="lg" className="w-full">
                  <Link to="/checkout">
                    Finalizar compra
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/loja">Continuar comprando</Link>
                </Button>
              </div>

              {/* WhatsApp help */}
              <div className="pt-2 border-t text-center">
                <a href={getWhatsAppUrl('Olá! Preciso de ajuda com meu carrinho')}
                  target="_blank" rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  Preciso de ajuda
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
