import { MapPin, Calendar, Eye } from 'lucide-react';
import { Claim } from '@/mock/claims';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VerdictBadge } from './VerdictBadge';
import Link from 'next/link';
import Image from 'next/image';
import speaking from '@/assets/speaking.jpg';


interface ClaimCardProps {
  claim: Claim;
}

export const ClaimCard = ({ claim }: ClaimCardProps) => {
  return (
    <Link href={`/claims/${claim.id}`}>
      <Card className="relative h-full transition-all hover:shadow-lg hover:border-primary/50 bg-gradient-to-b from-background  via-background/0 to-primary  overflow-hidden">
        <Image className='absolute inset-0 opacity-30' alt='' src={speaking}></Image>
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">
              {claim.title}
            </h3>
            <VerdictBadge verdict={claim.verdict} size="sm" />
          </div>

          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{claim.lga}, {claim.state}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {claim.category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-foreground font-bold line-clamp-3">
            {claim.description}
          </p>

          <div className="flex items-center justify-between text-xs text-white font-extrabold">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(claim.submittedDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{claim.views.toLocaleString()} views</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
