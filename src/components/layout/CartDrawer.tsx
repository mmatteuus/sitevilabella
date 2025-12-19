import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { getRecommendedAddOns } from '@/data/products';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    addItem,
  } = useCart();

  // Get add-ons from first item
  const addOns = items.length > 0 ? getRecommendedAddOns(items[0].product.id).slice(0, 2) : [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Seu Carrinho
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium text-muted-foreground">Seu carrinho está vazio</p>
            <p className="text-sm text-muted-foreground mt-1">Adicione produtos para continuar</p>
            <Button asChild className="mt-6" onClick={() => setIsCartOpen(false)}>
              <Link to="/loja">Ver produtos</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedVariation}`}
                    className="flex gap-4 p-3 rounded-lg bg-secondary/30"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                      {item.selectedVariation && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Variação: {item.selectedVariation}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-primary mt-1">
                        {formatPrice(item.product.price)}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add-ons suggestion */}
              {addOns.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium text-sm mb-3">Leve junto:</h4>
                  <div className="space-y-2">
                    {addOns.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 p-2 rounded-lg border hover:bg-accent/50 transition-colors"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                          <p className="text-sm text-primary font-semibold">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addItem(product)}
                        >
                          Adicionar
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Subtotal</span>
                <span className="text-lg font-bold text-primary">{formatPrice(subtotal)}</span>
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Frete calculado no checkout
              </div>
              <div className="grid gap-2">
                <Button asChild variant="hero" size="lg" onClick={() => setIsCartOpen(false)}>
                  <Link to="/checkout">Finalizar compra</Link>
                </Button>
                <Button asChild variant="outline" onClick={() => setIsCartOpen(false)}>
                  <Link to="/carrinho">Ver carrinho completo</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
