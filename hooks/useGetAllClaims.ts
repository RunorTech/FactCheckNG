import { allClaimsEvents, sharedQueryKeys } from "@/mock/constant";
import { allClaimsService } from "@/service/service";
import { useQueryService } from "@/utils/useQueryService";
import { useWebsocket } from "@/utils/useWebsocket";
import { useEffect } from "react";

export function useGetAllClaims(enabledClaims: boolean) {
  const { data: getAllClaimsWSEvents } = useWebsocket({
    subEvent: allClaimsEvents.created,
  });
  const {
    data: allClaims,
    isPending: isLoadingClaims,
    isError,
    refetch,
  } = useQueryService<GetClaimRequestProps, GetClaimResponseProps>({
    service: allClaimsService,
    options: {
      enabled: enabledClaims,
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
    allClaims,
    isError,
    refetch,
    isLoadingClaims
  }
}
