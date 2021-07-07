import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { darken } from 'polished'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
import { useWeb3React } from '@web3-react/core'
import NumericalInput from '../NumericalInput'

const InputRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
`
const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`
// const Aligner = styled.span`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `
const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
`
const Container = styled.div<{ hideInput: boolean }>`
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`
// const StyledTokenName = styled.span<{ active?: boolean }>`
//   ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.75rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
//   font-size:  ${({ active }) => (active ? '20px' : '16px')};
// `
const StyledBalanceMax = styled.button`
  height: 28px;
  background-color: ${({ theme }) => theme.primary5};
  border: 1px solid ${({ theme }) => theme.primary5};
  border-radius: 0.5rem;
  font-size: 0.875rem;

  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.primaryText1};
  :hover:not([disabled]) {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
  :focus:not([disabled]) {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }

  :disabled {
    cursor: auto;
    background-color: ${({ theme }) => theme.bg3};
    border: 1px solid ${({ theme }) => theme.bg4};
    color: ${({ theme }) => theme.bg5};
  }
  

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `};
`

interface CurrencyInputProps {
  value: string
  onUserInput: (value: string) => void
  onSubmit: () => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  hideBalance?: boolean
  hideInput?: boolean
  disabled?: boolean
  balance?: string
  balanceLabel?: string
  ticker: string
  id: string
}

export default function CurrencyInput({
  value,
  onUserInput,
  onSubmit,
  onMax,
  label = 'Input',
  showMaxButton,
  hideBalance = false,
  hideInput = false,
  disabled = false,
  balance,
  balanceLabel = 'Balance',
  ticker,
  id
}: CurrencyInputProps) {
  const { account } = useWeb3React()
  const theme = useContext(ThemeContext)
  const numericBalance = balance ? parseFloat(balance.replace(",","")) : 0

  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
             <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                {label}
              </TYPE.body>
              {account && (
                <TYPE.body
                  onClick={ balance ? onMax : () =>{}}
                  color={ disabled? theme.bg5 : theme.text2}
                  fontWeight={500}
                  fontSize={14}
                  style={ balance ? { display: 'inline', cursor: 'pointer' } : { display: 'inline', cursor:'default' }}
                >
                  {!hideBalance && balance ? `${balanceLabel}: ${numericBalance.toFixed(4)}`: '-'}
                </TYPE.body>
              )}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow>
          <>
            <NumericalInput
              disabled={disabled}
              className="token-amount-input"
              value={value}
              onUserInput={val => onUserInput(val)}
              onSubmit={onSubmit}
            />
            {account && showMaxButton && (
              <StyledBalanceMax disabled={disabled || !balance || numericBalance === 0} onClick={onMax}>MAX</StyledBalanceMax>
            )}
            {ticker}
          </>
        </InputRow>
      </Container>
    </InputPanel>
  )
}