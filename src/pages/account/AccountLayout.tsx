import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { User, MapPin, Package, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
  { path: '/minha-conta', label: 'Meu Perfil', icon: User, exact: true },
  { path: '/minha-conta/enderecos', label: 'Endereços', icon: MapPin },
  { path: '/minha-conta/pedidos', label: 'Meus Pedidos', icon: Package },
];

export default function AccountLayout() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <main className="py-16">
        <div className="container max-w-md mx-auto text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Acesso restrito</h1>
          <p className="text-muted-foreground mb-8">
            Faça login para acessar sua conta
          </p>
          <Button asChild variant="hero">
            <Link to="/entrar">Entrar</Link>
          </Button>
        </div>
      </main>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <main className="py-8">
      <div className="container">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Minha Conta</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="rounded-xl border bg-card p-4">
              {/* User info */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold truncate">{user?.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                </div>
              </div>

              {/* Menu */}
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = item.exact
                    ? location.pathname === item.path
                    : location.pathname.startsWith(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="flex-1">{item.label}</span>
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </Link>
                  );
                })}
              </nav>

              {/* Logout */}
              <div className="mt-4 pt-4 border-t">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left hover:bg-destructive/10 text-destructive transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}
