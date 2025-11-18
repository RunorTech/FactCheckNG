import { sharedApis } from "@/mock/apiUrl";
import { allClaimsEvents, sharedQueryKeys } from "@/mock/constant";
import {  claimService } from "@/service/service";
import { useQueryService } from "@/utils/useQueryService";
import { useWebsocket } from "@/utils/useWebsocket";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export function useGetClaim(enabledClaim: boolean) {
    const { id } = useParams();

  const { data: getAllClaimsWSEvents } = useWebsocket({
    subEvent: allClaimsEvents.created,
  });
  const {
    data: claim,
    isPending: isLoadingClaim,
    isError,
    refetch,
  } = useQueryService<GetClaimRequestProps, GetClaimResponseProps>({
    service:  {...claimService,  path: sharedApis.claim(id as string)},
    options: {
      enabled: enabledClaim,
      keys: [`${sharedQueryKeys.getClaims}`],
    },
  });

   useEffect(() => {
    if (getAllClaimsWSEvents) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllClaimsWSEvents]);


  return {
    claim,
    isError,
    refetch,
    isLoadingClaim
  }
}
