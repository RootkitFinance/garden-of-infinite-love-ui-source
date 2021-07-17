import React, { useState } from "react"
import styled from "styled-components"
import { ImmutableFlowerInfo } from "../../dtos/ImmutableFlowerInfo"
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
    grid-template-columns:  8em 5em 5em 5em 1fr;
    font-size: 0.825rem;
    color: ${({ theme }) => theme.text2};
    border-bottom: 1px solid ${({ theme }) => theme.text3};
    padding-bottom: 0.5em;
    font-weight: 500;
`

const NumericColumn = styled.span`
    text-align:right;
`

export default function FlowersGrid({data}:{data:ImmutableFlowerInfo[]}) {
    const [flowers, setFlowers] = useState<ImmutableFlowerInfo[]>(data);

    const addPetals = (petals: ImmutableFlowerInfo[]) =>{
        setFlowers(flowers.concat(petals));
    }

    return (
        <Wrapper>
        <Header>
            <span>Address</span>
            <NumericColumn>Burn Rate</NumericColumn>
            <NumericColumn>Up %</NumericColumn>
            <NumericColumn>Up Delay</NumericColumn>          
        </Header>
        {flowers?.map(x => <FlowerRow key={x.address} flowerInfo={x} addPetals={addPetals}/>)}
        </Wrapper>
    )
}