import styled from 'styled-components'
import { Button as RebassButton } from 'rebass/styled-components'
import { darken } from 'polished'
import React from 'react'
import { AutoRow } from '../Row'
import Loader from '../Loader'

const Base = styled(RebassButton)<{
  padding?: string
  width?: string
  borderRadius?: string
  altDisabledStyle?: boolean
}>`
  padding: ${({ padding }) => (padding ? padding : '0.875em;')};
  width: ${({ width }) => (width ? width : '100%')};
  font-weight: 500;
  text-align: center;
  border-radius: 0.75em;
  font-size: 0.875em;
  border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
  outline: none;
  border: 1px solid transparent;
  color: ${({ theme }) => (theme.text2)};
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:disabled {
    cursor: auto;
  }

  > * {
    user-select: none;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
  font-size: 0.75em;
`};
`

// A button that triggers some onClick result, but looks like a link.
export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
  border: none;
  text-decoration: none;
  background: none;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme, disabled }) => (disabled ? theme.text2 : theme.primary1)};
  font-weight: 500;

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :active {
    text-decoration: none;
  }
`

export const ButtonPrimary = styled(Base)`
  background-color: ${({ theme }) => darken(0.15, theme.primary1)};
  word-spacing: 0.25em;
  letter-spacing: 0.025em;

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.2, theme.primary1)};
    background-color: ${({ theme }) => darken(0.2, theme.primary1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.2, theme.primary1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.2, theme.primary1)};
    background-color: ${({ theme }) => darken(0.2, theme.primary1)};
  }
  &:disabled {
    background-color: ${({ theme, altDisabledStyle }) => (altDisabledStyle ? darken(0.15, theme.primary1) : theme.bg3)};
    color: ${({ theme, altDisabledStyle }) => (altDisabledStyle ? 'white' : theme.text3)};
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
    opacity: ${({ altDisabledStyle }) => (altDisabledStyle ? '0.7' : '1')};
  }
`

export const ButtonPrimaryGreen = styled(ButtonPrimary)`
  background-color: ${({ theme }) => darken(0.15, theme.green1)};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.2, theme.green1)};
    background-color: ${({ theme }) => darken(0.2, theme.green1)};
  }

  &:hover {
    background-color: ${({ theme }) => darken(0.2, theme.green1)};
  }

  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.2, theme.green1)};
    background-color: ${({ theme }) => darken(0.2, theme.green1)};
  }

  &:disabled {
    background-color: ${({ theme, altDisabledStyle }) => (altDisabledStyle ? darken(0.15, theme.green1) : theme.bg3)};
  }`

export const ButtonPrimaryRed = styled(ButtonPrimary)`
  background-color: ${({ theme }) => darken(0.15, theme.red1)};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.2, theme.red1)};
    background-color: ${({ theme }) => darken(0.2, theme.red1)};
  }

  &:hover {
    background-color: ${({ theme }) => darken(0.2, theme.red1)};
  }

  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.2, theme.red1)};
    background-color: ${({ theme }) => darken(0.2, theme.red1)};
  }

  &:disabled {
    background-color: ${({ theme, altDisabledStyle }) => (altDisabledStyle ? darken(0.2, theme.red1) : theme.bg3)};
  }
`

export const ButtonSecondary = styled(Base)`
  border: 1px solid ${({ theme }) => theme.primary4};
  color: ${({ theme }) => theme.primary1};
  background-color: transparent;
  font-size: 16px;
  border-radius: 12px;
  padding: ${({ padding }) => (padding ? padding : '10px')};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => theme.primary4};
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => theme.primary4};
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
  a:hover {
    text-decoration: none;
  }
`

export const Option = styled.button<{ active: boolean }>`
  align-items: center;
  height: 2em;
  border-radius: 0.5em;
  font-size: 1em;
  min-width: 5em;
  border: 1px solid ${({ theme }) => theme.bg3};
  outline: none;
  cursor: pointer;
  :hover {
    border: 1px solid ${({ theme }) => theme.bg4};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
  }

  background-color: ${({ active, theme }) => (active ? theme.primary1 : theme.bg2)};
  color: ${({ active, theme }) => (active ? theme.white : theme.text1)};

`

export const PendingContent = ({text} : {text:string}) =>{

  return(
    <AutoRow gap="0.5em" justify="center">
       {text}
      <Loader stroke="white" />
    </AutoRow>
  )
}