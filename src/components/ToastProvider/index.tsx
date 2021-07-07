import React, { useState, useContext, useCallback, ReactNode } from 'react'
import { nanoid } from 'nanoid'
import { ToastInfo } from './ToastInfo'
import ToastContainer from '../ToastContainer'

const ToastContext = React.createContext({ 
        addToast: (icon: ReactNode, message: string, hash?: string) => {},
        removeToast: (id: string) => {}
    }
)

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<ToastInfo[]>([])
    const dispalyDurationMs = 5000
  
    const addToast = useCallback(
        (icon, message, hash) => {
          setToasts((toasts) => [...toasts, new ToastInfo(nanoid(), icon, message, dispalyDurationMs, hash)])
          },
        [setToasts]
    )
  
    const removeToast = useCallback(
        id => setToasts((toasts) => toasts.filter(x => x.id !== id)), 
        [setToasts])
  
    return (
      <ToastContext.Provider value={{ addToast, removeToast }}>
        <>
          {<ToastContainer toasts={toasts} />}
          {children}
        </>
        
      </ToastContext.Provider>
    )
  }

const useToast = () => useContext(ToastContext);

export { ToastContext, useToast }
export default ToastProvider