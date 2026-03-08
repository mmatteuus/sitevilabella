import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Package,
  Truck,
  Home,
  Clock,
  MessageCircle,
  ArrowLeft,
  MapPin,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { brand, getWhatsAppUrl } from '@/config/brand';

// ─── Mock order data ─────────────────────────────────────────────────────────
type OrderStatus = 'received' | 'preparing' | 'on_the_way' | 'delivered';

interface OrderEvent {
  status: OrderStatus;
  label: string;
  description: string;
  time?: string;
  completed: boolean;
  active: boolean;
}

function getMockOrder(id: string) {
  // Deterministically vary status based on last char of id so demo looks interesting
  const char = id.slice(-1);
  const statusMap: Record<string, OrderStatus> = {
    '0': 'delivered',
    '1': 'on_the_way',
    '2': 'preparing',
    '3': 'on_the_way',
    '4': 'delivered',
  };
  const status: OrderStatus = statusMap[char] ?? 'received';

  return {
    id,
    status,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    recipient: 'Maria Clara Oliveira',
    address: 'Rua das Flores, 42 - Centro, Araguaína - TO',
    items: [
      { name: 'Buquê Encanto de Rosas Vermelhas', qty: 1, price: 189.9 },
      { name: 'Caixa Ferrero Rocher', qty: 1, price: 59.9 },
    ],
    subtotal: 249.8,
    deliveryFee: 0,
    total: 249.8,
    paymentMethod: 'PIX',
    period: 'Tarde (12h – 18h)',
  };
}

const TIMELINE_STEPS: { status: OrderStatus; label: string; description: string; Icon: typeof CheckCircle2 }[] = [
  {
    status: 'received',
    label: 'Pedido recebido',
    description: 'Seu pedido foi confirmado e está na fila de preparo.',
    Icon: CheckCircle2,
  },
  {
    status: 'preparing',
    label: 'Em preparação',
    description: 'Nossa equipe está preparando o arranjo com muito carinho.',
    Icon: Package,
  },
  {
    status: 'on_the_way',
    label: 'Saiu para entrega',
    description: 'O entregador está a caminho do endereço informado.',
    Icon: Truck,
  },
  {
    status: 'delivered',
    label: 'Entregue',
    description: 'Presente entregue com sucesso. Que seja especial! 🌸',
    Icon: Home,
  },
];

const STATUS_ORDER: OrderStatus[] = ['received', 'preparing', 'on_the_way', 'delivered'];

const STATUS_BADGE: Record<OrderStatus, { label: string; className: string }> = {
  received: { label: 'Confirmado', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  preparing: { label: 'Em preparação', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  on_the_way: { label: 'A caminho', className: 'bg-primary/10 text-primary border-primary/20' },
  delivered: { label: 'Entregue ✓', className: 'bg-success/10 text-success border-success/20' },
};

export default function OrderTrackingPage() {
  const { id } = useParams<{ id: string }>();
  const orderId = id || 'VB00000001';
  const order = getMockOrder(orderId);

  const currentStatusIndex = STATUS_ORDER.indexOf(order.status);
  const badge = STATUS_BADGE[order.status];

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p);

  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const whatsappMsg = `Olá! Gostaria de informações sobre o pedido *${orderId}*.`;

  return (
    <main className="py-8">
      <div className="container max-w-3xl">
        {/* Back */}
        <Link
          to="/minha-conta/pedidos"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Meus pedidos
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">
              Pedido #{orderId}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Realizado em {formatDateTime(order.createdAt)}
            </p>
          </div>
          <Badge className={`${badge.className} border text-sm px-3 py-1.5 self-start sm:self-auto`}>
            {badge.label}
          </Badge>
        </div>

        <div className="space-y-6">
          {/* ── Timeline Card ─────────────────────────────────── */}
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Acompanhe seu pedido</h2>
              {order.status !== 'delivered' && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Previsão: {formatDateTime(order.estimatedDelivery)}</span>
                </div>
              )}
            </div>

            <div className="relative">
              {TIMELINE_STEPS.map((step, idx) => {
                const isCompleted = idx < currentStatusIndex;
                const isActive = idx === currentStatusIndex;
                const isPending = idx > currentStatusIndex;
                const isLast = idx === TIMELINE_STEPS.length - 1;

                return (
                  <div key={step.status} className="flex gap-4">
                    {/* Icon + vertical line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors z-10 ${
                          isCompleted
                            ? 'bg-success text-white'
                            : isActive
                            ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <step.Icon className="h-5 w-5" />
                      </div>
                      {!isLast && (
                        <div
                          className={`w-0.5 flex-1 my-1 min-h-[2rem] transition-colors ${
                            isCompleted ? 'bg-success' : 'bg-muted'
                          }`}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`pb-6 flex-1 ${isLast ? 'pb-0' : ''}`}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className={`font-semibold text-sm ${
                            isPending ? 'text-muted-foreground' : 'text-foreground'
                          }`}
                        >
                          {step.label}
                        </span>
                        {isActive && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Agora
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-xs text-success">✓ Concluído</span>
                        )}
                      </div>
                      <p
                        className={`text-sm ${
                          isPending ? 'text-muted-foreground/60' : 'text-muted-foreground'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── WhatsApp Notifications ─────────────────────────── */}
          <div className="rounded-xl border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold mb-1">Receba notificações pelo WhatsApp</h3>
              <p className="text-sm text-muted-foreground">
                Fique por dentro de cada atualização do seu pedido em tempo real.
              </p>
            </div>
            <a
              href={getWhatsAppUrl(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Button variant="outline" className="gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10">
                <MessageCircle className="h-4 w-4" />
                Ativar via WhatsApp
              </Button>
            </a>
          </div>

          {/* ── Delivery info ──────────────────────────────────── */}
          <div className="rounded-xl border bg-card p-6 space-y-3">
            <h2 className="font-semibold text-lg">Informações de entrega</h2>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Destinatário: {order.recipient}</p>
                <p className="text-muted-foreground">{order.address}</p>
                <p className="text-muted-foreground mt-1">Período: {order.period}</p>
              </div>
            </div>
          </div>

          {/* ── Order items ───────────────────────────────────── */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="font-semibold text-lg mb-4">Itens do pedido</h2>
            <div className="space-y-3 text-sm">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span>{item.qty}× {item.name}</span>
                  <span className="font-medium">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
              <div className="border-t pt-3 space-y-1.5">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Frete</span>
                  <span className={order.deliveryFee === 0 ? 'text-success' : ''}>
                    {order.deliveryFee === 0 ? 'Grátis' : formatPrice(order.deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1 border-t">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(order.total)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground pt-1">
                  <span>Pagamento</span>
                  <span>{order.paymentMethod}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Support ───────────────────────────────────────── */}
          <div className="rounded-xl border border-dashed bg-accent/20 p-6 text-center space-y-3">
            <Phone className="h-6 w-6 mx-auto text-primary" />
            <p className="font-medium">Precisa de ajuda com este pedido?</p>
            <p className="text-sm text-muted-foreground">{brand.contact.whatsapp.numberDisplay}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={getWhatsAppUrl(whatsappMsg)} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" className="gap-2 w-full sm:w-auto">
                  <MessageCircle className="h-4 w-4" />
                  Falar com atendimento
                </Button>
              </a>
              <Button asChild variant="outline">
                <Link to="/">Continuar comprando</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
