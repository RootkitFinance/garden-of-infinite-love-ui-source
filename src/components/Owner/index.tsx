import { useWeb3React } from "@web3-react/core";
import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { constants } from "ethers";
import { AppContext } from "../../contexts/AppContext";
import { FlowerInfo } from "../../dtos/FlowerInfo";
import { FlowerService } from "../../services/FlowerService";
import { getEtherscanLink, supportedChain } from "../../utils";
import { ButtonPrimary, PendingContent } from "../Button";
import { ExternalLink } from "../Link";
import TransactionCompletedModal from "../../components/TransactionCompletedModal";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { ErrorMessage } from "../ErrorMessage";
import TransferOwnership from "../TransferOwnership";
import SetOwners from "../SetOwners";
import LockOwners from "../LockOwners";

const Wrapper = styled.div`
    padding-top: 0.5em;
    display: grid;
    grid-template-columns: 8em 1fr 15em;
    font-size: 0.875em;
    align-items:center;
    color: ${({ theme }) => theme.text3};
    grid-gap: 1em;`

const AddressLink = styled(ExternalLink)` 
    color: ${({ theme }) => theme.text3}; 
    font-family: monospace;
    display: flex;
    :hover {
        color: ${({ theme }) => theme.text2};
    } 
`

const ErrorWrapper = styled.div`
    grid-column-start: 1;
    grid-column-end: 4;
`

enum Status {
    None,
    Pending,
    Done
}

export const Owner = ({flower}:{flower : FlowerInfo}) => {
    const { account, library, chainId } = useWeb3React();
    const [owner, setOwner] = useState<string>(flower.owner);
    const [owner2, setOwner2] = useState<string>(flower.owner2);
    const [owner3, setOwner3] = useState<string>(flower.owner3);
    const [claimOwnershipStatus, setClaimOwnershipStatus] = useState<Status>(Status.None);
    const [pendingOwner, setPendingOwner] = useState<string>("");    
    const [transferOwnershipOpen, setTransferOwnershipOpen] = useState<boolean>(false);
    const [ownersOpen, setOwnersOpen] = useState<boolean>(false);
    const [lockOwnersOpen, setLockOwnersOpen] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [transactionHash, setTransactionHash] = useState<string>("");
    const { chain } = useContext(AppContext);

    useEffect(()=>{
        const getPendingOwner = async () => {
            const service = new FlowerService(library, account!, chain);
            setPendingOwner(await service.getPendingOwner(flower.address));
        }
        if (library && account! && supportedChain(chainId!, chain)){
            getPendingOwner();
        } 
        
        setOwner2(flower.owner2);
        setOwner3(flower.owner3);

    },[account, library, chainId])

    const claimOwnership = async () => {
        setClaimOwnershipStatus(Status.Pending);
        try {
            const service = new FlowerService(library, account!, chain);
            const txResponse = await service.claimOwnership(flower.address);

            if (txResponse) {
                const receipt = await txResponse.wait()
                if (receipt?.status === 1) {
                    setTransactionHash(receipt.transactionHash);
                    setClaimOwnershipStatus(Status.Done);
                    setOwner(pendingOwner);
                    setPendingOwner(constants.AddressZero);
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
        setOwner(await service.getOwner(flower.address));
        setPendingOwner(await service.getPendingOwner(flower.address));
    }

    const onSetOwners = async () => {
        setOwnersOpen(false);
        const service = new FlowerService(library, account!, chain);
        setOwner2(await service.getOwner2(flower.address));
        setOwner3(await service.getOwner3(flower.address));
    }

    return (<>
        <TransferOwnership
                isOpen={transferOwnershipOpen} 
                onDismiss={onTransferOwnership} 
                flowerAddress = {flower.address} />
        <SetOwners  
                isOpen={ownersOpen} 
                onDismiss={onSetOwners} 
                flowerAddress = {flower.address} />
        <LockOwners  
                isOpen={lockOwnersOpen} 
                onDismiss={()=> setLockOwnersOpen(false)} 
                flowerAddress = {flower.address}/>
        <TransactionCompletedModal 
                title={"Ownership Claimed"} 
                hash={transactionHash} 
                isOpen={claimOwnershipStatus === Status.Done} 
                onDismiss={() => setClaimOwnershipStatus(Status.None)} />
        <Wrapper>        
            <span>Owner:</span> 
            <AddressLink href={getEtherscanLink(chainId!, owner, 'address')}>
                <span style={{ marginLeft: '4px' }}>{owner}</span>
            </AddressLink>
            <ButtonPrimary onClick={() => setTransferOwnershipOpen(true)}>Transfer Ownership</ButtonPrimary>
        
            <span>Onwer 2:</span>
            <AddressLink href={getEtherscanLink(chainId!, owner2, 'address')}>
                <span style={{ marginLeft: '4px' }}>{owner2}</span>
            </AddressLink>
            <ButtonPrimary onClick={claimOwnership}>
            {claimOwnershipStatus === Status.Pending ? <PendingContent text={"Claiming..."}/> : "Claim Ownership"}
            </ButtonPrimary>
            
            <span>Owner 3:</span>
            <AddressLink href={getEtherscanLink(chainId!, owner3, 'address')}>
                <span style={{ marginLeft: '4px' }}>{owner3}</span>
            </AddressLink>
            <ButtonPrimary onClick={() => setOwnersOpen(true)}>Set Owner 2 and Owner 3</ButtonPrimary>
            
            <span>Pending Owner:</span>
            <AddressLink href={getEtherscanLink(chainId!, pendingOwner, 'address')}>
                <span style={{ marginLeft: '4px' }}>{pendingOwner}</span>
            </AddressLink>
            <ButtonPrimary onClick={() => setLockOwnersOpen(true)}>Lock Owner 2 and Owner 3</ButtonPrimary>
            {error ? <ErrorWrapper><ErrorMessage error={error} /></ErrorWrapper> : null}
        </Wrapper></>)
}

