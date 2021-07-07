import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { darken } from 'polished'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
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


interface NumberInputProps {
  value: string
  onUserInput: (value: string) => void
  onSubmit: () => void 
  label?: string
  hideInput?: boolean
  disabled?: boolean 
  id: string
}

export default function NumberInput({
  value,
  onUserInput,
  onSubmit,
  label = 'Input',
  hideInput = false,
  disabled = false, 
  id
}: NumberInputProps) {
  const theme = useContext(ThemeContext)
  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
             <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                {label}
              </TYPE.body>              
            </RowBetween>
          </LabelRow>
        )}
        <InputRow>
            <NumericalInput
              disabled={disabled}
              className="token-amount-input"
              value={value}
              onUserInput={val => onUserInput(val)}
              onSubmit={onSubmit}
            />
        </InputRow>
      </Container>
    </InputPanel>
  )
}