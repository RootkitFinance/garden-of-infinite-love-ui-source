import React from 'react'
import styled from 'styled-components'
import { escapeRegExp } from '../../utils'

const StyledInput = styled.input<{ error?: boolean; fontSize?: string; align?: string }>`
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  width: 0;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: ${({ theme }) => theme.bg1};
  font-size: ${({ fontSize }) => fontSize ?? '24px'};
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

export const NumericalInput = React.memo(function InnerInput({
  value,
  onUserInput,
  onSubmit,
  placeholder,
  ...rest
}: {
  value: string | number
  onUserInput: (input: string) => void
  onSubmit: () => void
  error?: boolean
  fontSize?: string
  align?: 'right' | 'left'
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) {
    const isValid = (value: string) => value === '' || inputRegex.test(escapeRegExp(value))
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSubmit()
        e.preventDefault()
        e.stopPropagation()
      }
    }

    return (
      <StyledInput
        {...rest}
        value={value}
        onKeyDown={onKeyDownHandler}
        onChange={event => {
          if (!isValid(event.target.value)) return  
          const newValue = event.target.value.replace(/,/g, '.')
          onUserInput(newValue)
        }}
        // universal input options
        inputMode="decimal"
        title="Token Amount"
        autoComplete="off"
        autoCorrect="off"
        // text-specific options
        type="text"
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder={placeholder || '0.0'}
        minLength={1}
        maxLength={20}
        spellCheck="false"
      />
    )
})

export default NumericalInput
