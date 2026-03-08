import { useState, useCallback } from 'react';
import { Plus, Trash2, Edit2, Loader2, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ViaCepResult {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

const emptyForm = {
  name: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: 'Araguaína',
  state: 'TO',
  zipCode: '',
  isDefault: false,
};

export default function AddressesPage() {
  const { addresses, addAddress, updateAddress, removeAddress } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [cepLoading, setCepLoading] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  // ── ViaCEP lookup ──────────────────────────────────────────────────────────
  const lookupCep = useCallback(async (cep: string) => {
    const cleaned = cep.replace(/\D/g, '');
    if (cleaned.length !== 8) return;
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
      const data: ViaCepResult = await res.json();
      if (data.erro) {
        toast({ title: 'CEP não encontrado', variant: 'destructive' });
        return;
      }
      setFormData(prev => ({
        ...prev,
        street: data.logradouro || prev.street,
        neighborhood: data.bairro || prev.neighborhood,
        city: data.localidade || prev.city,
        state: data.uf || prev.state,
      }));
      toast({ title: '✅ Endereço preenchido automaticamente!' });
    } catch {
      toast({ title: 'Erro ao buscar CEP. Verifique sua conexão.', variant: 'destructive' });
    } finally {
      setCepLoading(false);
    }
  }, [toast]);

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 8);
    const formatted = cleaned.length > 5
      ? `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`
      : cleaned;
    setFormData(prev => ({ ...prev, zipCode: formatted }));
    if (cleaned.length === 8) lookupCep(cleaned);
  };

  // ── Dialog helpers ─────────────────────────────────────────────────────────
  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleOpenDialog = (address?: typeof addresses[0]) => {
    if (address) {
      setFormData({ ...address, complement: address.complement || '' });
      setEditingId(address.id);
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateAddress(editingId, formData);
      toast({ title: 'Endereço atualizado', description: 'Alterações salvas com sucesso.' });
    } else {
      addAddress(formData);
      toast({ title: 'Endereço adicionado', description: 'Novo endereço salvo com sucesso.' });
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    removeAddress(id);
    toast({ title: 'Endereço removido', description: 'O endereço foi removido da sua lista.' });
  };

  const handleSetDefault = (id: string) => {
    updateAddress(id, { isDefault: true });
    toast({ title: '⭐ Endereço padrão atualizado' });
  };

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xl font-bold">Meus Endereços</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Salve seus endereços favoritos para agilizar o checkout
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Novo endereço
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Editar endereço' : 'Novo endereço'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name">Nome do endereço *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Casa, Trabalho, Mãe..."
                  required
                />
              </div>

              {/* CEP with ViaCEP auto-fill */}
              <div>
                <Label htmlFor="zipCode">CEP *</Label>
                <div className="relative">
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={handleZipChange}
                    placeholder="77000-000"
                    maxLength={9}
                    required
                  />
                  {cepLoading && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Digite o CEP para preencher o endereço automaticamente
                </p>
              </div>

              {/* Street + Number */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Label htmlFor="street">Rua *</Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="number">Número *</Label>
                  <Input
                    id="number"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Complement + Neighborhood */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    value={formData.complement}
                    onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                    placeholder="Apto, bloco..."
                  />
                </div>
                <div>
                  <Label htmlFor="neighborhood">Bairro *</Label>
                  <Input
                    id="neighborhood"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* City + State (read-only after CEP fill) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={cepLoading ? 'bg-muted/50' : ''}
                  />
                </div>
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    maxLength={2}
                    className={cepLoading ? 'bg-muted/50' : ''}
                  />
                </div>
              </div>

              {/* Default checkbox */}
              <div className="flex items-center space-x-2 pt-1">
                <Checkbox
                  id="isDefault"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDefault: checked as boolean })
                  }
                />
                <Label htmlFor="isDefault" className="cursor-pointer">
                  Definir como endereço padrão
                </Label>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1" disabled={cepLoading}>
                  {editingId ? 'Atualizar' : 'Adicionar'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setIsDialogOpen(false); resetForm(); }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">
            Você ainda não tem endereços salvos
          </p>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar endereço
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`p-4 rounded-lg border transition-colors ${
                address.isDefault
                  ? 'border-primary/40 bg-primary/5'
                  : 'hover:bg-accent/30'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold">{address.name}</span>
                    {address.isDefault && (
                      <span className="inline-flex items-center gap-1 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                        <Star className="h-3 w-3 fill-current" />
                        Padrão
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {address.street}, {address.number}
                    {address.complement && ` - ${address.complement}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {address.neighborhood}, {address.city} – {address.state}
                  </p>
                  <p className="text-sm text-muted-foreground">CEP: {address.zipCode}</p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {!address.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground h-8 px-2"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      <Star className="h-3.5 w-3.5 mr-1" />
                      Padrão
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleOpenDialog(address)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(address.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <p className="text-xs text-muted-foreground pt-2 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            Estes endereços ficam disponíveis para seleção rápida no checkout
          </p>
        </div>
      )}
    </div>
  );
}
