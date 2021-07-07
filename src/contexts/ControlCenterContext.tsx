import React, { createContext, useState, ReactNode } from 'react';
import { Chain } from '../constants';

export interface IControlCenterContextInterface {
    chain: Chain
    setChain: (chain: Chain) => void
}

const ControlCenterContext = createContext<IControlCenterContextInterface>({
    chain: Chain.Ethereum,
    setChain: (chain: Chain) => {}
});

const ControlCenterProvider = ({ children }: { children: ReactNode }) => {
    const [chain, setChain] = useState<Chain>(Chain.Ethereum); 
    return (
        <ControlCenterContext.Provider value={{
            chain: chain, 
            setChain: setChain}}>
          {children}
        </ControlCenterContext.Provider>
    )
}
  
export { ControlCenterContext, ControlCenterProvider }; 