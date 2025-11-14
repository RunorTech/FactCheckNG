"use client"

import * as React from "react"
import { Suspense } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes"
import Loading from '@/context/loading'
import { ReduxProviders } from "@/context/ReduxContext/reduxContext";
import { MToast } from "@/components/Toast";
import { ReactQueryClientProvider } from "./ReactQueryClientProvider/reactQueryClientProvider";
import { WsProvider } from "@/utils/useWebsocket";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading/>}>
      <ReactQueryClientProvider>
        <WsProvider>
        <ReduxProviders>
          <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
              {children}
              <MToast />
            
          </NextThemesProvider>
        </ReduxProviders>
        </WsProvider>
      </ReactQueryClientProvider>
    </Suspense>
  )
}
