import { useWeb3React } from "@web3-react/core"
import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import styled from "styled-components"
import FlowersGrid from "../../components/FlowersGrid";
import Loader from "../../components/Loader";
import { serializedPaired } from "../../constants";
import { AppContext } from "../../contexts/AppContext";
import { FlowerInfo } from "../../dtos/FlowerInfo";
import { FlowerService } from "../../services/FlowerService";
import { isAddress, supportedChain } from "../../utils";
import { Option } from "../../components/Button";

const Wrapper = styled.div`
    display: grid;    
    padding: 1em;
    grid-gap: 2em;
    width: 100%;
    justify-items: center;
`

const TabsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 0.25em;
    border-radius: 0.5em;
    background-color: ${({ theme }) => theme.bg1};
`

enum View {
    All,
    Owned
}

export const PairedFlowers = () => {
    const { address } = useParams<{ address: string }>();
    const { account, library, chainId } = useWeb3React();
    const [flowers, setFlowers] = useState<FlowerInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [view, setView] = useState<View>(View.Owned);
    const { chain } = useContext(AppContext);

    useEffect(() => {

        const getAll = async () => {
            if (library && account && chainId && supportedChain(chainId!, chain) && isAddress(address)){
                const service = new FlowerService(library, account!, chain)
                setLoading(true) 
                const lowerCaseAddress = address.toLowerCase();
                if (serializedPaired.has(lowerCaseAddress)){
                    setFlowers(await service.deserializeFlowers(lowerCaseAddress));
                }
                else {
                    const flower = await service.getParentFlower(address);
                    if (flower){
                        setFlowers([flower]);
                    }
                }                
                setLoading(false);
            }
        }

        const getOwned = async () => {
            if (library && account && chainId && supportedChain(chainId!, chain) && isAddress(address)) {
                const service = new FlowerService(library, account!, chain)
                setLoading(true);
                setFlowers(await service.getOwnedFlowers(address, account!));
                setLoading(false);
            }
        }
        if (view === View.Owned) {
            getOwned();
        }
        else {
            getAll();
        }
        

    }, [library, account, chainId, chain, address, view])    

    return (
        account && library && chainId ?
        <Wrapper>
            <TabsWrapper>
                <Option onClick={() => setView(View.All)} active={view === View.All}>Show All</Option>
                <Option onClick={() => setView(View.Owned)} active={view === View.Owned}>Show Owned</Option>
            </TabsWrapper>
             {loading 
                ? <Loader/> 
                : <FlowersGrid data={flowers}/>}
        </Wrapper>
        : null      
    )
}