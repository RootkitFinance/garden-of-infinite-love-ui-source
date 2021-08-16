import { useWeb3React } from "@web3-react/core";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../../contexts/AppContext";
import { ImmutableFlowerInfo } from "../../dtos/ImmutableFlowerInfo";
import { FlowerService } from "../../services/FlowerService";
import { getEtherscanLink, shortenAddress } from "../../utils";
import { ButtonPrimaryGreen, ButtonPrimaryRed, ButtonPrimary, PendingContent } from "../Button";
import { ExternalLink } from "../Link";
import TransactionCompletedModal from "../TransactionCompletedModal";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { ErrorMessage } from "../ErrorMessage";
import Buy from "../Buy";
import Sell from "../Sell";
import { useHistory, useParams } from "react-router-dom";

const Wrapper = styled.div`
    padding: 1em 0;
    border-bottom: 1px solid ${({ theme }) => theme.text3};
`

const TextRow = styled.div`
    display: grid;
    grid-gap: 1.5em;
    align-items: center;
    grid-template-columns:  8em 5em 5em 5em 1fr;
    font-size: 0.825rem;
    color: ${({ theme }) => theme.text3};
`

const ButtonRow = styled.div`
    display: grid;
    grid-gap: 1em;
    grid-auto-flow: column;
    justify-content:end;
    align-items: cneter;
`

const AddressLink = styled(ExternalLink)` 
    color: ${({ theme }) => theme.text3}; 
    font-family: monospace;
     display: flex;
    :hover {
        color: ${({ theme }) => theme.text2};
    } 
`

const NumericColumn = styled.span`
    text-align:right;
`

enum Status {
    None,
    Pending,
    Done
}

export const FlowerRow = ({flowerInfo, addPetals}:{flowerInfo: ImmutableFlowerInfo, addPetals: (petals: ImmutableFlowerInfo[]) => void}) => {
    const { account, library, chainId } = useWeb3React();
    const { address } = useParams<{ address: string }>();
    const [loadingPetals, setLoadingPetals] = useState<boolean>(false);
    const [petalsLoaded, setPetalsLoaded] = useState<boolean>(flowerInfo.petalsLoaded);  
    const [upOnlyStatus, setUpOnlyStatus] = useState<Status>(Status.None);  
    const [error, setError] = useState("");
    const [transactionHash, setTransactionHash] = useState<string>("");
    const { chain } = useContext(AppContext);
    const [buyOpen, setBuyOpen] = useState<boolean>(false);
    const [sellOpen, setSellOpen] = useState<boolean>(false);
   
    let history = useHistory();
   
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
    const loadPetals = async () => {
        setLoadingPetals(true);
        const service = new FlowerService(library, account!, chain);
        const petals = await service.getPetals(flowerInfo.address);
        setPetalsLoaded(true);
        setLoadingPetals(false);
        addPetals(petals);
    }

    const openFlower = ()=>{
        if (address !== flowerInfo.address) {
            history.push(`/flower/${flowerInfo.address}`);
        }       
    }

    return (
        <Wrapper>          
            <TransactionCompletedModal 
                title={"Up Only Completed"}
                hash={transactionHash} 
                isOpen={upOnlyStatus === Status.Done}
                onDismiss={() => setUpOnlyStatus(Status.None)} />            
            <Buy 
                isOpen={buyOpen} 
                onDismiss={() => setBuyOpen(false)} 
                pairedAddress={flowerInfo.pairedAddress} 
                flowerAddress = {flowerInfo.address} />
            <Sell 
                isOpen={sellOpen} 
                onDismiss={() => setSellOpen(false)} 
                flowerAddress = {flowerInfo.address} />
          
            <TextRow>              
                <AddressLink href={getEtherscanLink(chainId!, flowerInfo.address, 'address')}>
                    <span style={{ marginLeft: '4px' }}>{shortenAddress(flowerInfo.address)}</span>
                </AddressLink>
                <NumericColumn>{flowerInfo.burnRate}</NumericColumn>
                <NumericColumn>{flowerInfo.upPercent}</NumericColumn>
                <NumericColumn>{flowerInfo.upDelay}</NumericColumn>
                <ButtonRow>
                    <ButtonPrimaryGreen onClick={() => setBuyOpen(true)}>Buy</ButtonPrimaryGreen>
                    <ButtonPrimaryRed onClick={() => setSellOpen(true)}>Sell</ButtonPrimaryRed>                    
                    <ButtonPrimary onClick={upOnly}>
                        {upOnlyStatus === Status.Pending ? <PendingContent text={"Pending..."}/> : "Up Only"}
                    </ButtonPrimary>           
                    {!petalsLoaded && <ButtonPrimary onClick={loadPetals}>
                        {loadingPetals ? <PendingContent text={"Loading..."}/> : "Show Petals"}
                    </ButtonPrimary>}
                    {address !== flowerInfo.address && <ButtonPrimary onClick={openFlower}>Details</ButtonPrimary>}
            </ButtonRow>
              
            </TextRow>            
           
            {error ? <ErrorMessage error={error} /> : null}
        </Wrapper>
    )   
}