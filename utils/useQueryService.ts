// import { useSelector } from 'react-redux'

import { QueryKey, useQuery } from '@tanstack/react-query'
// import { AuthReduxState } from '@/types/reduxStore'
import client from './client'


export function useQueryService<Req extends object, Resp extends object>(
  props: UseQueryServiceProps<Req, Resp>,
) {
  const {
    service: { options: serviceOptions, ...service },
    options,
  } = props

  const {
    keys = [],
    isDownload,
    isPdf,
    canShare,
    fileName,
    ...rest
  } = options || {}
  
  // const { refreshToken, accessToken } = useSelector<
  //   CombinedReducerType,
  //   AuthReduxState
  // >(({ authentication }) => authentication)

  const result = useQuery<Resp, Error, Resp, QueryKey>({
    ...rest,
    retry: (_, error) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (error as any)?.statusCode !== 401
    },
    queryKey: [
      ...keys,
      ...(serviceOptions?.keys || []),
      service,
      // refreshToken?._time_stamp,
      // accessToken?._time_stamp,
    ],
    queryFn: async () =>
      client.request({
        ...service,
        options: { isDownload, isPdf, canShare, fileName },
      }),
  })

  return result
}
