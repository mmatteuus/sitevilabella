import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { products } from '@/data/products';

interface SearchAutocompleteProps {
  onClose?: () => void;
  autoFocus?: boolean;
  className?: string;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

const popularSearches = ['Rosas vermelhas', 'Buquê', 'Girassol', 'Chocolate', 'Cesta'];

export function SearchAutocomplete({ onClose, autoFocus, className }: SearchAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = query.trim().length >= 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => setIsOpen(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    const total = results.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, total - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        navigateToProduct(results[activeIndex].slug);
      } else if (query.trim()) {
        navigateToSearch(query);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      onClose?.();
    }
  };

  const navigateToProduct = useCallback((slug: string) => {
    navigate(`/produto/${slug}`);
    setQuery('');
    setIsOpen(false);
    onClose?.();
  }, [navigate, onClose]);

  const navigateToSearch = useCallback((q: string) => {
    navigate(`/loja?busca=${encodeURIComponent(q)}`);
    setQuery('');
    setIsOpen(false);
    onClose?.();
  }, [navigate, onClose]);

  const handleClear = () => {
    setQuery('');
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const showDropdown = isOpen && (results.length > 0 || query.length === 0);

  return (
    <div ref={containerRef} className={`relative ${className ?? ''}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (query.trim()) navigateToSearch(query);
        }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Buscar flores, cestas, chocolates..."
            value={query}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-8"
            autoComplete="off"
            aria-label="Buscar produtos"
            aria-autocomplete="list"
            aria-expanded={showDropdown}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Limpar busca"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </form>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full mt-2 left-0 right-0 z-50 bg-popover border rounded-xl shadow-xl overflow-hidden animate-scale-in">
          {results.length > 0 ? (
            <ul role="listbox" className="py-1">
              {results.map((product, i) => (
                <li
                  key={product.id}
                  role="option"
                  aria-selected={i === activeIndex}
                  className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors ${
                    i === activeIndex ? 'bg-accent' : 'hover:bg-muted'
                  }`}
                  onMouseDown={() => navigateToProduct(product.slug)}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{product.category}</p>
                  </div>
                  {/* Price */}
                  <div className="text-sm font-bold text-primary shrink-0">
                    {formatPrice(product.price)}
                  </div>
                </li>
              ))}
              {query.trim() && (
                <li
                  className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-muted transition-colors border-t"
                  onMouseDown={() => navigateToSearch(query)}
                >
                  <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shrink-0">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ver todos os resultados para</p>
                    <p className="text-xs text-primary font-semibold">"{query}"</p>
                  </div>
                </li>
              )}
            </ul>
          ) : (
            // Popular searches when empty
            <div className="p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 px-1">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Buscas populares</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    className="text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    onMouseDown={() => navigateToSearch(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
