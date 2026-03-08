import { useState, useMemo } from 'react';
import { Star, ThumbsUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: string;
  productRating: number;
  reviewCount: number;
}

const MOCK_REVIEWS: Record<string, Review[]> = {
  default: [
    {
      id: 'r1',
      author: 'Maria Luiza S.',
      rating: 5,
      date: '2025-02-14',
      text: 'Flores lindíssimas! Chegaram no prazo combinado, bem embaladas e frescas. Minha filha adorou o presente!',
      helpful: 12,
      verified: true,
    },
    {
      id: 'r2',
      author: 'João Paulo M.',
      rating: 5,
      date: '2025-01-30',
      text: 'Perfeito para o Dia dos Namorados. Entrega rápida e as flores chegaram em ótimo estado. Super recomendo a Villa Bella!',
      helpful: 8,
      verified: true,
    },
    {
      id: 'r3',
      author: 'Ana Clara R.',
      rating: 4,
      date: '2025-01-15',
      text: 'Produto de qualidade, entrega dentro do prazo. O arranjo foi ainda mais bonito do que na foto. Só tirei uma estrela porque a embalagem estava um pouquinho amassada.',
      helpful: 5,
      verified: true,
    },
    {
      id: 'r4',
      author: 'Roberto F.',
      rating: 5,
      date: '2024-12-25',
      text: 'Presenteei minha esposa e ela ficou muito feliz! As flores eram muito frescas. Atendimento via WhatsApp foi excelente também.',
      helpful: 7,
      verified: false,
    },
  ],
};

function StarRating({ value, onChange, size = 'md' }: { value: number; onChange?: (v: number) => void; size?: 'sm' | 'md' }) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;
  const sz = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';

  return (
    <div className="flex gap-1" onMouseLeave={() => setHovered(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHovered(star)}
          className={`${sz} transition-colors ${onChange ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
          aria-label={`${star} estrelas`}
        >
          <svg
            className={`${sz} ${star <= active ? 'text-gold' : 'text-muted'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-2 text-muted-foreground shrink-0">{stars}</span>
      <Star className="h-3 w-3 text-gold fill-gold shrink-0" />
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-6 text-right text-muted-foreground">{count}</span>
    </div>
  );
}

export function ProductReviews({ productId, productRating, reviewCount }: ProductReviewsProps) {
  const { toast } = useToast();
  const storageKey = `vb_reviews_${productId}`;

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      const extra: Review[] = stored ? JSON.parse(stored) : [];
      return [...extra, ...(MOCK_REVIEWS.default)];
    } catch {
      return MOCK_REVIEWS.default;
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');
  const [helpfulVotes, setHelpfulVotes] = useState<Set<string>>(new Set());

  // Compute star distribution
  const distribution = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => { dist[r.rating as keyof typeof dist]++; });
    return dist;
  }, [reviews]);

  const avgRating = useMemo(() => {
    if (reviews.length === 0) return productRating;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  }, [reviews, productRating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const review: Review = {
      id: `user_${Date.now()}`,
      author: newAuthor.trim(),
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      text: newText.trim(),
      helpful: 0,
      verified: false,
    };

    const stored = (() => {
      try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; }
    })();
    localStorage.setItem(storageKey, JSON.stringify([review, ...stored]));
    setReviews((prev) => [review, ...prev]);
    setNewAuthor('');
    setNewText('');
    setNewRating(5);
    setShowForm(false);
    toast({ title: 'Avaliação enviada!', description: 'Obrigado pela sua opinião.' });
  };

  const handleHelpful = (id: string) => {
    if (helpfulVotes.has(id)) return;
    setHelpfulVotes((prev) => new Set([...prev, id]));
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, helpful: r.helpful + 1 } : r));
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <section className="border-t pt-12" id="avaliacoes">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <h2 className="font-display text-2xl font-bold">Avaliações dos Clientes</h2>
        <Button variant="outline" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : '✍️ Escrever avaliação'}
        </Button>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-2 gap-8 mb-8 p-6 bg-accent/30 rounded-xl">
        {/* Overall */}
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <span className="text-6xl font-bold text-primary">{avgRating.toFixed(1)}</span>
          <StarRating value={Math.round(avgRating)} size="md" />
          <span className="text-sm text-muted-foreground">
            Com base em {reviews.length} avaliações
          </span>
          <Badge className="bg-success/20 text-success border-success/30 mt-1">
            ✓ Avaliações verificadas
          </Badge>
        </div>
        {/* Distribution */}
        <div className="space-y-2 justify-center flex flex-col">
          {([5, 4, 3, 2, 1] as const).map((s) => (
            <RatingBar key={s} stars={s} count={distribution[s]} total={reviews.length} />
          ))}
        </div>
      </div>

      {/* Review form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="border rounded-xl p-6 mb-8 bg-card animate-slide-down space-y-4"
        >
          <h3 className="font-semibold text-lg">Sua avaliação</h3>

          <div>
            <Label className="mb-2 block">Nota</Label>
            <StarRating value={newRating} onChange={setNewRating} />
          </div>

          <div>
            <Label htmlFor="review-author">Seu nome</Label>
            <Input
              id="review-author"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              placeholder="Ex: Maria L."
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="review-text">Comentário</Label>
            <Textarea
              id="review-text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Conte sobre sua experiência com este produto..."
              className="mt-1"
              rows={4}
              required
            />
          </div>

          <Button type="submit" variant="hero">
            Enviar avaliação
          </Button>
        </form>
      )}

      {/* Reviews list */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{review.author}</span>
                    {review.verified && (
                      <Badge variant="outline" className="text-xs text-success border-success/40 py-0">
                        ✓ Compra verificada
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StarRating value={review.rating} size="sm" />
                    <span className="text-xs text-muted-foreground">{formatDate(review.date)}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed mb-3">{review.text}</p>
            <button
              onClick={() => handleHelpful(review.id)}
              disabled={helpfulVotes.has(review.id)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-default"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              Útil ({review.helpful})
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
