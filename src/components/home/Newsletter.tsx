import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: 'Email inválido',
        description: 'Por favor, insira um email válido.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Inscrito com sucesso!',
      description: 'Você receberá nossas ofertas exclusivas por email.',
    });
    
    setEmail('');
    setIsLoading(false);
  };

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Receba descontos exclusivos
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Cadastre-se e receba em primeira mão nossas promoções especiais, 
            novidades e dicas de como cuidar das suas flores.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-primary-foreground text-foreground border-0 h-12"
              disabled={isLoading}
            />
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="h-12 px-8 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </form>
          
          <p className="text-xs text-primary-foreground/60 mt-4">
            Ao se cadastrar, você concorda com nossa política de privacidade.
          </p>
        </div>
      </div>
    </section>
  );
}
