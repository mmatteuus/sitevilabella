import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/products';

export interface FilterState {
  priceRange: [number, number];
  tags: string[];
}

interface CatalogFiltersProps {
  category?: string;
  subcategory?: string;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  maxPrice: number;
}

const ALL_TAGS = [
  { value: 'romântico', label: 'Romântico' },
  { value: 'aniversário', label: 'Aniversário' },
  { value: 'presente', label: 'Presente' },
  { value: 'luxo', label: 'Luxo' },
  { value: 'simples', label: 'Simples' },
  { value: 'condolências', label: 'Condolências' },
  { value: 'complemento', label: 'Complemento' },
];

export function CatalogFilters({
  category,
  subcategory,
  filters,
  onFiltersChange,
  maxPrice,
}: CatalogFiltersProps) {
  const formatPrice = (p: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p);

  const toggleTag = (tag: string) => {
    const next = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    onFiltersChange({ ...filters, tags: next });
  };

  const resetFilters = () => {
    onFiltersChange({ priceRange: [0, maxPrice], tags: [] });
  };

  const hasActiveFilters =
    filters.tags.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < maxPrice;

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
          Categorias
        </h3>
        <nav className="space-y-1">
          <Link
            to="/loja"
            className={`block py-2 px-3 rounded-lg text-sm hover:bg-accent transition-colors ${
              !category ? 'bg-accent text-primary font-medium' : ''
            }`}
          >
            Todos os produtos
          </Link>
          {categories.map((cat) => (
            <div key={cat.id}>
              <Link
                to={`/categoria/${cat.slug}`}
                className={`block py-2 px-3 rounded-lg text-sm hover:bg-accent transition-colors ${
                  category === cat.slug && !subcategory
                    ? 'bg-accent text-primary font-medium'
                    : ''
                }`}
              >
                {cat.name}
              </Link>
              {category === cat.slug && cat.subcategories && (
                <div className="ml-4 mt-1 space-y-1">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      to={`/categoria/${cat.slug}/${sub.slug}`}
                      className={`block py-1.5 px-3 rounded-lg text-xs hover:bg-accent transition-colors ${
                        subcategory === sub.slug
                          ? 'bg-accent text-primary font-medium'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
          Faixa de Preço
        </h3>
        <Slider
          min={0}
          max={maxPrice}
          step={10}
          value={filters.priceRange}
          onValueChange={(val) =>
            onFiltersChange({ ...filters, priceRange: val as [number, number] })
          }
          className="mb-3"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatPrice(filters.priceRange[0])}</span>
          <span>{formatPrice(filters.priceRange[1])}</span>
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
          Ocasião / Tag
        </h3>
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => toggleTag(value)}
              className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                filters.tags.includes(value)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:border-primary hover:text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Active filters summary & reset */}
      {hasActiveFilters && (
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">Filtros ativos</span>
            <button
              onClick={resetFilters}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              <X className="h-3 w-3" />
              Limpar
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {filters.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                onClick={() => toggleTag(tag)}
              >
                {tag} ×
              </Badge>
            ))}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) && (
              <Badge variant="secondary" className="text-xs">
                {formatPrice(filters.priceRange[0])} – {formatPrice(filters.priceRange[1])}
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
