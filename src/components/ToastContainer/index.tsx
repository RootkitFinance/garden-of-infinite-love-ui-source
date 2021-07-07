import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { useTransition } from "react-spring";
import { AutoColumn } from '../Column'
import Toast from '../Toast'
import { ToastInfo } from '../ToastProvider/ToastInfo'

const FixedPopupColumn = styled(AutoColumn)`
  position: fixed;
  top: 5.5em;
  right: 1em;
  max-width: 22em;
  min-width: 20em;
  z-index: 3;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    max-width: 100%;
    left: 0.5em;
    top: 3em;
    right: 0.5em;
  `};
`
const ToastContainer = ({ toasts }: { toasts: ToastInfo[] }) => {
    const transitions = useTransition(toasts, (toast) => toast.id, {
        from: { right: "-100%", opacity: 0 },
        enter: { right: "0%", opacity: 1 },
        leave: { right: "-100%", opacity: 0 }
    });

    return createPortal(
        <FixedPopupColumn gap="1.25em">
            {transitions.map(({ item, props, key }) => <Toast key={key} toastInfo={item} style={props} />)}
        </FixedPopupColumn>,
        document.body
    )
}

export default ToastContainer