import { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Filter, Grid3X3, LayoutGrid, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/product/ProductCard';
import { CatalogFilters, FilterState } from '@/components/catalog/CatalogFilters';
import { products, categories, getProductsByCategory, searchProducts } from '@/data/products';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'name' | 'rating';

const MAX_PRICE = 500;

const DEFAULT_FILTERS: FilterState = { priceRange: [0, MAX_PRICE], tags: [] };

export default function CatalogPage() {
  const { category, subcategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('busca') || '';

  const [sort, setSort] = useState<SortOption>('relevance');
  const [gridSize, setGridSize] = useState<'small' | 'large'>('small');
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Get category info
  const categoryInfo = category ? categories.find(c => c.slug === category) : null;
  const subcategoryInfo = categoryInfo?.subcategories?.find(s => s.slug === subcategory);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by search
    if (searchQuery) {
      result = searchProducts(searchQuery);
    } else if (category) {
      result = getProductsByCategory(category);
      if (subcategory) {
        result = result.filter(p => p.subcategory === subcategory);
      }
    }

    // Price range filter
    result = result.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Tag filter
    if (filters.tags.length > 0) {
      result = result.filter(p =>
        filters.tags.some(tag =>
          p.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
        )
      );
    }

    // Sort
    switch (sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [category, subcategory, searchQuery, sort, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchParams({ busca: localSearch });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setLocalSearch('');
    setSearchParams({});
  };

  const activeFilterCount =
    filters.tags.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < MAX_PRICE ? 1 : 0);

  const pageTitle = searchQuery
    ? `Resultados para "${searchQuery}"`
    : subcategoryInfo?.name || categoryInfo?.name || 'Nossa Loja';

  return (
    <main className="py-8">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          {category ? (
            <>
              <Link to="/loja" className="hover:text-primary">Loja</Link>
              <span className="mx-2">/</span>
              {subcategory ? (
                <>
                  <Link to={`/categoria/${category}`} className="hover:text-primary">
                    {categoryInfo?.name}
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="text-foreground">{subcategoryInfo?.name}</span>
                </>
              ) : (
                <span className="text-foreground">{categoryInfo?.name}</span>
              )}
            </>
          ) : (
            <span className="text-foreground">Loja</span>
          )}
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{pageTitle}</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Subcategories */}
        {categoryInfo?.subcategories && !subcategory && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categoryInfo.subcategories.map((sub) => (
              <Link
                key={sub.id}
                to={`/categoria/${category}/${sub.slug}`}
                className="px-4 py-2 rounded-full border bg-card hover:bg-accent hover:border-primary transition-colors text-sm"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}

        {/* Filters and Sort bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Mobile filter button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                  {activeFilterCount > 0 && (
                    <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filtros
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <CatalogFilters
                    category={category}
                    subcategory={subcategory}
                    filters={filters}
                    onFiltersChange={setFilters}
                    maxPrice={MAX_PRICE}
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pr-8"
              />
              {localSearch && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </form>

            {/* Active filter badges (desktop) */}
            {activeFilterCount > 0 && (
              <div className="hidden md:flex items-center gap-1 flex-wrap">
                {filters.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs cursor-pointer"
                    onClick={() =>
                      setFilters((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }))
                    }
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevância</SelectItem>
                <SelectItem value="price-asc">Menor preço</SelectItem>
                <SelectItem value="price-desc">Maior preço</SelectItem>
                <SelectItem value="name">Nome A-Z</SelectItem>
                <SelectItem value="rating">Avaliação</SelectItem>
              </SelectContent>
            </Select>

            {/* Grid toggle */}
            <div className="hidden md:flex items-center gap-1 border rounded-lg p-1">
              <Button
                variant={gridSize === 'small' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setGridSize('small')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={gridSize === 'large' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setGridSize('large')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar + Products */}
        <div className="flex gap-8">
          {/* Sidebar - Desktop only */}
          <aside className="hidden md:block w-60 shrink-0">
            <div className="sticky top-24 bg-card border rounded-xl p-4">
              <CatalogFilters
                category={category}
                subcategory={subcategory}
                filters={filters}
                onFiltersChange={setFilters}
                maxPrice={MAX_PRICE}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-2">
                  Nenhum produto encontrado
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Tente ajustar os filtros ou buscar por outro termo.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => setFilters(DEFAULT_FILTERS)}>
                    Limpar filtros
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/loja">Ver todos</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className={`grid gap-4 md:gap-5 ${
                gridSize === 'small'
                  ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
