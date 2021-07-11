import { useWeb3React } from "@web3-react/core"
import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import styled from "styled-components"
import FlowersGrid from "../../components/FlowersGrid";
import Loader from "../../components/Loader";
import { ControlCenterContext } from "../../contexts/ControlCenterContext";
import { FlowerInfo } from "../../dtos/FlowerInfo";
import { FlowerService } from "../../services/FlowerService";
import { isAddress, supportedChain } from "../../utils";

const Wrapper = styled.div`
    display: grid;    
    padding: 1em;
    grid-gap: 2em;
    width: 100%;
    justify-items: center;
`
export const PairedFlowers = () => {
    const { address } = useParams<{ address: string }>();
    const { account, library, chainId } = useWeb3React();
    const [flower, setFlower] = useState<FlowerInfo|undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const { chain } = useContext(ControlCenterContext);

    useEffect(() => {

        const getBalances = async () => {
            if (library && account && chainId && supportedChain(chainId!, chain) && isAddress(address)){
                const service = new FlowerService(library, account!, chain)
                setLoading(true) 
                setFlower(await service.getParentFlower(address))
                setLoading(false)
            }
        }

        getBalances();

    }, [library, account, chainId, chain, address])

    return (
        account && library && chainId ?
        <Wrapper>
             {loading 
                ? <Loader/> 
                : <FlowersGrid flower={flower}/>}
        </Wrapper>
        : null      
    )
}