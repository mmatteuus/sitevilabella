import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ChevronRight, MapPin, MessageCircle, CreditCard, Truck, ArrowLeft, Tag, X, Loader2, BookMarked, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { brand, getWhatsAppUrl } from '@/config/brand';

type Step = 'delivery' | 'message' | 'payment';

const deliveryPeriods = [
  { id: 'morning', label: 'Manhã', time: '8h - 12h', available: true },
  { id: 'afternoon', label: 'Tarde', time: '12h - 18h', available: true },
  { id: 'evening', label: 'Noite', time: '18h - 21h', available: true },
  { id: 'express', label: 'Expressa', time: brand.delivery.expressEta, available: true, extra: 15 },
];

// Shipping rules: base 0 for local city, R$15 express, small fee for other neighborhoods
function calcShipping(zipCode: string, period: string): number {
  if (!zipCode || !period) return 0;
  if (period === 'express') return 15;
  // Simple rule: Araguaína TO is 77000-000 range
  const cleaned = zipCode.replace(/\D/g, '');
  if (cleaned.startsWith('778')) return 0; // local = free
  if (cleaned.startsWith('77')) return 8;  // nearby
  return 18; // outside
}

interface ViaCepResult {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, discount, total, coupon, applyCoupon, removeCoupon, clearCart } = useCart();
  const { addOrder, addresses } = useAuth();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState<Step>('delivery');
  const [isLoading, setIsLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [selectedSavedAddressId, setSelectedSavedAddressId] = useState<string | null>(
    addresses.find(a => a.isDefault)?.id ?? addresses[0]?.id ?? null
  );
  const [useNewAddress, setUseNewAddress] = useState(addresses.length === 0);

  // Coupon state (checkout also allows applying)
  const [couponInput, setCouponInput] = useState('');

  // Delivery state
  const [deliveryData, setDeliveryData] = useState(() => {
    const def = addresses.find(a => a.isDefault) ?? addresses[0];
    return {
      recipientName: '',
      street: def?.street ?? '',
      number: def?.number ?? '',
      complement: def?.complement ?? '',
      neighborhood: def?.neighborhood ?? '',
      city: def?.city ?? brand.address.city,
      state: def?.state ?? brand.address.state,
      zipCode: def?.zipCode ?? '',
      date: '',
      period: '',
      isSurprise: false,
      observations: '',
    };
  });

  // Message state
  const [messageData, setMessageData] = useState({
    cardMessage: '',
    cardSignature: '',
    isAnonymous: false,
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

  const selectedPeriod = deliveryPeriods.find(p => p.id === deliveryData.period);
  const shippingFee = calcShipping(deliveryData.zipCode, deliveryData.period);
  const grandTotal = total + shippingFee;

  const steps = [
    { id: 'delivery', label: 'Entrega', icon: MapPin },
    { id: 'message', label: 'Mensagem', icon: MessageCircle },
    { id: 'payment', label: 'Pagamento', icon: CreditCard },
  ];

  // ── CEP auto-fill via ViaCEP ──────────────────────────────────────────────
  const handleCepLookup = useCallback(async (cep: string) => {
    const cleaned = cep.replace(/\D/g, '');
    if (cleaned.length !== 8) return;
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
      const data: ViaCepResult = await res.json();
      if (data.erro) {
        toast({ title: 'CEP não encontrado', variant: 'destructive' });
        return;
      }
      setDeliveryData(prev => ({
        ...prev,
        street: data.logradouro || prev.street,
        neighborhood: data.bairro || prev.neighborhood,
        city: data.localidade || prev.city,
        state: data.uf || prev.state,
      }));
    } catch {
      toast({ title: 'Erro ao buscar CEP. Verifique sua conexão.', variant: 'destructive' });
    } finally {
      setCepLoading(false);
    }
  }, [toast]);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const cleaned = raw.replace(/\D/g, '').slice(0, 8);
    const formatted = cleaned.length > 5
      ? `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`
      : cleaned;
    setDeliveryData(prev => ({ ...prev, zipCode: formatted }));
    if (cleaned.length === 8) handleCepLookup(cleaned);
  };

  // ── Coupon in checkout ────────────────────────────────────────────────────
  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput);
    toast({
      title: result.success ? '🎉 Cupom aplicado!' : 'Cupom inválido',
      description: result.message,
      variant: result.success ? 'default' : 'destructive',
    });
    if (result.success) setCouponInput('');
  };

  // ── Step handlers ─────────────────────────────────────────────────────────
  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryData.recipientName || !deliveryData.street || !deliveryData.number ||
        !deliveryData.neighborhood || !deliveryData.zipCode || !deliveryData.date || !deliveryData.period) {
      toast({ title: 'Campos obrigatórios', description: 'Preencha todos os campos obrigatórios.', variant: 'destructive' });
      return;
    }
    setCurrentStep('message');
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const orderId = `VB${Date.now().toString().slice(-8)}`;
    const order = {
      id: orderId,
      date: new Date().toISOString(),
      status: 'confirmed' as const,
      items: items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: grandTotal,
      deliveryAddress: {
        id: Date.now().toString(),
        name: deliveryData.recipientName,
        street: deliveryData.street,
        number: deliveryData.number,
        complement: deliveryData.complement,
        neighborhood: deliveryData.neighborhood,
        city: deliveryData.city,
        state: deliveryData.state,
        zipCode: deliveryData.zipCode,
        isDefault: false,
      },
      deliveryDate: deliveryData.date,
      deliveryPeriod: deliveryData.period,
    };

    addOrder(order);
    clearCart();
    setIsLoading(false);
    navigate(`/pedido/${orderId}`);
  };

  const getMinDate = () => {
    const now = new Date();
    const minDate = new Date(now);
    if (now.getHours() >= 15) minDate.setDate(minDate.getDate() + 1);
    return minDate.toISOString().split('T')[0];
  };

  if (items.length === 0) {
    return (
      <main className="py-16">
        <div className="container max-w-2xl mx-auto text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Carrinho vazio</h1>
          <p className="text-muted-foreground mb-8">Adicione produtos para fazer checkout</p>
          <Button asChild><Link to="/loja">Ver produtos</Link></Button>
        </div>
      </main>
    );
  }

  return (
    <main className="py-8">
      <div className="container max-w-5xl">
        <Link to="/carrinho"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Voltar ao carrinho
        </Link>

        <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

        {/* Steps indicator */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => {
                  const stepOrder = ['delivery', 'message', 'payment'];
                  const currentIndex = stepOrder.indexOf(currentStep);
                  const targetIndex = stepOrder.indexOf(step.id);
                  if (targetIndex <= currentIndex) setCurrentStep(step.id as Step);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  currentStep === step.id
                    ? 'bg-primary text-primary-foreground'
                    : steps.findIndex(s => s.id === currentStep) > index
                    ? 'bg-success/20 text-success'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {steps.findIndex(s => s.id === currentStep) > index
                  ? <Check className="h-4 w-4" />
                  : <step.icon className="h-4 w-4" />}
                <span className="hidden sm:inline text-sm font-medium">{step.label}</span>
              </button>
              {index < steps.length - 1 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Form area ───────────────────────────────────────── */}
          <div className="lg:col-span-2">

            {/* Step 1: Delivery */}
            {currentStep === 'delivery' && (
              <form onSubmit={handleDeliverySubmit} className="space-y-6">
                <div className="rounded-xl border bg-card p-6">
                  <h2 className="font-display text-xl font-bold mb-6">Endereço de entrega</h2>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="recipientName">Nome do destinatário *</Label>
                      <Input id="recipientName"
                        value={deliveryData.recipientName}
                        onChange={(e) => setDeliveryData({ ...deliveryData, recipientName: e.target.value })}
                        required />
                    </div>

                    {/* CEP with auto-fill */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipCode">CEP *</Label>
                        <div className="relative">
                          <Input id="zipCode"
                            value={deliveryData.zipCode}
                            onChange={handleCepChange}
                            placeholder="77000-000"
                            maxLength={9}
                            required />
                          {cepLoading && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Preenchimento automático pelo CEP
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="street">Rua *</Label>
                        <Input id="street"
                          value={deliveryData.street}
                          onChange={(e) => setDeliveryData({ ...deliveryData, street: e.target.value })}
                          required />
                      </div>
                      <div>
                        <Label htmlFor="number">Número *</Label>
                        <Input id="number"
                          value={deliveryData.number}
                          onChange={(e) => setDeliveryData({ ...deliveryData, number: e.target.value })}
                          required />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="complement">Complemento</Label>
                        <Input id="complement"
                          value={deliveryData.complement}
                          onChange={(e) => setDeliveryData({ ...deliveryData, complement: e.target.value })}
                          placeholder="Apto, bloco, etc." />
                      </div>
                      <div>
                        <Label htmlFor="neighborhood">Bairro *</Label>
                        <Input id="neighborhood"
                          value={deliveryData.neighborhood}
                          onChange={(e) => setDeliveryData({ ...deliveryData, neighborhood: e.target.value })}
                          required />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Cidade</Label>
                        <Input id="city" value={deliveryData.city} readOnly className="bg-muted/50" />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado</Label>
                        <Input id="state" value={deliveryData.state} readOnly className="bg-muted/50" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border bg-card p-6">
                  <h2 className="font-display text-xl font-bold mb-6">Data e horário</h2>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="date">Data da entrega *</Label>
                      <Input id="date" type="date" min={getMinDate()}
                        value={deliveryData.date}
                        onChange={(e) => setDeliveryData({ ...deliveryData, date: e.target.value })}
                        required />
                    </div>

                    <div>
                      <Label className="mb-3 block">Período de entrega *</Label>
                      <RadioGroup
                        value={deliveryData.period}
                        onValueChange={(value) => setDeliveryData({ ...deliveryData, period: value })}
                        className="grid grid-cols-2 gap-3"
                      >
                        {deliveryPeriods.map((period) => (
                          <div key={period.id}
                            className={`flex items-center space-x-2 p-4 rounded-lg border transition-colors cursor-pointer ${
                              deliveryData.period === period.id ? 'border-primary bg-accent' : 'hover:bg-accent/50'
                            }`}
                          >
                            <RadioGroupItem value={period.id} id={period.id} />
                            <Label htmlFor={period.id} className="cursor-pointer flex-1">
                              <span className="font-medium">{period.label}</span>
                              <span className="block text-sm text-muted-foreground">{period.time}</span>
                              {period.extra && (
                                <span className="text-sm text-primary">+{formatPrice(period.extra)}</span>
                              )}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Shipping estimate */}
                    {deliveryData.period && deliveryData.zipCode.replace(/\D/g, '').length >= 8 && (
                      <div className={`flex items-center gap-2 p-3 rounded-lg border text-sm font-medium ${
                        shippingFee === 0 ? 'bg-success/10 border-success/20 text-success' : 'bg-accent border-border'
                      }`}>
                        <Truck className="h-4 w-4 shrink-0" />
                        {shippingFee === 0
                          ? '🎉 Frete grátis para este endereço!'
                          : `Frete estimado: ${formatPrice(shippingFee)}`}
                      </div>
                    )}

                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox id="surprise"
                        checked={deliveryData.isSurprise}
                        onCheckedChange={(checked) =>
                          setDeliveryData({ ...deliveryData, isSurprise: checked as boolean })
                        } />
                      <Label htmlFor="surprise" className="cursor-pointer">
                        É uma surpresa! (Não mencionar o remetente)
                      </Label>
                    </div>

                    <div>
                      <Label htmlFor="observations">Observações</Label>
                      <Textarea id="observations"
                        value={deliveryData.observations}
                        onChange={(e) => setDeliveryData({ ...deliveryData, observations: e.target.value })}
                        placeholder="Instruções especiais para entrega..." />
                    </div>
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Continuar para mensagem
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </form>
            )}

            {/* Step 2: Message */}
            {currentStep === 'message' && (
              <form onSubmit={handleMessageSubmit} className="space-y-6">
                <div className="rounded-xl border bg-card p-6">
                  <h2 className="font-display text-xl font-bold mb-2">Mensagem do cartão</h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    Adicione uma mensagem especial para acompanhar seu presente
                  </p>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardMessage">Sua mensagem</Label>
                      <Textarea id="cardMessage"
                        value={messageData.cardMessage}
                        onChange={(e) => setMessageData({ ...messageData, cardMessage: e.target.value })}
                        placeholder="Escreva aqui sua mensagem especial..."
                        rows={5} maxLength={300} />
                      <p className="text-xs text-muted-foreground mt-1">{messageData.cardMessage.length}/300 caracteres</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="anonymous"
                        checked={messageData.isAnonymous}
                        onCheckedChange={(checked) =>
                          setMessageData({ ...messageData, isAnonymous: checked as boolean })
                        } />
                      <Label htmlFor="anonymous" className="cursor-pointer">
                        Enviar de forma anônima
                      </Label>
                    </div>
                    {!messageData.isAnonymous && (
                      <div>
                        <Label htmlFor="signature">Assinatura</Label>
                        <Input id="signature"
                          value={messageData.cardSignature}
                          onChange={(e) => setMessageData({ ...messageData, cardSignature: e.target.value })}
                          placeholder="Como você quer assinar?" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button type="button" variant="outline" size="lg" className="flex-1"
                    onClick={() => setCurrentStep('delivery')}>Voltar</Button>
                  <Button type="submit" variant="hero" size="lg" className="flex-1">
                    Continuar para pagamento
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </form>
            )}

            {/* Step 3: Payment */}
            {currentStep === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="rounded-xl border bg-card p-6">
                  <h2 className="font-display text-xl font-bold mb-6">Forma de pagamento</h2>
                  <RadioGroup value={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value as 'pix' | 'card')}
                    className="space-y-3"
                  >
                    <div className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                      paymentMethod === 'pix' ? 'border-primary bg-accent' : 'hover:bg-accent/50'
                    }`}>
                      <RadioGroupItem value="pix" id="pix" />
                      <Label htmlFor="pix" className="cursor-pointer flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                            <span className="text-success font-bold text-sm">PIX</span>
                          </div>
                          <div>
                            <span className="font-medium">PIX</span>
                            <span className="block text-sm text-muted-foreground">Pagamento instantâneo</span>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                      paymentMethod === 'card' ? 'border-primary bg-accent' : 'hover:bg-accent/50'
                    }`}>
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="cursor-pointer flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-medium">Cartão de crédito</span>
                            <span className="block text-sm text-muted-foreground">Em até 3x sem juros</span>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                  {paymentMethod === 'card' && (
                    <div className="mt-6 p-4 rounded-lg bg-muted/50 text-center">
                      <p className="text-sm text-muted-foreground">
                        Os dados do cartão serão solicitados na próxima etapa de forma segura.
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex gap-4">
                  <Button type="button" variant="outline" size="lg" className="flex-1"
                    onClick={() => setCurrentStep('message')}>Voltar</Button>
                  <Button type="submit" variant="hero" size="lg" className="flex-1" disabled={isLoading}>
                    {isLoading ? (
                      <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Processando...</>
                    ) : 'Finalizar pedido'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* ── Order Summary ────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6 space-y-4">
              <h2 className="font-display text-lg font-bold">Resumo do pedido</h2>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img src={item.product.images[0]} alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Coupon in summary */}
              {coupon ? (
                <div className="flex items-center justify-between p-2 rounded-lg bg-success/10 border border-success/20 text-sm">
                  <span className="text-success font-medium flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5" /> {coupon.code}
                  </span>
                  <button onClick={removeCoupon} className="text-muted-foreground hover:text-destructive">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <Input value={couponInput} onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Cupom" className="text-sm uppercase" />
                  <Button type="submit" variant="outline" size="sm" disabled={!couponInput.trim()}>OK</Button>
                </form>
              )}

              <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Desconto</span>
                    <span>– {formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span className={shippingFee === 0 ? 'text-success' : ''}>
                    {!deliveryData.period ? 'Selecione o período' : shippingFee === 0 ? 'Grátis' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {selectedPeriod && (
                <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-success">
                      Entrega: {selectedPeriod.label} ({selectedPeriod.time})
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t text-center">
                <a href={getWhatsAppUrl('Olá! Preciso de ajuda com meu pedido')}
                  target="_blank" rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
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
