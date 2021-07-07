import React, { createContext, useState, ReactNode } from 'react'
import { TransactionInfo } from './TransactionInfo'
import { TransactionResponse } from "@ethersproject/providers";

interface ITransactionsContext {
    transactions: TransactionInfo[]
    addTransaction: (description: string, response: TransactionResponse) => void
}

const TransactionsContext = createContext<ITransactionsContext>({
    transactions:[],
    addTransaction: (description: string, response: TransactionResponse) => {}
})

const TransactionsProvider = ({ children }: { children: ReactNode }) => {
    const [pendingTransactions, setPendingTransactions] = useState<TransactionInfo[]>([])

    const addTransaction = (description: string, response: TransactionResponse) => {
        setPendingTransactions((pendingTransactions) => [...pendingTransactions, new TransactionInfo(description, response)])
        response.wait().then(txReceipt => {
            setPendingTransactions((pendingTransactions) => pendingTransactions.filter(x => x.response.hash !== response.hash))
        })
    }

    return (
        <TransactionsContext.Provider value={{
            transactions: pendingTransactions,
            addTransaction: addTransaction
        }}>
          {children}
        </TransactionsContext.Provider>
      )
}

export { TransactionsContext }
export default TransactionsProvider