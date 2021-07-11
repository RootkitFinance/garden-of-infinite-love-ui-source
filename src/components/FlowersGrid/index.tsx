import React, { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { FlowerInfo } from "../../dtos/FlowerInfo"
import { FlowerRow } from "./FlowerRow"

const Wrapper = styled.div`
    display: grid;
    grid-gap: 0.5em;
    padding: 1em 0.25em 0.25em 0.25em;
    overflow-y: auto;
    background: ${({ theme }) => theme.bg1};
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 8px 12px rgba(0, 0, 0, 0.04),
    0px 12px 16px rgba(0, 0, 0, 0.01);
    border-radius: 1.25em;
    color: ${({ theme }) => theme.text2};
    padding: 1em;
`

const Header = styled.div`
    display: grid;
    grid-gap: 1.5em;
    grid-template-columns: 8em 12em 15em 10em 5em 3em 5em 3em 8em 8em 8em;
    font-size: 0.825rem;
    color: ${({ theme }) => theme.text2};
    border-bottom: 1px solid ${({ theme }) => theme.text4};
    padding-bottom: 0.5em;
    font-weight: 500;
`

const NumericColumn = styled.span`
    text-align:right;
`

export default function FlowersGrid({flower}:{flower:FlowerInfo| undefined}) {
    const [flowers, setFlowers] = useState<FlowerInfo[]>([]);

    useEffect(() => {
        if(flower){
            setFlowers([flower!]);
        }
    },[flower])

    const addPetals = (petals: FlowerInfo[]) =>{
        setFlowers(flowers.concat(petals));
    }

    return (
        <Wrapper>
        <Header>
            <span>Address</span>
            <NumericColumn>Price</NumericColumn>
            <NumericColumn>Total Supply</NumericColumn>
            <NumericColumn>Paired Balance</NumericColumn>
            <NumericColumn>Burn Rate</NumericColumn>
            <NumericColumn>Up %</NumericColumn>
            <NumericColumn>Up Delay</NumericColumn>
            <NumericColumn>Petals</NumericColumn>
            <span>Owner</span>
            <span>Owner 2</span>
            <span>Owner 3</span>
        </Header>
        {flowers?.map(x => <FlowerRow key={x.address} flowerInfo={x} addPetals={addPetals}/>)}
        </Wrapper>
    )
}