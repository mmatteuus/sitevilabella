import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) {
          toast({
            title: 'Bem-vindo de volta!',
            description: 'Login realizado com sucesso.',
          });
          navigate('/minha-conta');
        } else {
          toast({
            title: 'Erro no login',
            description: 'Email ou senha incorretos.',
            variant: 'destructive',
          });
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: 'Senhas não coincidem',
            description: 'Por favor, verifique as senhas digitadas.',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }

        const success = await register(formData.name, formData.email, formData.password);
        if (success) {
          toast({
            title: 'Conta criada!',
            description: 'Sua conta foi criada com sucesso.',
          });
          navigate('/minha-conta');
        } else {
          toast({
            title: 'Erro no cadastro',
            description: 'Não foi possível criar sua conta. Tente novamente.',
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro. Tente novamente.',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="container max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para home
        </Link>

        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">
            {isLogin ? 'Entrar na sua conta' : 'Criar conta'}
          </h1>
          <p className="text-muted-foreground">
            {isLogin
              ? 'Entre para acompanhar seus pedidos'
              : 'Crie sua conta para uma experiência personalizada'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required={!isLogin}
                className="mt-1"
              />
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required={!isLogin}
                minLength={6}
                className="mt-1"
              />
            </div>
          )}

          {isLogin && (
            <div className="text-right">
              <a href="#" className="text-sm text-primary hover:underline">
                Esqueceu a senha?
              </a>
            </div>
          )}

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar conta'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-primary hover:underline font-medium"
            >
              {isLogin ? 'Criar conta' : 'Entrar'}
            </button>
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-12 p-6 rounded-xl bg-accent/30">
          <h3 className="font-semibold mb-4">Benefícios de ter uma conta:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Acompanhe seus pedidos em tempo real</li>
            <li>• Salve endereços de entrega favoritos</li>
            <li>• Receba ofertas exclusivas</li>
            <li>• Finalize suas compras mais rápido</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
