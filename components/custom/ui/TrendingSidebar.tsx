import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const TrendingSidebar = () => {
  const trendingTopics = [
    { tag: '#LagosElection', claims: 234 },
    { tag: '#HealthcareFacts', claims: 156 },
    { tag: '#SecurityUpdate', claims: 142 },
    { tag: '#EconomyWatch', claims: 98 },
    { tag: '#EducationNG', claims: 87 },
  ];

  const topLGAs = [
    { name: 'Lagos Mainland', state: 'Lagos', claims: 1234 },
    { name: 'Ikeja', state: 'Lagos', claims: 987 },
    { name: 'Ibadan North', state: 'Oyo', claims: 756 },
    { name: 'Kaduna North', state: 'Kaduna', claims: 654 },
    { name: 'Port Harcourt', state: 'Rivers', claims: 543 },
  ];

  return (
    <div className="hidden xl:block w-80 sticky top-[4.5rem] h-[calc(100vh-4.5rem)] overflow-y-auto">
      <div className="space-y-4 p-4">
        {/* Trending Topics */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Trending Topics</h3>
          </div>
          <div className="space-y-3">
            {trendingTopics.map((topic) => (
              <div key={topic.tag} className="flex items-center justify-between">
                <button className="text-sm font-medium text-primary hover:underline">
                  {topic.tag}
                </button>
                <Badge variant="secondary" className="text-xs">
                  {topic.claims}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Top LGAs */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Most Active LGAs</h3>
          <div className="space-y-3">
            {topLGAs.map((lga, index) => (
              <Link
                key={lga.name}
                href={`/lgas/${lga.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{lga.name}</p>
                  <p className="text-xs text-muted-foreground">{lga.state} • {lga.claims} claims</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Footer Links */}
        <div className="text-xs text-muted-foreground p-4">
          <div className="flex flex-wrap gap-2">
            <Link href="/about" className="hover:underline">About</Link>
            <span>•</span>
            <Link href="/about" className="hover:underline">Help</Link>
            <span>•</span>
            <Link href="/about" className="hover:underline">Privacy</Link>
            <span>•</span>
            <Link href="/about" className="hover:underline">Terms</Link>
          </div>
          <p className="mt-2">© 2024 FactCheckNG</p>
        </div>
      </div>
    </div>
  );
};
