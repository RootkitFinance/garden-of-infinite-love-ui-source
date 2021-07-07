import React from 'react'
import styled from 'styled-components'
import useCopyClipboard from '../../hooks/useCopyClipboard'
import { CheckCircle, Copy } from 'react-feather'
import { LinkStyledButton } from '../Button'

const CopyIcon = styled(LinkStyledButton)<{ color?: string }>`
  color: ${({ theme, color }) => color ? color: theme.text2};
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  font-size: 0.875rem;
  :hover
  {
    text-decoration: none;
    color: ${({ theme, color }) => color ? theme.text2: theme.text1};
  }
`
const TransactionStatusText = styled.span`
  margin-left: 0.25rem;
  font-size: 0.875rem;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
`

export default function CopyHelper(props: { toCopy: string; children?: React.ReactNode; color?: string }) {
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <CopyIcon color={props.color} onClick={() => setCopied(props.toCopy)}>
      {isCopied ? (
        <TransactionStatusText>
          <CheckCircle size={'16'} />
        </TransactionStatusText>
      ) : (
        <TransactionStatusText>
          <Copy size={'16'} />
        </TransactionStatusText>
      )}
      {isCopied ? '' : props.children}
    </CopyIcon>
  )
}
