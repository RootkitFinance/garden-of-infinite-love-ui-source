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

export const ROOTToken = new TokenInfo("ROOT", "0xcb5f72d37685c3d5ad0bb5f982443bc8fcdf570e");
export const WETHToken = new TokenInfo("WETH", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
export const iFUNDToken = new TokenInfo("iFUND", "0x04b5e13000c6e9a3255dc057091f3e3eeee7b0f0");
export const SUSHIToken = new TokenInfo("SUSHI", "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2");
//export const xSUSHIToken = new TokenInfo("xSUSHI", "0x8798249c2e607446efb7ad49ec89dd1865ff4272");
export const EVNToken = new TokenInfo("EVN", "0x9af15d7b8776fa296019979e70a5be53c714a7ec");
export const aaveToken = new TokenInfo("AAVE", "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9");
export const compToken = new TokenInfo("COMP", "0xc00e94cb662c3520282e6f5717214004a7f26888");
export const uniToken = new TokenInfo("UNI", "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984");
export const usdcToken = new TokenInfo("USDC", "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48");
export const oneInchToken = new TokenInfo("1inch", "0x111111111117dc0aa78b770fa6a738034120c302");
//export const SDTToken = new TokenInfo("SDT", "0x73968b9a57c6e53d41345fd57a6e6ae27d6cdb2f");
export const BadgerToken = new TokenInfo("BADGER", "0x3472a5a71965499acd81997a54bba8d852c6e53d");
//export const BALToken = new TokenInfo("BAL", "0xba100000625a3754423978a60c9317c58a424e3d");
//export const PolygonToken = new TokenInfo("POLYGON", "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0");
//export const RARIToken = new TokenInfo("RARI", "0xfca59cd816ab1ead66534d82bc21e7515ce441cf");
//export const RGTToken = new TokenInfo("RGT", "0xd291e7a03283640fdc51b121ac401383a46cc623");
//export const KNCToken = new TokenInfo("KNC", "0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202");
//export const wNXMToken = new TokenInfo("wNXM", "0x0d438f3b5175bebc262bf23753c1e53d03432bde");
//export const GRTToken = new TokenInfo("GRT", "0xc944e90c64b2c07662a292be6244bdf05cda44a7");
//export const LUSDToken = new TokenInfo("LUSD", "0x5f98805a4e8be255a32880fdec7f6728c6568ba0");
//export const MPHToken = new TokenInfo("MPH", "0x8888801af4d980682e47f1a9036e589479e835c5");
//export const UMAToken = new TokenInfo("UMA", "0x04fa0d235c4abf4bcf4787af4cf447de572ef828");
//export const MLNToken = new TokenInfo("MLN", "0xec67005c4e498ec7f55e092bd1d35cbc47c91892");
//export const PLRToken = new TokenInfo("PLR", "0xe3818504c1b32bf1557b16c238b2e01fd3149c17");
export const LINKToken = new TokenInfo("LINK", "0x514910771af9ca656af840dff83e8264ecf986ca");
//export const TRBToken = new TokenInfo("TRB", "0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0");
//export const INSTToken = new TokenInfo("INST", "0x6f40d4a6237c257fff2db00fa0510deeecd303eb");
//export const DATAToken = new TokenInfo("DATA", "0x0cf0ee63788a0849fe5297f3407f701e122cc023");
//export const CQTToken = new TokenInfo("CQT", "0xd417144312dbf50465b1c641d016962017ef6240");
//export const AKROToken = new TokenInfo("AKRO", "0x8ab7404063ec4dbcfd4598215992dc3f8ec853d7");
//export const UMBToken = new TokenInfo("UMB", "0x6fc13eace26590b80cccab1ba5d51890577d83b2");
//export const IDLEToken = new TokenInfo("IDLE", "0x875773784af8135ea0ef43b5a374aad105c5d39e");
//export const QSPToken = new TokenInfo("QSP", "0x99ea4db9ee77acd40b119bd1dc4e33e1c070b80d");
//export const HEZToken = new TokenInfo("HEZ", "0xeef9f339514298c6a857efcfc1a762af84438dee");
export const wBTCToken = new TokenInfo("wBTC", "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599");
//export const hBTCToken = new TokenInfo("hBTC", "0x0316eb71485b0ab14103307bf65a021042c6d380");
//export const renBTCToken = new TokenInfo("renBTC", "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d");
//export const PAXToken = new TokenInfo("PAX", "0x8e870d67f660d95d5be530380d0ec0bd388289e1");
//export const hUSDToken = new TokenInfo("hUSD", "0xdf574c24545e5ffecb9a659c229253d4111d87e1");
export const DAIToken = new TokenInfo("DAI", "0x6b175474e89094c44da98b954eedeac495271d0f");
//export const TUSDToken = new TokenInfo("TUSD", "0x0000000000085d4780b73119b644ae5ecd22b376");
//export const USDNToken = new TokenInfo("USDN", "0x674c6ad92fd080e4004b2312b45f796a192d27a0");
//export const USDPToken = new TokenInfo("USDP", "0x1456688345527be1f37e9e627da0837d6f08c925");
//export const GUSDToken = new TokenInfo("GUSD", "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd");
//export const ALUSDToken = new TokenInfo("ALUSD", "0xbc6da0fe9ad5f3b0d58160288917aa56653660e9");
//export const USTToken = new TokenInfo("UST", "0xa47c8bf37f92abed4a126bda807a7b7498661acd");
//export const MKRToken = new TokenInfo("MKR", "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2");
//export const SHIBToken = new TokenInfo("SHIB", "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce");
//export const WAVESToken = new TokenInfo("WAVES", "0x1cf4592ebffd730c7dc92c1bdffdfc3b9efcf29a");
//export const CHZToken = new TokenInfo("CHZ", "0x3506424f91fd33084466f402d5d97f05f8e3b4af");
//export const YFIToken = new TokenInfo("YFI", "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e");
//export const QNTToken = new TokenInfo("QNT", "0x4a220e6096b25eadb88358cb44068a3248254675");
//export const TELToken = new TokenInfo("TEL", "0x467bccd9d29f223bce8043b84e8c8b282827790f");
//export const HOTToken = new TokenInfo("HOT", "0x6c6ee5e31d828de241282b9606c8e98ea48526e2");
//export const stETHToken = new TokenInfo("stETH", "0xae7ab96520de3a18e5e111b5eaab095312d7fe84");
//export const SNXToken = new TokenInfo("SNX", "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f");
//export const ENJToken = new TokenInfo("ENJ", "0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c");
//export const BATToken = new TokenInfo("BAT", "0x0d8775f648430679a709e98d2b0cb6250d2887ef");
//export const NEXOToken = new TokenInfo("NEXO", "0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206");
//export const MANAToken = new TokenInfo("MANA", "0x0f5d2fb29fb7d3cfee444a200298f468908cc942");
//export const BNTToken = new TokenInfo("BNT", "0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c");
//export const FTMToken = new TokenInfo("FTM", "0x4e15361fd6b4bb609fa63c81a2be19d873717870");
//export const UOSToken = new TokenInfo("UOS", "0xd13c7342e1ef687c5ad21b27c2b65d772cab5c8c");
//export const cUSDCToken = new TokenInfo("cUSDC", "0x39aa39c021dfbae8fac545936693ac917d5e7563");
//export const cDAIToken = new TokenInfo("cDAI", "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643");
//export const cETHToken = new TokenInfo("cETH", "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5");
//export const cUSDTToken = new TokenInfo("cUSDT", "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9");
//export const cUNIToken = new TokenInfo("cUNI", "0x35a18000230da775cac24873d00ff85bccded550");


export const bUpToken = new TokenInfo("upBNB", "0x1759254EB142bcF0175347D5A0f3c19235538a9A");
export const bxUpToken = new TokenInfo("xUpBNB", "0x49Ba5c83F151F8f786CF2623243b66dC42492d41");
export const bwBNToken = new TokenInfo("wBNB", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c");
//export const bBBTToken = new TokenInfo("BBTC", "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c");
//export const bETHToken = new TokenInfo("ETH", "0x2170ed0880ac9a755fd29b2688956bd959f933f8");
//export const bUSDToken = new TokenInfo("USD", "0x55d398326f99059ff775485246999027b3197955");
//export const bLINToken = new TokenInfo("LINK", "0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd");
//export const bDOTToken = new TokenInfo("DOT", "0x7083609fce4d1d8dc0c979aab8c869ea2c873402");
//export const bLTCToken = new TokenInfo("LTC", "0x4338665cbb7b2485a8855a139b75d5e34ab0db94");
//export const bFILToken = new TokenInfo("FIL", "0x0d8ce2a99bb6e3b7db580ed848240e4a0f9ae153");
//export const bNEAToken = new TokenInfo("NEAR", "0x1fa4a73a3f0133f0025378af00236f3abdee5d63");
//export const bADAToken = new TokenInfo("ADA", "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47");
//export const bBUSToken = new TokenInfo("BUSD", "0xe9e7cea3dedca5984780bafc599bd69add087d56");
//export const bUSDCoken = new TokenInfo("USDC", "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d");
//export const bXTZToken = new TokenInfo("XTZ", "0x16939ef78684453bfdfb47825f8a5f714f12623a");
//export const bATOToken = new TokenInfo("ATOM", "0x0eb3a705fc54725037cc9e008bdede697f62f335");
//export const bDAIToken = new TokenInfo("DAI", "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3");
//export const bUNIToken = new TokenInfo("UNI", "0xbf5140a22578168fd562dccf235e5d43a02ce9b1");
//export const bZECToken = new TokenInfo("ZEC", "0x1ba42e5193dfa8b03d15dd1b86a3113bbbef8eeb");
//export const bMKRToken = new TokenInfo("MKR", "0x5f0da599bb2cccfcf6fdfd7d81743b6020864350");
//export const bYFIToken = new TokenInfo("YFI", "0x88f1a5ae2a3bf98aeaf342d26b30a79438c9142e");
//export const bSNXToken = new TokenInfo("SNX", "0x9ac983826058b8a9c7aa1c9171441191232e8404");
//export const bCOMToken = new TokenInfo("COMP", "0x52ce071bd9b1c4b00a0b92d298c512478cad67e8");
//export const bONTToken = new TokenInfo("ONT", "0xfd7b3a77848f1c2d67e05e54d78d174a0c850335");
//export const bBATToken = new TokenInfo("BAT", "0x101d82428437127bf1608f699cd651e6abf9766e");
//export const bPAXToken = new TokenInfo("PAX", "0xb7f8cd00c5a06c0537e2abff0b58033d02e5e094");
//export const bBANToken = new TokenInfo("BAND", "0xad6caeb32cd2c308980a548bd0bc5aa4306c6c18");
//export const bYFIIToken = new TokenInfo("YFII", "0x7f70642d88cf1c4a3a7abb072b53b929b653eda5");
//export const bEGLToken = new TokenInfo("EGLD", "0xbf7c81fff98bbe61b40ed186e4afd6ddd01337fe");
//export const bETCToken = new TokenInfo("ETC", "0x3d6545b08693dae087e957cb1180ee38b9e3c25e");
//export const bPAXGToken = new TokenInfo("PAXG", "0x7950865a9140cb519342433146ed5b40c6f210f7");
//export const bELFToken = new TokenInfo("ELF", "0xa3f020a5c92e15be13caf0ee5c95cf79585eecc9");
//export const bTCTToken = new TokenInfo("TCT", "0xca0a9df6a8cad800046c1ddc5755810718b65c44");
//export const bINJToken = new TokenInfo("INJ", "0xa2b726b1145a4773f68593cf171187d8ebe4d495");
//export const bBELToken = new TokenInfo("BEL", "0x8443f091997f06a61670b735ed92734f5628692f");
//export const bSUSToken = new TokenInfo("SUSHI", "0x947950bcc74888a40ffa2593c5798f11fc9124c4");

export const mupUToken = new TokenInfo("upUSDT", "0xCb5f72d37685C3D5aD0bB5F982443BC8FcdF570E");
//export const mxUpToken = new TokenInfo("xUpUSDT", "0xc328f44ecaCE72cdeBc3e8E86E6705604BE2d2e1");
export const mDAIToken1 = new TokenInfo("DAI 1", "0x84000b263080BC37D1DD73A29D92794A6CF1564e");
export const mWETHToken1 = new TokenInfo("WETH 1", "0x8cc8538d60901d19692F5ba22684732Bc28F54A3");
export const mWETHToken2 = new TokenInfo("WETH 2", "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619");
export const mUSDCToken = new TokenInfo("USDC", "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174");
//export const mCOMToken = new TokenInfo("COMP", "0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c");
//export const mLENToken = new TokenInfo("LEND", "0x313d009888329C9d1cf4f75CA3f32566335bd604");
//export const mYFIToken = new TokenInfo("YFI", "0xDA537104D6A5edd53c6fBba9A898708E465260b6");
//export const mUSDTToken = new TokenInfo("USD", "0xc2132D05D31c914a87C6611C10748AEb04B58e8F");
export const mDAIToken2 = new TokenInfo("DAI 2", "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063");
//export const mBUSToken = new TokenInfo("BUSD", "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7");
//export const mMANToken = new TokenInfo("MANA", "0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4");
//export const mWBTToken = new TokenInfo("WBTC", "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6");
//export const m0xBToken = new TokenInfo("0xBTC", "0x71B821aa52a49F32EEd535fCA6Eb5aa130085978");
//export const mKIWToken = new TokenInfo("KIWI", "0x578360AdF0BbB2F10ec9cEC7EF89Ef495511ED5f");
//export const mDUSToken = new TokenInfo("DUST", "0x556f501CF8a43216Df5bc9cC57Eb04D4FFAA9e6D");
//export const mSPNToken = new TokenInfo("SPN", "0xeAb9Cfb094db203e6035c2e7268A86DEbeD5BD14");
//export const maavToken = new TokenInfo("aave", "0xd6df932a45c0f255f85145f286ea0b292b21c90b");
//export const mSUSToken = new TokenInfo("SUSHI", "0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a");
export const mwMAToken = new TokenInfo("wMATIC", "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270");
export const mQUIToken = new TokenInfo("QUICK", "0x831753dd7087cac61ab5644b308642cc1c33dc13");

export const pairedTokens = new Map([
  [Chain.Ethereum, [
    ROOTToken,
    WETHToken,
    iFUNDToken,
    SUSHIToken,
    //xSUSHIToken,
    EVNToken,
    aaveToken,
    compToken,
    uniToken,
    usdcToken,
    oneInchToken,
    //SDTToken,
    BadgerToken,
    //BALToken,
    //PolygonToken,
    //RARIToken,
    //RGTToken,
    //KNCToken,
    //wNXMToken,
    //GRTToken,
    //LUSDToken,
    //MPHToken,
    //UMAToken,
    //MLNToken,
    //PLRToken,
    LINKToken,
    //TRBToken,
    //INSTToken,
    //DATAToken,
    //CQTToken,
    //AKROToken,
    //UMBToken,
    //IDLEToken,
    //QSPToken,
    //HEZToken,
    wBTCToken,
    //hBTCToken,
    //renBTCToken,
    //PAXToken,
    //hUSDToken,
    DAIToken
    //TUSDToken,
    //USDNToken,
    //USDPToken,
    //GUSDToken,
    //ALUSDToken,
    //USTToken,
    //MKRToken,
    //SHIBToken,
    //WAVESToken,
    //CHZToken,
    //YFIToken,
    //QNTToken,
    //TELToken,
    //HOTToken,
    //stETHToken,
    //SNXToken,
    //ENJToken,
    //BATToken,
    //NEXOToken,
    //MANAToken,
    //BNTToken,
    //FTMToken,
    //UOSToken,
    //cUSDCToken,
    //cDAIToken,
    //cETHToken,
    //cUSDTToken,
    //cUNIToken
    ]],
  [Chain.Matic, [
    mupUToken,
    //mxUpToken,
    mDAIToken1,
    mWETHToken1,
    mWETHToken2,
    mUSDCToken,
    //mCOMToken,
    //mLENToken,
    //mYFIToken,
    //mUSDTToken,
    mDAIToken2,
    //mBUSToken,
    //mMANToken,
    //mWBTToken,
    //m0xBToken,
    //mKIWToken,
    //mDUSToken,
    //mSPNToken,
    //maavToken,
    //mSUSToken,
    mwMAToken,
    mQUIToken
  ]],
  [Chain.Bsc, [
    bUpToken,
    bxUpToken,
    bwBNToken,
    //bBBTToken,
    //bETHToken,
    //bUSDToken,
    //bLINToken,
    //bDOTToken,
    //bLTCToken,
    //bFILToken,
    //bNEAToken,
    //bADAToken,
    //bBUSToken,
    //bUSDCoken,
    //bXTZToken,
    //bATOToken,
    //bDAIToken,
    //bUNIToken,
    //bZECToken,
    //bMKRToken,
    //bYFIToken,
    //bSNXToken,
    //bCOMToken,
    //bONTToken,
    //bBATToken,
    //bPAXToken,
    //bBANToken,
    //bYFIIToken,
    //bEGLToken,
    //bETCToken,
    //bPAXGToken,
    //bELFToken,
    //bTCTToken,
    //bINJToken,
    //bBELToken,
    //bSUSToken
  ]]
])

