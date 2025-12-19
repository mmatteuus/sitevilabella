import { LucideIcon, Shield, Truck, Clock, CreditCard, Heart, MessageCircle } from 'lucide-react';

interface TrustBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function TrustBadgeItem({ icon: Icon, title, description }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function TrustBadges() {
  const badges = [
    {
      icon: Truck,
      title: 'Entrega em até 3 horas',
      description: 'Para pedidos na região',
    },
    {
      icon: Shield,
      title: 'Pagamento Seguro',
      description: 'Ambiente 100% protegido',
    },
    {
      icon: Heart,
      title: 'Satisfação Garantida',
      description: 'Qualidade ou seu dinheiro de volta',
    },
    {
      icon: MessageCircle,
      title: 'Mensagem Personalizada',
      description: 'Cartão gratuito em todos os pedidos',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {badges.map((badge, index) => (
        <TrustBadgeItem key={index} {...badge} />
      ))}
    </div>
  );
}

export function TrustBadgesCompact() {
  const badges = [
    { icon: Truck, text: 'Entrega rápida' },
    { icon: Shield, text: 'Pagamento seguro' },
    { icon: Heart, text: 'Satisfação garantida' },
    { icon: MessageCircle, text: 'Cartão personalizado' },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <badge.icon className="h-3.5 w-3.5 text-success" />
          <span>{badge.text}</span>
        </div>
      ))}
    </div>
  );
}
