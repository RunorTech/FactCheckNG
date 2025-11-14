"use client"
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Search, ChevronDown, MapPin } from 'lucide-react';
import { getLGAsByState, getClaimsByLGA } from '@/mock/claims';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const LGAsPage = () => {
  const searchParams = useSearchParams()
  const selectedState = searchParams.get('state')
  const lgasByState = getLGAsByState();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStates = Object.entries(lgasByState).filter(([state]) =>
    !searchQuery || state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1 py-12">
        <div className="container max-w-5xl">
          <div className="space-y-2 mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Browse by Location</h1>
            <p className="text-lg text-muted-foreground">
              Find verified claims from Local Government Areas across Nigeria
            </p>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search states..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredStates.map(([state, lgas]) => {
              const isOpen = selectedState === state;
              
              return (
                <Collapsible key={state} defaultOpen={isOpen}>
                  <div className="rounded-lg border bg-card overflow-hidden">
                    <CollapsibleTrigger className="w-full p-6 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-primary" />
                          <div className="text-left">
                            <h2 className="text-xl font-semibold">{state}</h2>
                            <p className="text-sm text-muted-foreground">
                              {lgas.length} LGA{lgas.length > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="border-t p-6 bg-muted/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {lgas.map((lga) => {
                            const claims = getClaimsByLGA(lga);
                            return (
                              <Link
                                key={lga}
                                href={`/lgas/${encodeURIComponent(lga?.toLowerCase().replace(/\s+/g, '-'))}`}
                                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:border-primary/50 hover:shadow-md transition-all"
                              >
                                <span className="font-medium">{lga}</span>
                                <Badge variant="secondary">{claims.length}</Badge>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              );
            })}
          </div>

          {filteredStates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No states found matching your search.</p>
            </div>
          )}
        </div>
      </main>

    </div>
  );
};

export default LGAsPage;
