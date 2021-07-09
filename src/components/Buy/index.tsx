import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ButtonPrimary, PendingContent } from "../Button"
import { ErrorMessage } from "../ErrorMessage"
import Modal from "../Modal"
import { CloseIcon, CompleteModalContent } from "../CompleteModalContent";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { FlowerService } from "../../services/FlowerService";
import { useWeb3React } from "@web3-react/core";
import { ControlCenterContext } from "../../contexts/ControlCenterContext";
import { supportedChain } from "../../utils"
import CurrencyInput from "../CurrencyInput"
import { TokenService } from "../../services/TokenService"

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

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5em;
`;

enum Status {
    None,
    Approving,
    Approved,
    Pending,
    Completed
}

const Buy = (
    { 
        flowerAddress,
        pairedAddress,
        isOpen, 
        onDismiss
    } : 
    {
        flowerAddress: string,
        pairedAddress: string,
        isOpen: boolean, 
        onDismiss: () => void
    }) => 
{
    const [isApproved, setIsApproved] = useState<boolean>(false);
    const [status, setStatus] = useState<Status>(Status.None)
    const [error, setError] = useState("")
    const [transactionHash, setTransactionHash] = useState("")
    const { account, library, chainId } = useWeb3React();
  
    const [value, setValue] = useState<string>("")    
    const [balance, setBalance] = useState<string>("")
    const { chain } = useContext(ControlCenterContext);

    useEffect(() => {
        const getIsApprove = async () => {
            const service = new TokenService(library, account!, pairedAddress);
            const approved = await service.isApproved(flowerAddress);
            setIsApproved(approved);
           
            if(approved) {
                setStatus(Status.Approved);               
            }
        }
        if(isOpen && chainId && supportedChain(chainId!, chain)) {
            getIsApprove();
        }
    }, [chain, pairedAddress, library, account, isOpen, chainId])

    useEffect(() => {
        const getBalance = async () => setBalance(await new FlowerService(library, account!, chain).getBalance(pairedAddress, account!));
        if(isOpen && chainId && supportedChain(chainId!, chain)) {
            getBalance()
        }
    }, [chain, pairedAddress, library, account, isOpen, chainId])

    useEffect(() =>{
        setError("")
    }, [isOpen])

    const approve = async () => {
        try {
           setStatus(Status.Approving);
           const service = new TokenService(library, account!, pairedAddress);
           const txResponse = await service.approve(flowerAddress);
           if (txResponse) {
               const receipt = await txResponse.wait()
               if (receipt?.status === 1) {
                   setTransactionHash(receipt.transactionHash);
                   setStatus(Status.Approved);                   
               }
               else {
                   setError("Transaction Failed");
                   setStatus(Status.None);
               }
           }          
       }
       catch (e) {
           console.log(e);
           const errorMessage = extractErrorMessage(e);
           if(errorMessage) {
               setError(errorMessage);
           }
           setStatus(Status.None);
       }
   }

    const buy = async () => {
        const amount = parseFloat(value);
        if (Number.isNaN(amount) || amount <= 0) {
            setError("Enter amount");
            return;
        }
        setError("");

        try {
            setStatus(Status.Pending)
            setError("")
            const service = new FlowerService(library, account!, chain)
            const txResponse = await service.buy(flowerAddress, value);  
            if (txResponse) {                 
                const receipt = await txResponse.wait()
               
                if (receipt?.status === 1){
                    setStatus(Status.Completed)
                    setTransactionHash(receipt.transactionHash)
                }
                else {
                    setError("Transaction Failed")
                }            
            }
            else {
                setStatus(Status.None)
            }          
        }
        catch(e) {
            const errorMessage = extractErrorMessage(e)
            if (errorMessage) {
                console.log(e.message)
                setError(errorMessage)
            }
            else {
                setStatus(Status.None)
            }
        }
    }

    const close = () =>{
        setError("")
        setTransactionHash("")
        setStatus(Status.None)
        onDismiss()
    }

    return (
        <Modal isOpen={isOpen} onDismiss={close}>
            {status === Status.Completed && isOpen
            ? <CompleteModalContent title={"Buy"} onDismiss={close} hash={transactionHash} />
            :
            <Wrapper>
                <Header>
                    <span>{"Buy"}</span>
                    <CloseIcon onClick={onDismiss} />
                </Header>
                <CurrencyInput
                    value={value}
                    balance={balance}
                    onSubmit={buy}
                    ticker={""}
                    label={"Amount to spend"}
                    onMax={() => setValue(balance.toString())}
                    showMaxButton={true}
                    onUserInput={(x) => setValue(x)}
                    id={"amountToSpendInput"} />
                 {isApproved 
                    ? 
                        <ButtonPrimary disabled={status !== Status.Approved} onClick={buy}>
                            {status === Status.Pending
                                ? <PendingContent text={"Pending..."}/>
                                : "Buy"
                            }
                        </ButtonPrimary> 
                    :
                    <ButtonsWrapper>
                        <ButtonPrimary onClick={approve}>
                            {status === Status.Approving
                                ? <PendingContent text={"Approving..."}/>
                                : status === Status.Approved ? "Approved" : "Approve"
                            }
                        </ButtonPrimary>
                        <ButtonPrimary disabled={status !== Status.Approved} onClick={buy}>
                            {status === Status.Pending
                                ? <PendingContent text={"Pending..."}/>
                                : "Buy"
                            }
                        </ButtonPrimary>
                    </ButtonsWrapper>
                 }
                { error && isOpen ? <ErrorMessage error={error} /> : null }
            </Wrapper>
            }            
        </Modal>
    )
}

export default Buy