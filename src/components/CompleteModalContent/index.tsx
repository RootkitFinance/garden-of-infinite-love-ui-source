import { useWeb3React } from '@web3-react/core'
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { getEtherscanLink } from '../../utils'
import { TYPE } from '../../theme'
import { X, CheckCircle } from 'react-feather'
import { AutoColumn, ColumnCenter } from '../Column'
import { ExternalLink } from '../Link'

const Wrapper = styled.div`
  width: 100%;
  padding: 1.5em;
`

export const CloseIcon = styled(X)<{ onClick: () => void }>`
  cursor: pointer;
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 3em 0;
`
const Header = styled.div`
  font-weight: 500;
  word-spacing: 0.1em;
  padding-bottom: 0.5em;
  display: grid;
  grid-template-columns: 1fr auto;
  color: ${({ theme }) => theme.text2}; 
  border-bottom: 1px solid ${({ theme }) => theme.text5}; 
`
export function CompleteModalContent({
    title,
    onDismiss,
    hash
  }: {
    title: string
    onDismiss: () => void
    hash: string | undefined
  }) {
    const theme = useContext(ThemeContext)
    const { chainId } = useWeb3React()
  
    return (
      <Wrapper>
        <Header>
          <span>{title}</span>
          <CloseIcon onClick={onDismiss} />
        </Header>
        <ConfirmedIcon>
          <CheckCircle strokeWidth={0.5} size={90} color={theme.green1} />
        </ConfirmedIcon>
        <AutoColumn gap="100px" justify={'center'}>
          {chainId && hash && (
            <ExternalLink href={getEtherscanLink(chainId, hash, 'transaction')} style={{ marginLeft: '0.125em' }}>
              <TYPE.subHeader>View transaction on Etherscan</TYPE.subHeader>
            </ExternalLink>
          )}
        </AutoColumn>
      </Wrapper>
    )
  }
  