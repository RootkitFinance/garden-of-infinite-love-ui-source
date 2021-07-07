import React from 'react'
import styled from 'styled-components'
import { CardProps, Text } from 'rebass'
import { Box } from 'rebass/styled-components'

const Card = styled(Box)<{ padding?: string; border?: string; borderRadius?: string }>`
  width: 100%;
  border-radius: 16px;
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`
export default Card

export const LightCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`

export const GreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.bg3};
`

export const OutlineCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.bg3};
`

export const YellowCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.yellow2};
  background-color: rgba(243, 132, 30, 0.1);
  color: ${({ theme }) => theme.yellow2};
  font-weight: 500;
`

export const PinkCard = styled(Card)`
  background-color: rgba(255, 0, 122, 0.03);
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;
`

const BlueCardStyled = styled(Card)`
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.primary1};
  border-radius: 12px;
  width: fit-content;
`

export const SemiTransparentCard = styled(LightCard)<{ disabled?: boolean }>`
  display: grid;
  background-color: rgba(44, 47, 54, 0.8);
  border: 1px solid ${({ theme }) => theme.bg3};
  color: ${({ theme, disabled }) => (disabled ? theme.bg5 : theme.text2)};
  width: 26em;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      width: 22em;
      font-size: 0.875em;
  `};
`

export const PrimaryCard = styled(LightCard)<{ width?: string, smallWidth?: string }>`
  display: grid;
  background: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 8px 12px rgba(0, 0, 0, 0.04),
    0px 12px 16px rgba(0, 0, 0, 0.01);
  border-radius: 30px;
  padding: 1rem 1.5em;
  color: ${({ theme }) => theme.text2};
  width: ${({ width }) => (width ? width : "24em;")};
  ${({ theme, smallWidth }) => theme.mediaWidth.upToExtraSmall`
      width: ${(smallWidth ? smallWidth : "24em;")};
      font-size: 0.875em;
  `};
`

export const BlueCard = ({ children, ...rest }: CardProps) => {
  return (
    <BlueCardStyled {...rest}>
      <Text fontWeight={500} color="#2172E5">
        {children}
      </Text>
    </BlueCardStyled>
  )
}
