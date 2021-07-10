import { useWeb3React } from "@web3-react/core"
import { darken } from "polished"
import React, { useContext, useState } from "react"
import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { ControlCenterContext } from "../../contexts/ControlCenterContext"
import { TokenInfo } from "../../dtos/TokenInfo"
import { GardenService } from "../../services/GardenService"

const Wrapper = styled.div`
    display: grid;
    grid-gap: 0.5em;
    padding: 1em 0.25em 0.25em 0.25em;
    max-height: 41em;
    overflow-y: auto;
`
const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
    activeClassName
  })`
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: left;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    color: ${({ theme }) => theme.text2};
    font-size: 1rem;
    width: 100%;
    padding: 1em;
    font-weight: 500;
    text-transform: uppercase;
    background-color:${({ theme }) => darken(0.1, theme.bg3)};
    border-radius: 1em;
  
    &.${activeClassName} {
      border-radius: 12px;
      font-weight: 600;
      color: ${({ theme }) => theme.text1};
    }
  
    :hover,
    :focus {
      color: ${({ theme }) => darken(0.1, theme.text1)};
      background-color:${({ theme }) => theme.bg3};
    }
  `

export default function TokenList()
{   
    const { account, library, chainId } = useWeb3React();
    const { chain } = useContext(ControlCenterContext);
    const [tokens, setTokens] = useState<TokenInfo[]>();

    useEffect(()=>{
      const getTokens = async () => {
        const service = new GardenService(library, account!, chain);
        setTokens(await service.getParentTokens());
      }
      getTokens();
      
    },[chainId, chain, library, account])
    return (
        <Wrapper>
            {tokens?.map(x => (<StyledNavLink key={x.address} exact={true} to={`/${x.address}`}>{x.symbol}</StyledNavLink>)) }
        </Wrapper>
    )
}