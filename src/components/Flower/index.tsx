import { useWeb3React } from "@web3-react/core";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ControlCenterContext } from "../../contexts/ControlCenterContext";
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

const Wrapper = styled.div`
    display: grid;
    grid-gap: 1em;
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

enum CoverStatus {
    None,
    Pending,
    Done
}

export const Flower = ({flowerInfo}:{flowerInfo: FlowerInfo}) => {
    const { account, library, chainId } = useWeb3React();
    const [coverStaus, setCoverStaus] = useState<CoverStatus>(CoverStatus.None);
    const [error, setError] = useState("");
    const [transactionHash, setTransactionHash] = useState<string>("");
    const { chain } = useContext(ControlCenterContext);
    const [buyOpen, setBuyOpen] = useState<boolean>(false);
    const [sellOpen, setSellOpen] = useState<boolean>(false);

    const cover = async () => {
        setCoverStaus(CoverStatus.Pending);
        try {
            const service = new FlowerService(library, account!, chain);
            const txResponse = await service.letTheFlowersCoverTheEarth(flowerInfo.address);

            if (txResponse) {
                const receipt = await txResponse.wait()
                if (receipt?.status === 1) {
                    setTransactionHash(receipt.transactionHash);
                    setCoverStaus(CoverStatus.Done);                  
                }
                else {
                    setError("Transaction Failed");
                    setCoverStaus(CoverStatus.None); 
                }
            }
        }
        catch(e){
            console.log(e)
            const errorMessage = extractErrorMessage(e);
            if(errorMessage) {
                setError(errorMessage);
            }
            setCoverStaus(CoverStatus.None); 
        }       
    }

    return (
        <Wrapper>
            <TransactionCompletedModal 
                title={"Flowers Covered the Earth"} 
                hash={transactionHash} 
                isOpen={coverStaus === CoverStatus.Done} 
                onDismiss={() => setCoverStaus(CoverStatus.None)} />
            <Buy 
                isOpen={buyOpen} 
                onDismiss={() => setBuyOpen(false)} 
                pairedAddress={flowerInfo.pairedAddress} 
                flowerAddress = {flowerInfo.address}/>
            <Sell 
                isOpen={sellOpen} 
                onDismiss={() => setSellOpen(false)} 
                flowerAddress = {flowerInfo.address}/>
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
                    {coverStaus === CoverStatus.Pending ? <PendingContent text={"Pending..."}/> : "Let Flowers Cover The Earth"}
                </ButtonPrimary>
            </ButtonRow>
            {error ? <ErrorMessage error={error} /> : null}
        </Wrapper>
    )   
}