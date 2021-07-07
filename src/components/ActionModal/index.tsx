import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { TransactionResponse } from "@ethersproject/providers";
import { ButtonPrimary } from "../Button"
import { ErrorMessage } from "../ErrorMessage"
import Loader from "../Loader"
import Modal from "../Modal"
import { AutoRow } from "../Row"
import { CloseIcon, CompleteModalContent } from "../CompleteModalContent";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { TransactionsContext } from'../../contexts/Transactions/TransactionsProvider';

const Wrapper = styled.div`
    display: grid;
    grid-gap: 1.5em;
    width: 100%;
    padding: 1.5em;
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

enum Status {
    None,
    Pending,
    Error,
    Completed
}

const ActionModal = (
    { 
        isOpen, 
        title, 
        onDismiss, 
        action,
        children
    } : 
    {
        isOpen: boolean, 
        title: string, 
        onDismiss: () => void,
        action: () => Promise<TransactionResponse>,
        children: React.ReactNode
    }) => 
{
    const [status, seStatus] = useState<Status>(Status.None)
    const [error, setError] = useState("")
    const [transactionHash, setTransactionHash] = useState("")
    const { addTransaction } = useContext(TransactionsContext)

    useEffect(() =>{
        setError("")
    }, [isOpen])

    const onOk = async () => {
       
        try {
            seStatus(Status.Pending)
            setError("")
            const txResponse = await action()    
            if (txResponse)
            {                 
                addTransaction(title, txResponse)
                const receipt = await txResponse.wait()
               
                if (receipt?.status === 1)
                {
                    seStatus(Status.Completed)
                    setTransactionHash(receipt.transactionHash)
                }
                else
                {
                    seStatus(Status.Error)
                    setError("Transaction Failed")
                }            
            }
            else
            {
                seStatus(Status.None)
            }          
        }
        catch(e) {
            const errorMessage = extractErrorMessage(e)
            if (errorMessage)
            {
                console.log(e.message)
                setError(errorMessage)
                seStatus(Status.Error)
            }
            else
            {
                seStatus(Status.None)
            }
        }
    }

    const close = () =>{
        setError("")
        setTransactionHash("")
        seStatus(Status.None)
        onDismiss()
    }

    return (
        <Modal isOpen={isOpen} onDismiss={close}>
            {status === Status.Completed && isOpen
            ? <CompleteModalContent title={title} onDismiss={close} hash={transactionHash} />
            :
            <Wrapper>
                <Header>
                    <span>{title}</span>
                    <CloseIcon onClick={onDismiss} />
                </Header>
                 {children}
                 {status === Status.Pending
                    ? <ButtonPrimary disabled={true}>
                        <AutoRow gap="0.5em" justify="center">
                            Pending...
                            <Loader stroke="white" />
                        </AutoRow>
                    </ButtonPrimary>
                    : <ButtonPrimary onClick={onOk}>{title}</ButtonPrimary>
                }                
                { error && isOpen ? <ErrorMessage error={error} /> : null }
            </Wrapper>
            }            
        </Modal>
    )
}

export default ActionModal