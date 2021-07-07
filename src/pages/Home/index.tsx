import { useWeb3React } from "@web3-react/core"
import React from "react"
import styled from "styled-components"
import TokenList from "../../components/TokenList"

const Wrapper = styled.div`
    display: grid;    
    padding: 1em;
    grid-gap: 1em;
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
    width:20em;
`

const SectionHeader = styled.div`
    padding: 0 0.25em 0.15em 0.1em;
    color: ${({ theme }) => theme.text3};
    border-bottom: 1px solid ${({ theme }) => theme.text3};
    text-transform: uppercase;
`

export const Home = () => {
    const { account, library, chainId } = useWeb3React()
    return (
        account && library && chainId ?
        <Wrapper>
            <Section>
                <SectionHeader>Token List</SectionHeader>
                <TokenList/>              
            </Section>
        </Wrapper>
        : null      
    )
}