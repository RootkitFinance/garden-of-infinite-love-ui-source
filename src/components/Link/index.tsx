import styled from 'styled-components'
import React, { HTMLProps } from 'react'

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 0.875em;
  `};

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`
  export function ExternalLink({
    target = '_blank',
    href,
    rel = 'noopener noreferrer',
    ...rest
  }: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string }) {

    return <StyledLink target={target} rel={rel} href={href} {...rest} />
  }