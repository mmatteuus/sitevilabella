import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, ChevronDown, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { categories } from '@/data/products';
import { brand } from '@/config/brand';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/loja?busca=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="hidden md:block bg-primary text-primary-foreground py-1.5">
        <div className="container flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5" />
            <span>WhatsApp: {brand.contact.whatsapp.numberDisplay}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-success rounded-full animate-pulse" />
              {brand.delivery.promiseShort}
            </span>
            <span>|</span>
            <span>{brand.locationLabel}</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="text-left font-display text-primary">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4">
                {categories.map(cat => (
                  <div key={cat.id}>
                    <Link
                      to={`/categoria/${cat.slug}`}
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cat.name}
                    </Link>
                    {cat.subcategories && (
                      <div className="ml-4 mt-2 flex flex-col gap-2">
                        {cat.subcategories.map(sub => (
                          <Link
                            key={sub.id}
                            to={`/categoria/${cat.slug}/${sub.slug}`}
                            className="text-sm text-muted-foreground hover:text-primary"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  to="/clube-vb"
                  className="text-lg font-medium text-primary hover:text-primary/80 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Clube VB
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <span className="font-display text-xl md:text-2xl font-bold text-primary">{brand.name}</span>
              <span className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase">Floricultura</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                Flores
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/categoria/flores" className="w-full">Ver todas</Link>
                </DropdownMenuItem>
                {categories[0].subcategories?.map(sub => (
                  <DropdownMenuItem key={sub.id} asChild>
                    <Link to={`/categoria/flores/${sub.slug}`} className="w-full">{sub.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/categoria/cestas" className="text-sm font-medium hover:text-primary transition-colors">
              Cestas
            </Link>
            <Link to="/categoria/chocolates" className="text-sm font-medium hover:text-primary transition-colors">
              Chocolates
            </Link>
            <Link to="/categoria/coroas" className="text-sm font-medium hover:text-primary transition-colors">
              Coroas
            </Link>
            <Link to="/clube-vb" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
              Clube VB
            </Link>
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar flores, cestas, chocolates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => navigate('/loja')}>
              <Search className="h-5 w-5" />
            </Button>

            <Link to={isAuthenticated ? '/minha-conta' : '/entrar'}>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
