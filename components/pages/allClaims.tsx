/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClaimCard } from '../custom/ui/ClaimCard';
import { useEffect, useRef, useState } from 'react';
import { useGetAllClaims } from '@/hooks/useGetAllClaims';
import { SubmitClaimModal } from './submitClaimModal';
import Loading from '@/context/loading';

const AllClaims = () => {
  const [enableGetClaim, setEnableGetClaim] = useState(true)
  

  const { allClaims, isLoadingClaims, fetchMoreClaims, isFetchingNextPage, hasMoreClaims } = useGetAllClaims(enableGetClaim);
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isFetchingNextPage || !hasMoreClaims) return;

    const observer = new IntersectionObserver(async (entries) => {
      const isVisible = entries[0]?.isIntersecting;
      if (isVisible) {
        await fetchMoreClaims();
      }
    }, { rootMargin: "250px" });

    const target = loadMoreRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [fetchMoreClaims, hasMoreClaims, isFetchingNextPage]);

  useEffect(() => {
    if (isLoadingClaims || !enableGetClaim) return;

    Promise.resolve().then(() => setEnableGetClaim(false));
  }, [isLoadingClaims, enableGetClaim]);

 

  return (

    <div className="flex-1 max-w-2xl mx-auto">
      {/* Filter Tabs */}
      <div className="mb-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start bg-card border">
            <TabsTrigger value="all">All Claims</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="inconclusive">Inconclusive</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Create Post */}
      <SubmitClaimModal/>
      <Loading openDialog={isLoadingClaims} />
     
      {!isLoadingClaims && allClaims.length > 0 &&(
        <div className="space-y-4 mb-6">
          {allClaims?.map((claim) => (
            <ClaimCard key={claim?.id} {...claim} />
          ))}
        </div>
      )}

      {/* 👇 Sentinel for infinite loading */}
      {hasMoreClaims && (
        <div
          ref={loadMoreRef}
          className="h-20 flex justify-center items-center text-center text-sm text-muted-foreground"
        >
          {isFetchingNextPage ? "Loading more..." : ""}
        </div>
      )}

      {!hasMoreClaims && (
        <div className="h-20 text-center text-muted-foreground text-sm">
          No more claims
        </div>
      )}
      
    </div>


  );
};

export default AllClaims;
