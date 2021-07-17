import React, { createContext, useState, ReactNode } from 'react';
import { useEffect } from 'react';
import { Chain } from '../constants';
import { FlowerInfo } from '../dtos/FlowerInfo';
import { TokenInfo } from '../dtos/TokenInfo';
import { CacheService } from '../services/CacheService';

export interface IAppContextInterface {
    chain: Chain
    setChain: (chain: Chain) => void
    pairedTokens: TokenInfo[]
    flowerTokens: FlowerInfo[]
}

const AppContext = createContext<IAppContextInterface>({
    chain: Chain.Ethereum,
    setChain: (chain: Chain) => {},
    pairedTokens: [],
    flowerTokens: []
});

const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [chain, setChain] = useState<Chain>(Chain.Ethereum); 
    const [pairedTokens, setPairedTokens] = useState<TokenInfo[]>([]);
    const [flowerTokens, setFlowerTokens] = useState<FlowerInfo[]>([]);
    
    useEffect(() => {
        const loadCache = async () => {
            const service = new CacheService(chain);
            setPairedTokens(await service.getParentTokens());
            setFlowerTokens(await service.getFlowerTokens());
        }
        loadCache();
    }, [chain])

    return (
        <AppContext.Provider value={{
            chain: chain, 
            setChain: setChain,
            pairedTokens: pairedTokens,
            flowerTokens: flowerTokens}}>
          {children}
        </AppContext.Provider>
    )
}
  
export { AppContext, AppContextProvider }; 