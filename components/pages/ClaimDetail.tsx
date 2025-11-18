/* eslint-disable react/no-unescaped-entities */
'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { MapPin, Calendar, Eye, ExternalLink, AlertTriangle, Share2, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { VerdictBadge } from '../custom/ui/VerdictBadge';
import { ClaimCard } from '../custom/ui/ClaimCard';
import { useGetClaim } from '@/hooks/useGetClaim';
import Loading from '@/context/loading';
import Masonry from 'react-masonry-css';
import { useGetRelatedClaim } from '@/hooks/useGetRelatedClaim';

const ClaimDetail = () => {
  // const id = 'd6d81240-5b66-4c38-b72e-2b1f0c65ed0b'

  // const claim = getClaimById(id as string || '');
  const [notesOpen, setNotesOpen] = useState(false);
  const [enableGetClaim, setEnableGetClaim] = useState(true)

  const { claim: Claim_, isLoadingClaim } = useGetClaim(enableGetClaim);

  const claim = Claim_?.claim
  const { relatedClaim, isLoadingRelatedClaim } = useGetRelatedClaim(claim?.lga.name);

  useEffect(() => {
    if (isLoadingClaim || !enableGetClaim) return;

    Promise.resolve().then(() => setEnableGetClaim(false));
  }, [isLoadingClaim, enableGetClaim]);

  if (!isLoadingClaim && !claim?.id) {
    return (
      <div className="flex min-h-screen flex-col max-w-4xl">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Claim Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The claim you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }


  return (
    <div className="flex min-h-screen flex-col">

      {isLoadingClaim ? (<Loading />) : claim?.id && (<main className="flex-1 py-12">
        <article className="container max-w-4xl">
          {/* Header */}
          <div className="space-y-6 mb-8">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-4xl font-bold tracking-tight flex-1">
                {claim.title}
              </h1>
              <VerdictBadge verdict={claim.verdict} size="lg" />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{claim.lga.name}, {claim.lga.state.name}</span>
              </div>
              <Badge variant="secondary">{claim.category}</Badge>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Submitted {new Date(claim.submittedDate).toLocaleDateString()}</span>
              </div>
              {claim.verdictDate && (
                <div className="flex items-center gap-1">
                  <span>Verified {new Date(claim.verdictDate).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{claim.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>

          {/* Verdict Summary */}
          {claim.verdictSummary && (
            <Card className="mb-8 border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-xl">Verdict Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">{claim.verdictSummary}</p>
                {claim.investigatorId && (
                  <p className="text-sm text-muted-foreground mt-4">
                    Verified by {claim.investigatorId}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Claim Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{claim.description}</p>
            </CardContent>
          </Card>

          {/* Evidence */}
          {claim.evidence.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Evidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {claim.evidence.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      {item.type === 'image' && (
                        <img
                          src={item.url}
                          alt={item.caption || 'Evidence'}
                          className="w-full rounded-lg border"
                        />
                      )}
                      {item.caption && (
                        <p className="text-sm text-muted-foreground">{item.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Citations */}
          {claim.citations.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Sources & Citations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {claim.citations.map((citation, idx) => (
                    <li key={idx}>
                      <a
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>{citation.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Investigator Notes */}
          {claim.investigatorNotes && (
            <Card className="mb-8">
              <Collapsible open={notesOpen} onOpenChange={setNotesOpen}>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle>Investigator Notes</CardTitle>
                      <ChevronDown className={`h-5 w-5 transition-transform ${notesOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{claim.investigatorNotes}</p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-12">
            <Button variant="outline" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Report Issue
            </Button>
            <Button variant="outline" className="gap-2">
              Appeal Verdict
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Related Claims */}
          {relatedClaim && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Claims from {claim.lga.name}</h2>
              <Masonry
                breakpointCols={{ default: 2, 768: 1 }}
                className="flex gap-6"
                columnClassName="flex flex-col gap-6"
              >
                {relatedClaim.claims.map((claim) => (
                  <ClaimCard key={claim.id} {...claim} />
                ))}
              </Masonry>
            </div>
          )}
        </article>
      </main >)}

    </div>
  );
};

export default ClaimDetail;
