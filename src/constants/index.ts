import { AbstractConnector } from "@web3-react/abstract-connector"
import { injected, walletconnect, walletlink } from "../connectors"

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

export const startBlocks = new Map([
  [Chain.Ethereum, 12792128],
  [Chain.Matic, 16666316],
  [Chain.Bsc, 9000659],
])

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

  export const SUPPORTED_NETWORKS: {
    [chain in Chain]?: {
      chainId: string
      chainName: string
      nativeCurrency: {
        name: string
        symbol: string
        decimals: number
      }
      rpcUrls: string[]
      blockExplorerUrls: string[]
    }
  } = {
    [Chain.Ethereum]: {
      chainId: '0x1',
      chainName: 'Ethereum',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://mainnet.infura.io/v3'],
      blockExplorerUrls: ['https://etherscan.com'],
    },
    [Chain.Bsc]: {
      chainId: '0x38',
      chainName: 'Binance Smart Chain',
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://bsc-dataseed.binance.org'],
      blockExplorerUrls: ['https://bscscan.com'],
    },
    [Chain.Matic]: {
      chainId: '0x89',
      chainName: 'Matic',
      nativeCurrency: {
        name: 'Matic',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://rpc-mainnet.maticvigil.com'],
      blockExplorerUrls: ['https://polygonscan.com/'],
    }
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

export const serializedPaired = new Set(["0x1759254eb142bcf0175347d5a0f3c19235538a9a", "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", "0xe9e7cea3dedca5984780bafc599bd69add087d56"]) 

export const NetworkContextName = "NETWORK"  
export const DEPLOYER_ADDRESS = '0x804CC8D469483d202c69752ce0304F71ae14ABdf'


