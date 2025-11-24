import { allClaimsEvents, sharedQueryKeys } from "@/mock/constant";
import { allClaimsService } from "@/service/service";
import { useDebounce } from "@/utils/useDebounce";
import { useInfiniteQueryService } from "@/utils/useInfintyQuery";
// import { useQueryService } from "@/utils/useQueryService";
import { useWebsocket } from "@/utils/useWebsocket";
import { useEffect } from "react";

export function useGetAllClaims(enabledClaims: boolean) {
   const { search, debouncedSearch, setSearch } = useDebounce({
    initialValue: 'ALL',
  })
  const { data: getAllClaimsWSEvents } = useWebsocket({
    subEvent: allClaimsEvents.created,
  });
   const { data: deleteClaimsWSEvents } = useWebsocket({
    subEvent: allClaimsEvents.deleted,
  });
   const { data: updateClaimsWSEvents } = useWebsocket({
    subEvent: allClaimsEvents.updated,
  });

  const {
    data: responseData,
    isPending: isLoadingClaims,
    hasPreviousPage,
    fetchPreviousPage,
    hasNextPage: hasMoreClaims,
    fetchNextPage,
    isError,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQueryService<GetClaimsRequestProps, GetClaimsResponseProps>({
    service: {...allClaimsService, data: {page: '1', query: debouncedSearch, limit: "3"}},
    options: {
      enabled: enabledClaims,
    },
  });

   useEffect(() => {
    if (getAllClaimsWSEvents || deleteClaimsWSEvents || updateClaimsWSEvents) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllClaimsWSEvents, deleteClaimsWSEvents, updateClaimsWSEvents ]);

  const allClaims  = responseData?.pages?.reduce<ClaimCardProps[]>((acc, page) => {
      return acc.concat(page.data.data as unknown as ClaimCardProps[])
    }, []) || []
  const fetchMoreClaims = async (): Promise<void> => {
    fetchNextPage()

    return
  }

  return {
    allClaims,
    isError,
    refetch,
    isLoadingClaims,
    hasPreviousPage,
    fetchPreviousPage,
    hasMoreClaims,
    fetchMoreClaims,
    search,
    isFetchingNextPage,
    setSearch
  }
}
