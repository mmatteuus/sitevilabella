import { Link } from 'react-router-dom';
import { Package, ChevronRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const statusLabels = {
  pending: { label: 'Pendente', color: 'bg-muted' },
  confirmed: { label: 'Confirmado', color: 'bg-primary' },
  preparing: { label: 'Preparando', color: 'bg-gold' },
  delivering: { label: 'A caminho', color: 'bg-success' },
  delivered: { label: 'Entregue', color: 'bg-success' },
};

export default function OrdersPage() {
  const { orders } = useAuth();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="font-display text-xl font-bold mb-6">Meus Pedidos</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            Você ainda não fez nenhum pedido
          </p>
          <Button asChild>
            <Link to="/loja">Começar a comprar</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusLabels[order.status];
            return (
              <div key={order.id} className="p-4 rounded-lg border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Pedido {order.id}</span>
                      <Badge className={`${status.color} text-primary-foreground`}>
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{formatPrice(order.total)}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.items.length} ite{order.items.length > 1 ? 'ns' : 'm'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="text-sm text-muted-foreground">
                      {item.productName}
                      {idx < Math.min(order.items.length - 1, 2) && ','}
                    </span>
                  ))}
                  {order.items.length > 3 && (
                    <span className="text-sm text-muted-foreground">
                      +{order.items.length - 3} mais
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Entrega: {formatDate(order.deliveryDate)}
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver detalhes
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
