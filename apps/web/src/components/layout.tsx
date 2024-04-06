"use client";

import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '../wagmi.config'

const queryClient = new QueryClient()

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <div>
            {children}
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Layout;