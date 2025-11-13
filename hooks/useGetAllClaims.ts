import { sharedQueryKeys } from "@/mock/constant";
import { allClaimsService } from "@/service/service";
import { useQueryService } from "@/utils/useQueryService";

export function useGetAllClaims(enabledClaims: boolean) {
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

  return {
    allClaims,
    isError,
    refetch,
    isLoadingClaims
  }
}
