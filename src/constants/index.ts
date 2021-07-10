import { AbstractConnector } from "@web3-react/abstract-connector"

import { injected, walletconnect, walletlink } from "../connectors"
import { TokenInfo } from "../dtos/TokenInfo"

export const NETWORK_LABELS: { [chainId in number]?: string } = {
  1: "Ethereum",  
  56: "Binance",
  137: "Matic"
}

export enum Chain {
  Ethereum,
  Matic,
  Bsc
}

export const baseDecimals = new Map([
  [Chain.Ethereum, 18],
  [Chain.Matic, 6],
  [Chain.Bsc, 18],
])

export const chainNumbers = new Map([
  [Chain.Ethereum, 1],
  [Chain.Matic, 137],
  [Chain.Bsc, 56],
])

export const chains = new Map([
  [1, Chain.Ethereum],
  [137, Chain.Matic],
  [56, Chain.Bsc],
])

export const gardenAddresses = new Map([
  [Chain.Ethereum, "0x2D30Db015b0794C8fB163EeEEc1CB861F3dD17E7"],
  [Chain.Matic, "0x464C82D5fb956422822951cA296EA05E33A5A873"],
  [Chain.Bsc, "0x743Ac5BE16DA070e7c12663D50Ab17A0c13ac4E2"],
])

export interface WalletInfo {
    connector?: AbstractConnector
    name: string
    iconName: string
    description: string
    href: string | null
    color: string
    primary?: true
    mobile?: true
    mobileOnly?: true
  }

  export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
    INJECTED: {
      connector: injected,
      name: "Injected",
      iconName: "arrow-right.svg",
      description: "Injected web3 provider.",
      href: null,
      color: "#010101",
      primary: true
    },
    METAMASK: {
      connector: injected,
      name: "MetaMask",
      iconName: "metamask.png",
      description: "Easy-to-use browser extension.",
      href: null,
      color: "#E8831D"
    },
    WALLET_CONNECT: {
      connector: walletconnect,
      name: "WalletConnect",
      iconName: "walletConnectIcon.svg",
      description: "Connect to Trust Wallet, Rainbow Wallet and more...",
      href: null,
      color: "#4196FC",
      mobile: true
    },
    WALLET_LINK: {
      connector: walletlink,
      name: "Coinbase Wallet",
      iconName: "coinbaseWalletIcon.svg",
      description: "Use Coinbase Wallet app on mobile device",
      href: null,
      color: "#315CF5"
    },
    COINBASE_LINK: {
      name: "Open in Coinbase Wallet",
      iconName: "coinbaseWalletIcon.svg",
      description: "Open in Coinbase Wallet app.",
      href: "https://go.cb-w.com/mtUDhEZPy1",
      color: "#315CF5",
      mobile: true,
      mobileOnly: true
    }
  }

  

export const NetworkContextName = "NETWORK"  


