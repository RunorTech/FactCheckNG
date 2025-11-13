'use client'

import { DehydratedState, HydrationBoundary, QueryClientProvider } from '@tanstack/react-query'
import { persistor, store } from '@/utils/store'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { persistQueryClient } from '@tanstack/react-query-persist-client'

import { queryClient } from './queryClient'

export const ReactQueryClientProvider = ({
  children,
  dehydratedState,
}: {
  children: React.ReactNode
    dehydratedState?: DehydratedState | null | undefined
}) => {
  useEffect(() => {
    try {
      if (window) {
        const persister = createSyncStoragePersister({
          storage: window.localStorage,
        })

        persistQueryClient({ queryClient, persister })
      }
    } catch (err) {
      console.error('Local storage not available', err)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
           {children}
          </PersistGate>
        </Provider>
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
