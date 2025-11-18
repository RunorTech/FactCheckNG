// import { useSelector } from 'react-redux'

import { useMutation } from '@tanstack/react-query'

import client from './client'
// import { AuthReduxState } from '@/types/reduxStore'

export function useMutationService<Req extends object, Resp extends object>(
  props: UseMutationServiceProps<Req, Resp>,
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
    isFormData,
    ...rest
  } = options || {}

  // const { refreshToken, accessToken } =
  //   useSelector<CombinedReducerType, AuthReduxState>(
  //     ({ authentication }) => authentication,
  //   ) || {}

  return useMutation<Resp, Error, Req>({
    ...rest,

    mutationKey: [
      ...keys,
      ...(serviceOptions?.keys || []),
      service,
      // refreshToken?._time_stamp,
      // accessToken?._time_stamp,
    ],
    mutationFn: async (data) =>
      client.request<Req, Resp>({
        ...service,
        ...data,
        options: { isFormData, isDownload, isPdf, canShare, fileName },
      }),
  })
}
