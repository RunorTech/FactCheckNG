
import { InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query'

import client from './client';

export function useInfiniteQueryService<
  Req extends Omit<Partial<ResponseData>, 'total_products'> | undefined | null,
  Resp extends { parameters: PageParams; data: ResponseData },
>(props: UseInfinityQueryServiceProps<Req, Resp>) {
  const {
    service: { options: serviceOptions, ...restService },
    options: queryOptions,
  } = props

  const payload = restService.data || ({} as PageParams)
  const { keys = [], ...restQueryOptions } = queryOptions || {}

  const initialPageParam: PageParams = {
    page: 'page' in payload && payload.page !== undefined ? payload.page : 1,
  }

  return useInfiniteQuery<
    Resp,
    Error,
    InfiniteData<Resp, PageParams>,
    QueryKey,
    PageParams
  >({
    initialPageParam,
    ...restQueryOptions,
    queryKey: [
      ...keys,
      ...(serviceOptions?.keys || []),
      restService,

    ],
    queryFn: async ({ pageParam }) => {
      const response = await client.request<Req & PageParams, Resp>({
        ...restService,
        data: {
          ...payload,
          ...pageParam,
        } as Req & PageParams,
      })

      return response
    },
    getNextPageParam: (responseData) => {
      const { count, data } = responseData.data
      const { page } = responseData.parameters

      let total_pages
      if (count && data && page)
        total_pages = Math.ceil(count / data.length)

      if (total_pages)
        return Number(page) < total_pages
          ? { page: Number(page) + 1 }
          : undefined
    },
    getPreviousPageParam: (data) => {
      const { page } = data.parameters
      if (!page) return
      const prevPage = Number(page) - 1

      return prevPage >= 1 ? { page: prevPage } : undefined
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
