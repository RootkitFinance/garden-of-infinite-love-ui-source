import React, { useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled, { ThemeContext } from 'styled-components'
import { getEtherscanLabel, getEtherscanLink } from '../../utils'
import { X, CheckCircle } from 'react-feather'
import { AutoColumn, ColumnCenter } from '../Column'
import { ExternalLink } from '../Link'
import Modal from "../Modal"

const Wrapper = styled.div`
  width: 100%;
  padding: 1.5em;
`
export const CloseIcon = styled(X) <{ onClick: () => void }>`
  cursor: pointer;
`
const IconWrapper = styled(ColumnCenter)`
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

const TransactionCompletedModal = ({ title, hash, isOpen, onDismiss }: { title: string, hash: string, isOpen: boolean, onDismiss: () => void }) => {
    const theme = useContext(ThemeContext)
    const { chainId } = useWeb3React()

    return (
        <Modal isOpen={isOpen} onDismiss={onDismiss}>
            <Wrapper>
                <Header>
                    <span>{title}</span>
                    <CloseIcon onClick={onDismiss} />
                </Header>
                <IconWrapper>
                    <CheckCircle strokeWidth={0.5} size={90} color={theme.primary1} />
                </IconWrapper>
                <AutoColumn gap="100px" justify={'center'}>
                    {chainId && hash && (
                        <ExternalLink href={getEtherscanLink(chainId, hash, 'transaction')} style={{ marginLeft: '0.125em' }}>
                            <span>{getEtherscanLabel(chainId)}</span>
                        </ExternalLink>
                    )}
                </AutoColumn>
            </Wrapper>
        </Modal>)
}

export default TransactionCompletedModal