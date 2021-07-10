import { useWeb3React } from "@web3-react/core"
import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import styled from "styled-components"
import { Flower } from "../../components/Flower";
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

const Section = styled.div`
    background: ${({ theme }) => theme.bg1};
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 8px 12px rgba(0, 0, 0, 0.04),
    0px 12px 16px rgba(0, 0, 0, 0.01);
    border-radius: 1.25em;
    color: ${({ theme }) => theme.text2};
    padding: 1em;
    width:26em;
`

const SectionHeader = styled.div`
    padding: 0 0.25em 0.15em 0.1em;
    color: ${({ theme }) => theme.text3};
    border-bottom: 1px solid ${({ theme }) => theme.text3};
    text-transform: uppercase;
`

const FlowersList = styled.div`
    display: grid;
    grid-gap: 0.5em;
    padding: 1em 0.25em 0.25em 0.25em;
`

export const PairedFlowers = () => {
    const { paired } = useParams<{ paired: string }>();
    const { account, library, chainId } = useWeb3React();
    const [flowers, setFlowers] = useState<FlowerInfo[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const { chain } = useContext(ControlCenterContext);

    useEffect(() => {

        const getBalances = async () => {
            if (library && account && chainId && supportedChain(chainId!, chain) && isAddress(paired)){
                const service = new FlowerService(library, account!, chain)
                setLoading(true) 
                setFlowers(await service.getFlowers(paired))
                setLoading(false)
            }
        }

        getBalances();

    }, [library, account, chainId, chain])

    return (
        account && library && chainId ?
        <Wrapper>
            <Section>
                <SectionHeader>Flowers</SectionHeader>
                {loading 
                ? <Loader/> 
                : <FlowersList>{flowers?.map(x => <Flower key={x.address} flowerInfo={x}/>)}</FlowersList> }
                            
            </Section>
        </Wrapper>
        : null      
    )
}