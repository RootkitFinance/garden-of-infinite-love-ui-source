import React from "react"
import styled from "styled-components"

const TextWrapper = styled.div`
    font-size: 1.5em;
    text-align: center;
`
export const Title = ({text}:{text:string}) =>{
    return (<TextWrapper>{text}</TextWrapper>)
}