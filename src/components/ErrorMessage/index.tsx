import { transparentize } from 'polished'
import React from 'react'
import { AlertTriangle } from 'react-feather'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: ${({ theme }) => transparentize(0.9, theme.red1)};
  border-radius: 1em;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1rem;
  align-items: center;
  font-size: 0.825em;
  width: 100%;
  padding: 0.25em 1em;
  color: ${({ theme }) => theme.red1}; 
`

export function ErrorMessage({ error }: { error: string }) {
  return (
    <Wrapper>
     <AlertTriangle size={24} />
      <p>{error}</p>
    </Wrapper>
  )
}