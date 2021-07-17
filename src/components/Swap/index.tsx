import React, { useContext, useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import styled, { ThemeContext } from "styled-components"
import BigNumber from 'bignumber.js'
import { ArrowDown } from 'react-feather'
import { FlowerInfo } from "../../dtos/FlowerInfo"
import useTokenBalance from "../../hooks/useTokenBalance"
import { TokenService } from "../../services/TokenService"
import { supportedChain } from "../../utils"
import { AppContext } from "../../contexts/AppContext"
import { extractErrorMessage } from "../../utils/extractErrorMessage"
import { FlowerService } from "../../services/FlowerService"
import CurrencyInput from "../CurrencyInput"
import { ButtonPrimary, LinkStyledButton, PendingContent } from "../../components/Button"
import { getBalanceNumber, getDisplayBalance, getFullDisplayBalance } from "../../utils/formatBalance"
import { ErrorMessage } from "../ErrorMessage"
import TransactionCompletedModal from "../TransactionCompletedModal"

const Wrapper = styled.div`
    display: grid;
    grid-gap: 1.5em;
    padding-bottom: 0.5em;
    width: 26em;

 ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width: 100%;
    font-size: 0.75em;   
 `};
`

const Title = styled.div`
    padding: 0.5em 0;
    font-size: 2em;
    letter-spacing:0.025em;
    text-align: center
`

const ButtonsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1.5em;
    align-items: center;
`

enum SwapStatus {
    None,
    Approving,
    Approved,
    Swapping,
    Swapped
}

const Swap = ({flower, onComplete}: {flower: FlowerInfo, onComplete: ()=>void}) =>{
    const { account, library, chainId } = useWeb3React()
    const { chain, pairedTokens } = useContext(AppContext);
    const flowerTicker = "ORLY";
    const pairedTicker = pairedTokens.find(x=>x.address === flower.pairedAddress)?.symbol!;
    const [status, setStatus] = useState<SwapStatus>(SwapStatus.None);
    const [isBuy, setIsBuy] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string>("");    
    const [outputValue, setOutputValue] = useState<string>("");
    const [inputBalance, setInputBalance] = useState<BigNumber>(new BigNumber(0));
    const [outputBalance, setOutputBalance] = useState<BigNumber>(new BigNumber(0));
    const [inputTicker, setInputTicker] = useState<string>(pairedTicker);
    const [outputTicker, setOutputTicker] = useState<string>(flowerTicker);
    const [isApproved, setIsApproved] = useState<boolean>(false);
    const [transactionHash, setTransactionHash] = useState<string>("");
    const [error, setError] = useState<string>("");
    const flowerBalance = useTokenBalance(flower.address);
    const pairedBalance = useTokenBalance(flower.pairedAddress);
    const theme = useContext(ThemeContext);
    

    useEffect(() => {
        const getIsApprove = async () => {
            const service = new TokenService(library, account!, flower.pairedAddress);
            const approved = await service.isApproved(flower.address);
            setIsApproved(approved);
           
            if(approved) {
                setStatus(SwapStatus.Approved);               
            }
        }
        if(chainId && supportedChain(chainId!, chain)) {
            getIsApprove();
        }
    }, [library, account, chainId])

    useEffect(() => {
        if (isBuy) {          
            setInputBalance(pairedBalance);
            setOutputBalance(flowerBalance);
        }
        else {
            setInputBalance(flowerBalance);
            setOutputBalance(pairedBalance);
        }
    }, [flowerBalance, pairedBalance])

    const onInputValueChanged = (value: string) => {
        setInputValue(value);
        const amount = parseFloat(value);

        if (value === "" || amount === 0){
            setOutputValue("");
            return;
        }
        if (!Number.isNaN(amount) && library && account && supportedChain(chainId!, chain)) {
            const price = parseFloat(flower.price);
            const outputAmount = isBuy ? amount / price : amount*price;
            setOutputValue(outputAmount.toString());
        }
    }

    const onOutputValueChanged = (value: string) => {
        setOutputValue(value);
        const amount = parseFloat(value);
        
        if (value === "" || amount === 0){
            setInputValue("");
            return;
        }
        if (!Number.isNaN(amount) && library && account && supportedChain(chainId!, chain)) {
            const price = parseFloat(flower.price);
            const imputAmount = isBuy ? amount*price : amount / price;
            setInputValue(imputAmount.toString());
        }
    }

    const approve = async () =>{
        try {
            setStatus(SwapStatus.Approving);
            const service = new TokenService(library, account!, flower.pairedAddress);
            const txResponse = await service.approve(flower.address);
            if (txResponse) {
                const receipt = await txResponse.wait()
                if (receipt?.status === 1) {
                    setTransactionHash(receipt.transactionHash);
                    setStatus(SwapStatus.Approved);
                    setIsApproved(true);
                }
                else {
                    setError("Transaction Failed");
                    setStatus(SwapStatus.None);
                }
            }          
        }
        catch (e) {
            console.log(e);
            const errorMessage = extractErrorMessage(e);
            if(errorMessage) {
                setError(errorMessage);
            }
            setStatus(SwapStatus.None);
        }
    }

    const swap = async () => {
        const inputAmount = parseFloat(inputValue);
        if (Number.isNaN(inputAmount) || inputAmount <= 0) {
            setError("Enter amount");
            return;
        }       
        
        setError("");       
        try {
            setStatus(SwapStatus.Swapping);

            const service = new FlowerService(library, account!, chain)
            const txResponse =  isBuy ? await service.buy(flower.address, inputValue) : await service.sell(flower.address, inputValue)

            if (txResponse) {
                const receipt = await txResponse.wait()
                if (receipt?.status === 1) {
                    setTransactionHash(receipt.transactionHash); 
                    setStatus(SwapStatus.Swapped);
                    onComplete();
                    setInputValue("");
                    setOutputValue("");  
                }
                else {
                    setError("Transaction Failed");
                    setStatus(SwapStatus.Approved);
                }
            }         
        }
        catch (e) {
            console.log(e)
            const errorMessage = extractErrorMessage(e);
            if(errorMessage) {
                setError(errorMessage);
            }
           
            setStatus(isBuy ? SwapStatus.Approved : SwapStatus.None);
        }
    }

    const switchTokens = async () => {
        setError("");
        const inValue = inputValue;
        setInputValue(outputValue);
        setOutputValue(inValue);
      
        if (isBuy) {
            setInputTicker(flowerTicker);
            setOutputTicker(pairedTicker);
            setInputBalance(flowerBalance);
            setOutputBalance(pairedBalance);
        }
        else {
            setInputTicker(pairedTicker);
            setOutputTicker(flowerTicker);
            setInputBalance(pairedBalance);
            setOutputBalance(flowerBalance);
        }
        
        setIsBuy(!isBuy);
    }

    return (
    <Wrapper>
        <TransactionCompletedModal title={"Swap completed"} hash={transactionHash} isOpen={status === SwapStatus.Swapped} onDismiss={() => setStatus(SwapStatus.None)} />
        <Title>Swap</Title>               
        <CurrencyInput
            value={inputValue}
            balance={getDisplayBalance(inputBalance)}
            numericBalance={getBalanceNumber(inputBalance)}
            onSubmit={() => {}}
            ticker={inputTicker}
            label={"From"}
            onMax={() => onInputValueChanged(getFullDisplayBalance(inputBalance))}
            showMaxButton={true}
            onUserInput={onInputValueChanged}
            id={"FromInput"} />
        <LinkStyledButton onClick={switchTokens}  disabled={status === SwapStatus.Approving || status === SwapStatus.Swapping || !supportedChain(chainId!, chain)}>
            <ArrowDown size="16" color={theme.text3} />
        </LinkStyledButton>
        <CurrencyInput
            value={outputValue}
            balance={getDisplayBalance(outputBalance)}
            numericBalance={getBalanceNumber(outputBalance)}
            onSubmit={() => {}}
            ticker={outputTicker}
            label={"To"}
            onMax={() => onOutputValueChanged(getFullDisplayBalance(outputBalance))}
            showMaxButton={true}
            onUserInput={onOutputValueChanged}
            id={"ToInput"} />                  
        {isApproved || !isBuy
        ? 
            <ButtonPrimary disabled={status === SwapStatus.Swapping || !supportedChain(chainId!, chain)} onClick={swap}>
                {status === SwapStatus.Swapping 
                ? <PendingContent text={"Swapping..."}/> 
                : "Swap"}
            </ButtonPrimary>
        :
        <ButtonsWrapper>
            <ButtonPrimary disabled={status === SwapStatus.Approving || !supportedChain(chainId!, chain)} onClick={approve}>
                {status === SwapStatus.Approving 
                ? <PendingContent text={"Approving..."}/>
                : status === SwapStatus.Approved ? "Approved" : "Approve"}
            </ButtonPrimary>
            <ButtonPrimary disabled={!isApproved || status === SwapStatus.Swapping || !supportedChain(chainId!, chain)} onClick={swap}>
                {status === SwapStatus.Swapping
                ? <PendingContent text={"Swapping..."}/>
                : "Swap" }
            </ButtonPrimary>
        </ButtonsWrapper>
        }
        {error ? <ErrorMessage error={error} /> : null}
    </Wrapper>)
}

export default Swap;