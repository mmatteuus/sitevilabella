import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ChevronDown,
  Search,
  Filter,
  Eye,
  Edit2,
  BarChart3,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// ─── Types ────────────────────────────────────────────────────────────────────
type OrderStatus = 'received' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';

interface AdminOrder {
  id: string;
  date: string;
  customer: string;
  email: string;
  phone: string;
  items: string;
  total: number;
  status: OrderStatus;
  address: string;
  period: string;
  payment: string;
}

interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  since: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_ORDERS: AdminOrder[] = [
  {
    id: 'VB12540',
    date: '2026-03-08T07:30:00',
    customer: 'Ana Clara Vila',
    email: 'ana.clara@email.com',
    phone: '(63) 99999-0000',
    items: 'Buquê Encanto de Rosas Vermelhas × 1, Caixa Ferrero Rocher × 1',
    total: 249.80,
    status: 'on_the_way',
    address: 'Av. Tocantins, 1200, Ap 803 – Centro, Araguaína – TO',
    period: 'Tarde (12h–18h)',
    payment: 'PIX',
  },
  {
    id: 'VB12562',
    date: '2026-03-08T08:15:00',
    customer: 'Carlos Eduardo Sousa',
    email: 'carlos@email.com',
    phone: '(63) 98888-1111',
    items: 'Flower Box Elegance × 1',
    total: 249.90,
    status: 'preparing',
    address: 'Rua Floriano Peixoto, 450, Sala 302 – Jardim Paulista, Araguaína – TO',
    period: 'Noite (18h–22h)',
    payment: 'Cartão de Crédito',
  },
  {
    id: 'VB12570',
    date: '2026-03-08T09:00:00',
    customer: 'Beatriz Almeida',
    email: 'beatriz@email.com',
    phone: '(63) 97777-2222',
    items: 'Ramalhete Primavera × 2',
    total: 179.80,
    status: 'received',
    address: 'Rua das Flores, 88 – Setor Central, Araguaína – TO',
    period: 'Manhã (8h–12h)',
    payment: 'PIX',
  },
  {
    id: 'VB12585',
    date: '2026-03-07T14:20:00',
    customer: 'Marcos Vinícius',
    email: 'marcos@email.com',
    phone: '(63) 96666-3333',
    items: 'Rosa Única Premium × 3, Nutella 350g × 1',
    total: 184.60,
    status: 'delivered',
    address: 'Av. Cônego João Lima, 300 – St. Sul, Araguaína – TO',
    period: 'Tarde (12h–18h)',
    payment: 'PIX',
  },
  {
    id: 'VB12600',
    date: '2026-03-07T10:05:00',
    customer: 'Larissa Fonseca',
    email: 'larissa@email.com',
    phone: '(63) 95555-4444',
    items: 'Cesta Café da Manhã × 1',
    total: 199.90,
    status: 'delivered',
    address: 'Rua Goiás, 77 – Bairro Novo, Araguaína – TO',
    period: 'Manhã (8h–12h)',
    payment: 'Cartão de Débito',
  },
  {
    id: 'VB12615',
    date: '2026-03-06T16:45:00',
    customer: 'Fernanda Costa',
    email: 'fernanda@email.com',
    phone: '(63) 94444-5555',
    items: 'Cesta Romântica × 1',
    total: 249.90,
    status: 'cancelled',
    address: 'Rua Palmas, 150 – Centro, Araguaína – TO',
    period: 'Noite (18h–22h)',
    payment: 'PIX',
  },
];

const MOCK_CUSTOMERS: AdminCustomer[] = [
  {
    id: 'c1',
    name: 'Ana Clara Vila',
    email: 'ana.clara@email.com',
    phone: '(63) 99999-0000',
    orders: 8,
    totalSpent: 1432.50,
    lastOrder: '2026-03-08',
    since: '2024-06-12',
  },
  {
    id: 'c2',
    name: 'Beatriz Almeida',
    email: 'beatriz@email.com',
    phone: '(63) 97777-2222',
    orders: 5,
    totalSpent: 879.40,
    lastOrder: '2026-03-08',
    since: '2024-09-03',
  },
  {
    id: 'c3',
    name: 'Carlos Eduardo Sousa',
    email: 'carlos@email.com',
    phone: '(63) 98888-1111',
    orders: 3,
    totalSpent: 598.70,
    lastOrder: '2026-03-08',
    since: '2025-01-18',
  },
  {
    id: 'c4',
    name: 'Marcos Vinícius',
    email: 'marcos@email.com',
    phone: '(63) 96666-3333',
    orders: 12,
    totalSpent: 2105.80,
    lastOrder: '2026-03-07',
    since: '2023-11-25',
  },
  {
    id: 'c5',
    name: 'Larissa Fonseca',
    email: 'larissa@email.com',
    phone: '(63) 95555-4444',
    orders: 4,
    totalSpent: 720.60,
    lastOrder: '2026-03-07',
    since: '2025-02-09',
  },
];

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string }> = {
  received: { label: 'Recebido', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  preparing: { label: 'Preparando', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  on_the_way: { label: 'A caminho', className: 'bg-primary/10 text-primary border-primary/20' },
  delivered: { label: 'Entregue', className: 'bg-success/10 text-success border-success/20' },
  cancelled: { label: 'Cancelado', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

const STATUS_NEXT: Record<OrderStatus, OrderStatus | null> = {
  received: 'preparing',
  preparing: 'on_the_way',
  on_the_way: 'delivered',
  delivered: null,
  cancelled: null,
};

const STATUS_NEXT_LABEL: Record<OrderStatus, string> = {
  received: 'Iniciar preparo',
  preparing: 'Saiu para entrega',
  on_the_way: 'Confirmar entrega',
  delivered: '',
  cancelled: '',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const fmtDateShort = (iso: string) =>
  new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  trend,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  trend?: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">{label}</span>
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4.5 w-4.5 text-primary" />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-xs text-success font-medium">
          <ArrowUpRight className="h-3.5 w-3.5" />
          {trend}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<AdminOrder[]>(MOCK_ORDERS);
  const [orderSearch, setOrderSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const filteredOrders = orders.filter(o => {
    const matchSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.email.toLowerCase().includes(orderSearch.toLowerCase());
    const matchFilter = orderFilter === 'all' || o.status === orderFilter;
    return matchSearch && matchFilter;
  });

  const advanceStatus = (orderId: string) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id !== orderId) return o;
        const next = STATUS_NEXT[o.status];
        if (!next) return o;
        return { ...o, status: next };
      })
    );
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const next = STATUS_NEXT[order.status];
      if (next) {
        toast({
          title: 'Status atualizado',
          description: `Pedido #${orderId} → ${STATUS_CONFIG[next].label}`,
        });
      }
    }
  };

  // Dashboard stats
  const todayOrders = orders.filter(
    o => new Date(o.date).toDateString() === new Date().toDateString()
  );
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((s, o) => s + o.total, 0);
  const pending = orders.filter(o => ['received', 'preparing', 'on_the_way'].includes(o.status)).length;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top bar */}
      <header className="bg-card border-b px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <ShieldCheck className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <span className="font-display font-bold text-lg leading-none">Painel Admin</span>
            <p className="text-xs text-muted-foreground">Villa Bella Floricultura</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">← Ver loja</Link>
          </Button>
        </div>
      </header>

      <main className="container max-w-7xl py-8">
        <Tabs defaultValue="dashboard">
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Pedidos
              {pending > 0 && (
                <span className="ml-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {pending}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="customers" className="gap-2">
              <Users className="h-4 w-4" />
              Clientes
            </TabsTrigger>
          </TabsList>

          {/* ── Dashboard tab ── */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={ShoppingBag}
                label="Pedidos hoje"
                value={String(todayOrders.length)}
                sub={`${orders.length} no total`}
                trend="+12% vs ontem"
              />
              <StatCard
                icon={TrendingUp}
                label="Receita total"
                value={fmt(totalRevenue)}
                sub="Sem cancelados"
                trend="+8% este mês"
              />
              <StatCard
                icon={Clock}
                label="Pendentes"
                value={String(pending)}
                sub="Aguardando ação"
              />
              <StatCard
                icon={Users}
                label="Clientes"
                value={String(MOCK_CUSTOMERS.length)}
                sub="Ativos"
                trend="+3 este mês"
              />
            </div>

            {/* Recent orders mini table */}
            <div className="rounded-xl border bg-card">
              <div className="flex items-center justify-between p-5 border-b">
                <h2 className="font-semibold flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  Pedidos recentes
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary text-xs"
                  onClick={() => {
                    const tab = document.querySelector<HTMLButtonElement>('[data-state][value="orders"]');
                    tab?.click();
                  }}
                >
                  Ver todos →
                </Button>
              </div>
              <div className="p-5 space-y-3">
                {orders.slice(0, 4).map(o => {
                  const cfg = STATUS_CONFIG[o.status];
                  return (
                    <div key={o.id} className="flex items-center justify-between gap-3 text-sm">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Package className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate">#{o.id} — {o.customer}</p>
                          <p className="text-muted-foreground text-xs truncate">{fmtDate(o.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-semibold">{fmt(o.total)}</span>
                        <Badge className={`${cfg.className} border text-xs`}>{cfg.label}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* ── Orders tab ── */}
          <TabsContent value="orders" className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por pedido, cliente ou e-mail…"
                  className="pl-9"
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                />
              </div>
              <Select value={orderFilter} onValueChange={setOrderFilter}>
                <SelectTrigger className="w-44 gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="received">Recebido</SelectItem>
                  <SelectItem value="preparing">Preparando</SelectItem>
                  <SelectItem value="on_the_way">A caminho</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Orders table */}
            <div className="rounded-xl border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="hidden md:table-cell">Data</TableHead>
                    <TableHead className="hidden lg:table-cell">Itens</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                        Nenhum pedido encontrado
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredOrders.map(order => {
                    const cfg = STATUS_CONFIG[order.status];
                    const next = STATUS_NEXT[order.status];
                    return (
                      <TableRow key={order.id} className="group">
                        <TableCell className="font-mono font-semibold text-primary">
                          #{order.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                          {fmtDate(order.date)}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground max-w-[200px]">
                          <span className="truncate block">{order.items}</span>
                        </TableCell>
                        <TableCell className="font-semibold">{fmt(order.total)}</TableCell>
                        <TableCell>
                          <Badge className={`${cfg.className} border text-xs whitespace-nowrap`}>
                            {cfg.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => setSelectedOrder(order)}
                              title="Ver detalhes"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                            {next && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs gap-1 hidden group-hover:flex"
                                onClick={() => advanceStatus(order.id)}
                              >
                                <Edit2 className="h-3 w-3" />
                                {STATUS_NEXT_LABEL[order.status]}
                              </Button>
                            )}
                            <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0" title="Rastrear">
                              <Link to={`/pedido/${order.id}`}>
                                <Truck className="h-3.5 w-3.5" />
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Order detail panel */}
            {selectedOrder && (
              <div className="rounded-xl border bg-card p-6 space-y-4 animate-fade-in">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Detalhes do pedido #{selectedOrder.id}</h3>
                    <p className="text-sm text-muted-foreground">{fmtDate(selectedOrder.date)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {STATUS_NEXT[selectedOrder.status] && (
                      <Button
                        size="sm"
                        onClick={() => {
                          advanceStatus(selectedOrder.id);
                          const next = STATUS_NEXT[selectedOrder.status];
                          if (next) setSelectedOrder({ ...selectedOrder, status: next });
                        }}
                        className="gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {STATUS_NEXT_LABEL[selectedOrder.status]}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedOrder(null)}
                    >
                      ✕
                    </Button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-1">Cliente</p>
                    <p className="font-medium">{selectedOrder.customer}</p>
                    <p className="text-muted-foreground">{selectedOrder.email}</p>
                    <p className="text-muted-foreground">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-1">Entrega</p>
                    <p className="font-medium">{selectedOrder.address}</p>
                    <p className="text-muted-foreground">Período: {selectedOrder.period}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-1">Pagamento</p>
                    <p className="font-medium">{selectedOrder.payment}</p>
                    <p className="text-xl font-bold text-primary mt-1">{fmt(selectedOrder.total)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2">Itens</p>
                  <p className="text-sm bg-muted/50 rounded-lg px-4 py-3">{selectedOrder.items}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Badge className={`${STATUS_CONFIG[selectedOrder.status].className} border`}>
                    {STATUS_CONFIG[selectedOrder.status].label}
                  </Badge>
                  <Button asChild variant="outline" size="sm" className="gap-2 ml-auto">
                    <Link to={`/pedido/${selectedOrder.id}`}>
                      <Eye className="h-4 w-4" />
                      Ver página de rastreamento
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* ── Customers tab ── */}
          <TabsContent value="customers" className="space-y-4">
            <div className="rounded-xl border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="hidden sm:table-cell">Telefone</TableHead>
                    <TableHead>Pedidos</TableHead>
                    <TableHead>Total gasto</TableHead>
                    <TableHead className="hidden md:table-cell">Último pedido</TableHead>
                    <TableHead className="hidden lg:table-cell">Cliente desde</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_CUSTOMERS.map(c => (
                    <TableRow key={c.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-semibold text-primary text-sm">
                            {c.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{c.name}</p>
                            <p className="text-xs text-muted-foreground">{c.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {c.phone}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1.5 text-sm">
                          <ShoppingBag className="h-3.5 w-3.5 text-muted-foreground" />
                          {c.orders}
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold text-primary">
                        {fmt(c.totalSpent)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                        {fmtDateShort(c.lastOrder)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                        {fmtDateShort(c.since)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
