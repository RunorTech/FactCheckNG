import {  sharedQueryKeys } from "@/mock/constant";
import { allUsersService } from "@/service/service";
import { useDebounce } from "@/utils/useDebounce";
import { useInfiniteQueryService } from "@/utils/useInfintyQuery";

export function useGetAllUsers(enabledClaims: boolean) {
   const { search, debouncedSearch, setSearch } = useDebounce({
    initialValue: 'ALL',
  })


  const {
    data: responseData,
    isPending: isLoadingUsers,
    hasPreviousPage,
    fetchPreviousPage,
    hasNextPage: hasMoreUsers,
    fetchNextPage,
    isError,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQueryService<GetClaimsRequestProps, GetClaimsResponseProps>({
    service: {...allUsersService, data: {page: '1', query: debouncedSearch, limit: "3"}},
    options: {
      enabled: enabledClaims,
      keys: [`${sharedQueryKeys.getClaims}`],
    },
  });


  const allUsers  = responseData?.pages?.reduce<UserProfileProps[]>((acc, page) => {
      return acc.concat(page.data.data as unknown as UserProfileProps[])
    }, []) || []
  const fetchMoreClaims = async (): Promise<void> => {
    fetchNextPage()

    return
  }

  return {
    allUsers,
    isError,
    refetch,
    isLoadingUsers,
    hasPreviousPage,
    fetchPreviousPage,
    hasMoreUsers,
    fetchMoreClaims,
    search,
    isFetchingNextPage,
    setSearch
  }
}
