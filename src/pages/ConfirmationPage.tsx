import { Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, Home, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ConfirmationPage() {
  const orderNumber = `VB${Date.now().toString().slice(-8)}`;

  return (
    <main className="py-16">
      <div className="container max-w-2xl mx-auto text-center">
        <div className="mb-8 animate-scale-in">
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
          Pedido confirmado!
        </h1>
        
        <p className="text-lg text-muted-foreground mb-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
          Obrigado por comprar na Villa Bella Floricultura
        </p>
        
        <p className="text-muted-foreground animate-slide-up" style={{ animationDelay: '150ms' }}>
          Número do pedido: <span className="font-semibold text-foreground">{orderNumber}</span>
        </p>

        {/* Order tracking */}
        <div className="my-12 p-6 rounded-xl bg-card border animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h2 className="font-semibold text-lg mb-6">Status do pedido</h2>
          
          <div className="flex items-center justify-between max-w-sm mx-auto">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-success text-primary-foreground flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">Confirmado</span>
            </div>
            
            <div className="flex-1 h-0.5 bg-muted mx-2" />
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                <Package className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground">Preparando</span>
            </div>
            
            <div className="flex-1 h-0.5 bg-muted mx-2" />
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                <Truck className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground">A caminho</span>
            </div>
            
            <div className="flex-1 h-0.5 bg-muted mx-2" />
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                <Home className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground">Entregue</span>
            </div>
          </div>
        </div>

        {/* What's next */}
        <div className="space-y-4 mb-12 text-left p-6 rounded-xl bg-accent/30 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <h3 className="font-semibold">Próximos passos:</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
              <span>Você receberá um email com os detalhes do pedido</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
              <span>Nossa equipe já está preparando seu pedido com carinho</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
              <span>Enviaremos uma notificação quando sair para entrega</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Button asChild variant="hero" size="lg">
            <Link to="/">
              Continuar comprando
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/minha-conta/pedidos">Ver meus pedidos</Link>
          </Button>
        </div>

        {/* WhatsApp support */}
        <div className="mt-12 pt-8 border-t animate-fade-in" style={{ animationDelay: '500ms' }}>
          <p className="text-sm text-muted-foreground mb-3">
            Dúvidas sobre seu pedido?
          </p>
          <a
            href="https://wa.me/5563992379935?text=Olá! Gostaria de informações sobre meu pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <MessageCircle className="h-4 w-4" />
            Fale conosco pelo WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
