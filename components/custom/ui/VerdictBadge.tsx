import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { VerdictStatus } from '@/mock/claims';
import { cn } from '@/lib/utils';

interface VerdictBadgeProps {
  verdict: VerdictStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const VerdictBadge = ({ verdict, size = 'md' }: VerdictBadgeProps) => {
  const config = {
    true: {
      label: 'VERIFIED',
      icon: CheckCircle,
      className: 'bg-verdict-true/10 text-verdict-true border-verdict-true',
    },
    false: {
      label: 'FALSE',
      icon: XCircle,
      className: 'bg-verdict-false/10 text-verdict-false border-verdict-false',
    },
    pending: {
      label: 'PENDING',
      icon: Clock,
      className: 'bg-verdict-pending/10 text-verdict-pending border-verdict-pending',
    },
    inconclusive: {
      label: 'INCONCLUSIVE',
      icon: AlertCircle,
      className: 'bg-verdict-inconclusive/10 text-verdict-inconclusive border-verdict-inconclusive',
    },
  };

  const { label, icon: Icon, className } = config[verdict];

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border-2 font-semibold',
        className,
        sizeClasses[size]
      )}
    >
      <Icon className={iconSizes[size]} />
      <span>{label}</span>
    </div>
  );
};
