import { Search, TrendingUp, MapPin, CheckCircle2 } from 'lucide-react';
import { ClaimCard } from '@/components/custom/ui/ClaimCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockClaims, getLGAsByState } from '@/mock/claims';
import heroBg from '@/public/hero-bg.jpg';
import Link from 'next/link';
import SocialLinks from '../custom/ui/Socials';

const HomePage = () => {
  const trendingClaims = mockClaims.slice(0, 3);
  const recentVerified = mockClaims.filter(c => c.verdict !== 'pending').slice(0, 3);
  const lgasByState = getLGAsByState();
  const topStates = Object.entries(lgasByState).slice(0, 6);

  return (
    <div className="flex min-h-screen flex-col">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/25 to-background py-20 overflow-hidden min-h-[70vh]">
        <div 
          className="absolute inset-0 opacity-9"
          style={{ 
            backgroundImage: `url(${heroBg.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary-green">
              <CheckCircle2 className="h-4 w-4" />
              <span>Verified by Trusted Researchers</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Truth Matters in Nigeria
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Search, verify, and track claims across all Local Government Areas
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search claims or enter keywords..."
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button size="lg" className="h-12 px-8 font-bold">
                Search
              </Button>
            </div>

            <div className="pt-4">
              <Link href="/submit">
                <Button variant="outline" size="lg" className="gap-2">
                  Submit a Claim
                </Button>
              </Link>
            </div>
            <div className="pt-4">
              <SocialLinks />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Claims */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <TrendingUp className="h-7 w-7 text-primary" />
                Trending Claims
              </h2>
              <p className="text-muted-foreground">Most viewed claims this week</p>
            </div>
            <Link href="/claims">
              <Button variant="ghost">View All →</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingClaims.map((claim) => (
              <ClaimCard key={claim.id} {...claim} />
            ))}
          </div>
        </div>
      </section>

      {/* Recently Verified */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="space-y-1 mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Recently Verified</h2>
            <p className="text-muted-foreground">Latest fact-checked claims</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentVerified.map((claim) => (
              <ClaimCard key={claim.id} {...claim} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by State */}
      <section className="py-16">
        <div className="container">
          <div className="space-y-1 mb-8">
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <MapPin className="h-7 w-7 text-primary" />
              Browse by State
            </h2>
            <p className="text-muted-foreground">Find claims from your Local Government Area</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topStates.map(([state, lgas]) => (
              <div
                key={state}
                className="rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50"
              >
                <h3 className="text-xl font-semibold mb-3">{state}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {lgas.length} LGA{lgas.length > 1 ? 's' : ''} with claims
                </p>
                <Link href={`/lgas?state=${encodeURIComponent(state)}`}>
                  <Button variant="outline" className="w-full">
                    View Claims
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/lgas">
              <Button variant="outline" size="lg">
                View All States & LGAs
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
