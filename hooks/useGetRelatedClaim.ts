import { sharedApis } from "@/mock/apiUrl";
import { allClaimsEvents, sharedQueryKeys } from "@/mock/constant";
import {  relatedClaimService } from "@/service/service";
import { useQueryService } from "@/utils/useQueryService";
import { useWebsocket } from "@/utils/useWebsocket";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export function useGetRelatedClaim(lga?: string) {
    const { id } = useParams();

  const { data: getAllClaimsWSEvents } = useWebsocket({
    subEvent: allClaimsEvents.updated,
  });
  const {
    data: relatedClaim,
    isPending: isLoadingRelatedClaim,
    isError,
    refetch,
  } = useQueryService<Request, GetRelatedClaimsResponseProps>({
    service:  {...relatedClaimService,  path: sharedApis.relatedClaim({id: id as string, lga: lga as string})},
    options: {
      enabled: !!lga,
      keys: [`${sharedQueryKeys.getRelatedClaim}`],
    },
  });

   useEffect(() => {
    if (getAllClaimsWSEvents) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllClaimsWSEvents]);


  return {
    relatedClaim,
    isError,
    refetch,
    isLoadingRelatedClaim
  }
}
