import React, { useEffect, useContext, CSSProperties } from "react";
import { animated } from "react-spring";
import { X } from "react-feather"
import styled, { ThemeContext } from "styled-components"
import { useToast } from "../ToastProvider";
import { AutoColumn } from "../Column"
import { AutoRow } from "../Row"
import { ToastInfo } from "../ToastProvider/ToastInfo";
import Icon from "../Icon";
import { ExternalLink } from "../Link";
import { getEtherscanLink, getEtherscanLabel } from "../../utils";
import { useWeb3React } from "@web3-react/core";

export const StyledClose = styled(X)`
  position: absolute;
  right: 1em;
  top: 1em;
  :hover {
    cursor: pointer;
  }
`
export const Wrapper = styled(animated.div)`
  display: inline-block;
  width: 100%;
  padding: 1em 2em 1em 1em;
  background-color: ${({ theme }) => theme.bg1};
  box-shadow:0 0 1em 0 #000 !important;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  z-index: 2;
`
const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
`
const Description = styled.div`
  line-height: 1.5em;
  padding-right: 1em;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 0.875em;
  `};
`
const Toast = ({ toastInfo, style } : { toastInfo: ToastInfo, style: CSSProperties })  => {
  const { removeToast } = useToast()
  const theme = useContext(ThemeContext)
  const { chainId } = useWeb3React()

  useEffect(() => {
    const timer = setTimeout(() => removeToast(toastInfo.id), toastInfo.displayDurationMs)
    return () => clearTimeout(timer)
  }, [toastInfo.id, toastInfo.displayDurationMs, removeToast])

  return (
    <Wrapper id={toastInfo.id} style={style}>        
        <StyledClose color={theme.text2} onClick={() => removeToast(toastInfo.id)} />
        <RowNoFlex>
            <div style={{ paddingRight: 16 }}>
                <Icon type={toastInfo.icon}/>
            </div>
            <AutoColumn gap="0.5rem">
                <Description>{toastInfo.message}</Description>
                {chainId && toastInfo.hash && (
                    <ExternalLink href={getEtherscanLink(chainId, toastInfo.hash, "transaction")}>
                        {getEtherscanLabel(chainId)}
                    </ExternalLink>
                )}
            </AutoColumn>
        </RowNoFlex>     
    </Wrapper>
  )
}

export default Toast;