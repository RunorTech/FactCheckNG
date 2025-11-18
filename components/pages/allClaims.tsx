/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
// import { mockClaims } from '@/mock/claims';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClaimCard } from '../custom/ui/ClaimCard';
import { CreatePostCard } from '../custom/ui/CreatePostCard';
import { useEffect, useState } from 'react';
import { useGetAllClaims } from '@/hooks/useGetAllClaims';
import Loading from '@/context/loading';

const AllClaims = () => {
  // const feedClaims = mockClaims;
  const [enableGetClaim, setEnableGetClaim] = useState(true)

  const { allClaims, isLoadingClaims } = useGetAllClaims(enableGetClaim);

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
      <CreatePostCard />

     
      {isLoadingClaims ? (<Loading />) : (
        <div className="space-y-4">
          {allClaims?.claims?.map((claim) => (
            <ClaimCard key={claim.id} {...claim} />
          ))}
        </div>
      )}
      
    </div>


  );
};

export default AllClaims;
