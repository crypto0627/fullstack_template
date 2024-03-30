"use client";

import React from "react";

import { ThemeProvider } from "@material-tailwind/react";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type Chain, configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { publicEnv } from "@/lib/env/public";

import Navbar from "./Navbar";

const OpSepolia: Chain = {
  id: 11155420, // The chain ID of your custom chain
  name: "Optimism Sepolia",
  network: "Optimism Sepolia",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    public: {
      http: ["https://sepolia.optimism.io"],
    },
    default: {
      http: ["https://sepolia.optimism.io"],
    },
  },
  testnet: true,
};
const Zircuit: Chain = {
  id: 48899, // The chain ID of your custom chain
  name: "Zircuit Sepolia",
  network: "Zircuit Sepolia",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    public: {
      http: ["https://zircuit1.p2pify.com"],
    },
    default: {
      http: ["https://zircuit1.p2pify.com"],
    },
  },
  testnet: true,
};
const LineaTestnet: Chain = {
  id: 59140, // The chain ID of your custom chain
  name: "Linea Testnet",
  network: "Linea Testnet",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    public: {
      http: ["https://rpc.goerli.linea.build"],
    },
    default: {
      http: ["https://rpc.goerli.linea.build"],
    },
  },
  testnet: true,
};
const ScrollTestnet: Chain = {
  id: 534351, // The chain ID of your custom chain
  name: "Scroll Testnet",
  network: "Scroll Testnet",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    public: {
      http: ["https://scroll-sepolia.blockpi.network/v1/rpc/public"],
    },
    default: {
      http: ["https://scroll-sepolia.blockpi.network/v1/rpc/public"],
    },
  },
  testnet: true,
};
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [LineaTestnet, OpSepolia, Zircuit, ScrollTestnet],
  [publicProvider()],
);
const ProjectId = "c8f5568be13e77fcd2aec2a714b52208"

const connectors = connectorsForWallets([
  // {
  //   groupName: "Email",
  //   wallets: [rainbowMagicConnector({ chains })],
  // },
  {
    groupName: "recommanded",
    wallets: [metaMaskWallet({ projectId: ProjectId, chains })],
  },
  {
    groupName: "others",
    wallets: [
      rainbowWallet({ projectId: ProjectId, chains }),
      walletConnectWallet({ projectId: ProjectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 10,
    },
  },
});
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} coolMode>
          <ThemeProvider>
            <div className="fixed left-0 right-0 top-0 z-50">
              {" "}
              {/* Adjust z-index as needed */}
              <Navbar />
            </div>
            <div className="pt-36">
              {" "}
              {/* Adjust padding-top based on Navbar's height */}
              {children}
            </div>
          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default Layout;
