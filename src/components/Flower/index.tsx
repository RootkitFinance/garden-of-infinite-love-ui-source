import { useWeb3React } from "@web3-react/core";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../../contexts/AppContext";
import { FlowerInfo } from "../../dtos/FlowerInfo";
import { FlowerService } from "../../services/FlowerService";
import { getEtherscanLink, shortenAddress } from "../../utils";
import { ButtonPrimaryGreen, ButtonPrimaryRed, ButtonPrimary, PendingContent } from "../Button";
import { ExternalLink } from "../Link";
import TransactionCompletedModal from "../../components/TransactionCompletedModal";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { ErrorMessage } from "../ErrorMessage";
import Buy from "../Buy";
import Sell from "../Sell";
import { useEffect } from "react";
import TransferOwnership from "../TransferOwnership";

const Wrapper = styled.div`
    padding-top: 0.5em;
    display: grid;
    grid-gap: 1em;
    border-bottom: 1px solid ${({ theme }) => theme.text3};
`

const TextRow = styled.div`
    display: grid;
    grid-gap: 1em;
    grid-template-columns: 8em auto;
    font-size: 0.825rem;
    color: ${({ theme }) => theme.text3};
`

const ButtonRow = styled.div`
    display: grid;
    grid-gap: 0.5em;
    grid-auto-flow: column;
`

const Label = styled.span`
    text-align: right;
`

const AddressLink = styled(ExternalLink)` 
color: ${({ theme }) => theme.text3}; 
  font-family: monospace;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.text2};
  } 
`

enum Status {
    None,
    Pending,
    Done
}

export const Flower = ({flowerInfo}:{flowerInfo: FlowerInfo}) => {
    const { account, library, chainId } = useWeb3React();
    const [coverStatus, setCoverStatus] = useState<Status>(Status.None);
    const [upOnlyStatus, setUpOnlyStatus] = useState<Status>(Status.None);
    const [payFeesStatus, setPayFeesStatus] = useState<Status>(Status.None);
    const [claimOwnershipStatus, setClaimOwnershipStatus] = useState<Status>(Status.None);    
    const [error, setError] = useState("");
    const [transactionHash, setTransactionHash] = useState<string>("");
    const { chain } = useContext(AppContext);
    const [buyOpen, setBuyOpen] = useState<boolean>(false);
    const [sellOpen, setSellOpen] = useState<boolean>(false);
    const [transferOwnershipOpen, setTransferOwnershipOpen] = useState<boolean>(false);
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [isPendingOwner, setIsPendingOwner] = useState<boolean>(false);

    useEffect(() => {
        const getOwner = async () => {
            const service = new FlowerService(library, account!, chain);
            const owner = await service.getOwner(flowerInfo.address);
            const pendingOwner = await service.getPendingOwner(flowerInfo.address);
            setIsOwner(owner === account);
            setIsPendingOwner(pendingOwner === account);
        }
        if(account) {
            getOwner();
        }       
    },[])

    const cover = async () => {
        setCoverStatus(Status.Pending);
        try {
            const service = new FlowerService(library, account!, chain);
            const txResponse = await service.letTheFlowersCoverTheEarth(flowerInfo.address);

            if (txResponse) {
                const receipt = await txResponse.wait()
                if (receipt?.status === 1) {
                    setTransactionHash(receipt.transactionHash);
                    setCoverStatus(Status.Done);                  
                }
                else {
                    setError("Transaction Failed");
                    setCoverStatus(Status.None); 
                }
            }
        }
        catch(e){
            console.log(e)
            const errorMessage = extractErrorMessage(e);
            if(errorMessage) {
                setError(errorMessage);
            }
            setCoverStatus(Status.None); 
        }       
    }

    const upOnly = async () => {
        setUpOnlyStatus(Status.Pending);
        try {
            const service = new FlowerService(library, account!, chain);
            const txResponse = await service.upOnly(flowerInfo.address);

            if (txResponse) {
                const receipt = await txResponse.wait()
                if (receipt?.status === 1) {
                    setTransactionHash(receipt.transactionHash);
                    setUpOnlyStatus(Status.Done);                  
                }
                else {
                    setError("Transaction Failed");
                    setUpOnlyStatus(Status.None); 
                }
            }
        }
        catch(e){
            console.log(e)
            const errorMessage = extractErrorMessage(e);
            if(errorMessage) {
                setError(errorMessage);
            }
            setUpOnlyStatus(Status.None); 
        }
    }

    const payFees = async () => {
        setPayFeesStatus(Status.Pending);
        try {
            const service = new FlowerService(library, account!, chain);
            const txResponse = await service.payFees(flowerInfo.address);

            if (txResponse) {
                const receipt = await txResponse.wait()
                if (receipt?.status === 1) {
                    setTransactionHash(receipt.transactionHash);
                    setPayFeesStatus(Status.Done);                  
                }
                else {
                    setError("Transaction Failed");
                    setPayFeesStatus(Status.None); 
                }
            }
        }
        catch(e){
            console.log(e)
            const errorMessage = extractErrorMessage(e);
            if(errorMessage) {
                setError(errorMessage);
            }
            setPayFeesStatus(Status.None); 
        }
    }

    const claimOwnership = async () => {
        setClaimOwnershipStatus(Status.Pending);
        try {
            const service = new FlowerService(library, account!, chain);
            const txResponse = await service.claimOwnership(flowerInfo.address);

            if (txResponse) {
                const receipt = await txResponse.wait()
                if (receipt?.status === 1) {
                    setTransactionHash(receipt.transactionHash);
                    setClaimOwnershipStatus(Status.Done);
                    setIsOwner(true);
                    setIsPendingOwner(false);
                }
                else {
                    setError("Transaction Failed");
                    setClaimOwnershipStatus(Status.None); 
                }
            }
        }
        catch(e){
            console.log(e)
            const errorMessage = extractErrorMessage(e);
            if(errorMessage) {
                setError(errorMessage);
            }
            setClaimOwnershipStatus(Status.None); 
        }
    }

    const onTransferOwnership = async () => {
        setTransferOwnershipOpen(false);
        const service = new FlowerService(library, account!, chain);
        const owner = await service.getOwner(flowerInfo.address);
        const pendingOwner = await service.getPendingOwner(flowerInfo.address);
        setIsOwner(owner === account);
        setIsPendingOwner(pendingOwner === account);
    }

    return (
        <Wrapper>
            <TransactionCompletedModal 
                title={"Flowers Covered the Earth"} 
                hash={transactionHash} 
                isOpen={coverStatus === Status.Done} 
                onDismiss={() => setCoverStatus(Status.None)} />
            <TransactionCompletedModal 
                title={"Up Only Completed"}
                hash={transactionHash} 
                isOpen={upOnlyStatus === Status.Done}
                onDismiss={() => setUpOnlyStatus(Status.None)} />
            <TransactionCompletedModal 
                title={"Fees paid"}
                hash={transactionHash} 
                isOpen={payFeesStatus === Status.Done}
                onDismiss={() => setPayFeesStatus(Status.None)} />
            <Buy 
                isOpen={buyOpen} 
                onDismiss={() => setBuyOpen(false)} 
                pairedAddress={flowerInfo.pairedAddress} 
                flowerAddress = {flowerInfo.address} />
            <Sell 
                isOpen={sellOpen} 
                onDismiss={() => setSellOpen(false)} 
                flowerAddress = {flowerInfo.address} />
            <TransferOwnership
                isOpen={transferOwnershipOpen} 
                onDismiss={onTransferOwnership} 
                flowerAddress = {flowerInfo.address} />
            <TextRow>
                <Label>Address</Label>
                <AddressLink href={getEtherscanLink(chainId!, flowerInfo.address, 'address')}>
                    <span style={{ marginLeft: '4px' }}>{shortenAddress(flowerInfo.address)}</span>
                </AddressLink>       
            </TextRow>
            <TextRow>
                <Label>Price</Label>
                <span>{flowerInfo.price}</span>
            </TextRow>
            <TextRow>
                <Label>Total Supply</Label>
                <span>{flowerInfo.totalSupply}</span>
            </TextRow>
            <TextRow>
                <Label>Paired Balance</Label>
                <span>{flowerInfo.pairedBalance}</span>
            </TextRow>
            <ButtonRow>
                <ButtonPrimaryGreen onClick={() => setBuyOpen(true)}>Buy</ButtonPrimaryGreen>
                <ButtonPrimaryRed onClick={() => setSellOpen(true)}>Sell</ButtonPrimaryRed>
                <ButtonPrimary onClick={cover}>
                    {coverStatus === Status.Pending ? <PendingContent text={"Pending..."}/> : "Let Flowers Cover The Earth"}
                </ButtonPrimary>
            </ButtonRow>
            <ButtonRow>
                <ButtonPrimary onClick={upOnly}>
                    {upOnlyStatus === Status.Pending ? <PendingContent text={"Pending..."}/> : "Up Only"}
                </ButtonPrimary>
                <ButtonPrimary onClick={payFees}>
                    {payFeesStatus === Status.Pending ? <PendingContent text={"Pending..."}/> : "Pay Fees"}
                </ButtonPrimary>
            </ButtonRow>
            <ButtonRow>
                {isOwner && <ButtonPrimary onClick={() => setTransferOwnershipOpen(true)}>Transfer Ownership</ButtonPrimary> }
                {isPendingOwner && <ButtonPrimary onClick={claimOwnership}>
                    {claimOwnershipStatus === Status.Pending ? <PendingContent text={"Pending..."}/> : "Claim Ownership"}
                </ButtonPrimary>}
            </ButtonRow>
            {error ? <ErrorMessage error={error} /> : null}
        </Wrapper>
    )   
}