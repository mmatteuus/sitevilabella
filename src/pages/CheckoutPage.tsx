import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ChevronRight, MapPin, MessageCircle, CreditCard, Truck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
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

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { isAuthenticated, addOrder, addAddress, addresses } = useAuth();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState<Step>('delivery');
  const [isLoading, setIsLoading] = useState(false);

  // Delivery state
  const [deliveryData, setDeliveryData] = useState({
    recipientName: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: brand.address.city,
    state: brand.address.state,
    zipCode: '',
    date: '',
    period: '',
    isSurprise: false,
    observations: '',
  });

  // Message state
  const [messageData, setMessageData] = useState({
    cardMessage: '',
    cardSignature: '',
    isAnonymous: false,
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const selectedPeriod = deliveryPeriods.find(p => p.id === deliveryData.period);
  const deliveryFee = selectedPeriod?.extra || 0;
  const total = subtotal + deliveryFee;

  const steps = [
    { id: 'delivery', label: 'Entrega', icon: MapPin },
    { id: 'message', label: 'Mensagem', icon: MessageCircle },
    { id: 'payment', label: 'Pagamento', icon: CreditCard },
  ];

  const goToStep = (step: Step) => {
    setCurrentStep(step);
  };

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryData.recipientName || !deliveryData.street || !deliveryData.number || 
        !deliveryData.neighborhood || !deliveryData.zipCode || !deliveryData.date || !deliveryData.period) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
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

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order
    const order = {
      date: new Date().toISOString(),
      status: 'confirmed' as const,
      items: items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total,
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
    navigate('/confirmacao');
  };

  // Get minimum date (today or tomorrow based on time)
  const getMinDate = () => {
    const now = new Date();
    const minDate = new Date(now);
    if (now.getHours() >= 15) {
      minDate.setDate(minDate.getDate() + 1);
    }
    return minDate.toISOString().split('T')[0];
  };

  if (items.length === 0) {
    return (
      <main className="py-16">
        <div className="container max-w-2xl mx-auto text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Carrinho vazio</h1>
          <p className="text-muted-foreground mb-8">
            Adicione produtos para fazer checkout
          </p>
          <Button asChild>
            <Link to="/loja">Ver produtos</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="py-8">
      <div className="container max-w-5xl">
        {/* Back link */}
        <Link
          to="/carrinho"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
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
                  if (targetIndex <= currentIndex) {
                    goToStep(step.id as Step);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  currentStep === step.id
                    ? 'bg-primary text-primary-foreground'
                    : steps.findIndex(s => s.id === currentStep) > index
                    ? 'bg-success/20 text-success'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {steps.findIndex(s => s.id === currentStep) > index ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <step.icon className="h-4 w-4" />
                )}
                <span className="hidden sm:inline text-sm font-medium">{step.label}</span>
              </button>
              {index < steps.length - 1 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form area */}
          <div className="lg:col-span-2">
            {/* Step 1: Delivery */}
            {currentStep === 'delivery' && (
              <form onSubmit={handleDeliverySubmit} className="space-y-6">
                <div className="rounded-xl border bg-card p-6">
                  <h2 className="font-display text-xl font-bold mb-6">Endereço de entrega</h2>
                  
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="recipientName">Nome do destinatário *</Label>
                      <Input
                        id="recipientName"
                        value={deliveryData.recipientName}
                        onChange={(e) => setDeliveryData({ ...deliveryData, recipientName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 sm:col-span-1">
                        <Label htmlFor="zipCode">CEP *</Label>
                        <Input
                          id="zipCode"
                          value={deliveryData.zipCode}
                          onChange={(e) => setDeliveryData({ ...deliveryData, zipCode: e.target.value })}
                          placeholder="77000-000"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="street">Rua *</Label>
                        <Input
                          id="street"
                          value={deliveryData.street}
                          onChange={(e) => setDeliveryData({ ...deliveryData, street: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="number">Número *</Label>
                        <Input
                          id="number"
                          value={deliveryData.number}
                          onChange={(e) => setDeliveryData({ ...deliveryData, number: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          value={deliveryData.complement}
                          onChange={(e) => setDeliveryData({ ...deliveryData, complement: e.target.value })}
                          placeholder="Apto, bloco, etc."
                        />
                      </div>
                      <div>
                        <Label htmlFor="neighborhood">Bairro *</Label>
                        <Input
                          id="neighborhood"
                          value={deliveryData.neighborhood}
                          onChange={(e) => setDeliveryData({ ...deliveryData, neighborhood: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Cidade</Label>
                        <Input id="city" value={brand.address.city} disabled />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado</Label>
                        <Input id="state" value="TO" disabled />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border bg-card p-6">
                  <h2 className="font-display text-xl font-bold mb-6">Data e horário</h2>

                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="date">Data da entrega *</Label>
                      <Input
                        id="date"
                        type="date"
                        min={getMinDate()}
                        value={deliveryData.date}
                        onChange={(e) => setDeliveryData({ ...deliveryData, date: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label className="mb-3 block">Período de entrega *</Label>
                      <RadioGroup
                        value={deliveryData.period}
                        onValueChange={(value) => setDeliveryData({ ...deliveryData, period: value })}
                        className="grid grid-cols-2 gap-3"
                      >
                        {deliveryPeriods.map((period) => (
                          <div
                            key={period.id}
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

                    <div className="flex items-center space-x-2 pt-4">
                      <Checkbox
                        id="surprise"
                        checked={deliveryData.isSurprise}
                        onCheckedChange={(checked) => 
                          setDeliveryData({ ...deliveryData, isSurprise: checked as boolean })
                        }
                      />
                      <Label htmlFor="surprise" className="cursor-pointer">
                        É uma surpresa! (Não mencionar o remetente)
                      </Label>
                    </div>

                    <div>
                      <Label htmlFor="observations">Observações</Label>
                      <Textarea
                        id="observations"
                        value={deliveryData.observations}
                        onChange={(e) => setDeliveryData({ ...deliveryData, observations: e.target.value })}
                        placeholder="Instruções especiais para entrega..."
                      />
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
                      <Textarea
                        id="cardMessage"
                        value={messageData.cardMessage}
                        onChange={(e) => setMessageData({ ...messageData, cardMessage: e.target.value })}
                        placeholder="Escreva aqui sua mensagem especial..."
                        rows={5}
                        maxLength={300}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {messageData.cardMessage.length}/300 caracteres
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="anonymous"
                        checked={messageData.isAnonymous}
                        onCheckedChange={(checked) =>
                          setMessageData({ ...messageData, isAnonymous: checked as boolean })
                        }
                      />
                      <Label htmlFor="anonymous" className="cursor-pointer">
                        Enviar de forma anônima
                      </Label>
                    </div>

                    {!messageData.isAnonymous && (
                      <div>
                        <Label htmlFor="signature">Assinatura</Label>
                        <Input
                          id="signature"
                          value={messageData.cardSignature}
                          onChange={(e) => setMessageData({ ...messageData, cardSignature: e.target.value })}
                          placeholder="Como você quer assinar?"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setCurrentStep('delivery')}
                  >
                    Voltar
                  </Button>
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

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value as 'pix' | 'card')}
                    className="space-y-3"
                  >
                    <div
                      className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                        paymentMethod === 'pix' ? 'border-primary bg-accent' : 'hover:bg-accent/50'
                      }`}
                    >
                      <RadioGroupItem value="pix" id="pix" />
                      <Label htmlFor="pix" className="cursor-pointer flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                            <span className="text-success font-bold text-sm">PIX</span>
                          </div>
                          <div>
                            <span className="font-medium">PIX</span>
                            <span className="block text-sm text-muted-foreground">
                              Pagamento instantâneo
                            </span>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div
                      className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                        paymentMethod === 'card' ? 'border-primary bg-accent' : 'hover:bg-accent/50'
                      }`}
                    >
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="cursor-pointer flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-medium">Cartão de crédito</span>
                            <span className="block text-sm text-muted-foreground">
                              Em até 3x sem juros
                            </span>
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
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setCurrentStep('message')}
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processando...' : 'Finalizar pedido'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6">
              <h2 className="font-display text-lg font-bold mb-4">Resumo do pedido</h2>

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span className={deliveryFee === 0 ? 'text-success' : ''}>
                    {deliveryFee === 0 ? 'Grátis' : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Delivery info */}
              {selectedPeriod && (
                <div className="mt-4 p-3 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-success">
                      Entrega: {selectedPeriod.label} ({selectedPeriod.time})
                    </span>
                  </div>
                </div>
              )}

              {/* WhatsApp help */}
              <div className="mt-4 pt-4 border-t text-center">
                <a
                  href={getWhatsAppUrl('Olá! Preciso de ajuda com meu pedido')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                >
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
