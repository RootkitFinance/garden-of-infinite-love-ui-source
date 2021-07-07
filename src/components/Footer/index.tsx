import React from "react"
import styled from "styled-components"
import { ExternalLink } from "../Link"

const FooterFrame = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  width: 100%;
  bottom: 0;
  position: relative;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  height: 3em;
`

const LinksWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1em;
  align-items: center;
  justify-items: center;
  
`

export const Footer = () => {
    return (
    <FooterFrame>
        <LinksWrapper>
         <ExternalLink href="https://github.com/">Github</ExternalLink>
         <ExternalLink href="https://twitter.com/">Twitter</ExternalLink>
         <ExternalLink href="https://medium.com/">Medium</ExternalLink>
        </LinksWrapper>
    </FooterFrame>)
}