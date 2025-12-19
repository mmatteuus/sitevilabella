import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    toast({
      title: 'Perfil atualizado',
      description: 'Suas informações foram atualizadas com sucesso.',
    });
  };

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-bold">Meu Perfil</h2>
        {!isEditing && (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Editar
          </Button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(63) 99999-9999"
              className="mt-1"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit">Salvar alterações</Button>
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <Label className="text-muted-foreground">Nome completo</Label>
            <p className="font-medium">{user?.name || '-'}</p>
          </div>

          <div>
            <Label className="text-muted-foreground">Email</Label>
            <p className="font-medium">{user?.email || '-'}</p>
          </div>

          <div>
            <Label className="text-muted-foreground">Telefone</Label>
            <p className="font-medium">{user?.phone || 'Não informado'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
