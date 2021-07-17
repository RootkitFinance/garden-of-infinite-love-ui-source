import { useWeb3React } from "@web3-react/core"
import React, { useContext, useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components"
import { ButtonPrimary, PendingContent } from "../../components/Button";
import { PrimaryCard } from "../../components/Card"
import { ErrorMessage } from "../../components/ErrorMessage";
import { ExternalLink } from "../../components/Link";
import Loader from "../../components/Loader";
import { Owner } from "../../components/Owner";
import Swap from "../../components/Swap";
import TransactionCompletedModal from "../../components/TransactionCompletedModal";
import { AppContext } from "../../contexts/AppContext";
import { BalanceInfo } from "../../dtos/BalanceInfo";
import { FlowerInfo } from "../../dtos/FlowerInfo";
import useTokenBalance from "../../hooks/useTokenBalance";
import { FlowerService } from "../../services/FlowerService";
import { getEtherscanLink, isAddress, shortenAddress, supportedChain } from "../../utils";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { getDisplayBalance } from "../../utils/formatBalance";

const PageWrapper = styled.div`
    padding-top: 1.5em;
    display:grid;
    grid-gap:2em;
    grid-template-columns: auto auto;
    grid-template-areas:
    "swap info"
    "fees fees"
    "owners owners"; 

 ${({ theme }) => theme.mediaWidth.upToSmall`
    padding-top:0em;
 `};
`

const CardContent = styled.div`
    display:grid;
    grid-gap:1em;
    padding:0.5em 0;
`

const FeesRowWrapper = styled(CardContent)`
    grid-template-columns: 13em auto 1fr auto;
    align-items: center;
    font-size: 0.875em;
    color: ${({ theme }) => theme.text3}
`

const InfoWrapper = styled.div`
    padding: 1em;
    display:grid;
    grid-template-columns: 10em auto;
    grid-gap:1em;
    font-size: 0.875em;
    color: ${({ theme }) => theme.text3}
`


const AddressLink = styled(ExternalLink)` 
    color: ${({ theme }) => theme.text3}; 
    font-family: monospace;
     display: flex;
    :hover {
        color: ${({ theme }) => theme.text2};
    } 
`

const AddressNavLink = styled(NavLink)` 
    color: ${({ theme }) => theme.text3}; 
    font-family: monospace;
     display: flex;
    :hover {
        color: ${({ theme }) => theme.text2};
    } 
`

const ButtonsWrapper = styled.div`
    display:grid;
    grid-auto-flow:column;
`

const SwapCard = styled(PrimaryCard)`
    width: auto;
    grid-area:swap;
`

const InfoCard = styled(PrimaryCard)`
    width: auto;
    grid-area: info;
`

const FeesCard = styled(PrimaryCard)`
    width: auto;
    grid-area: fees;
`

const OwnersCard = styled(PrimaryCard)`
    width: auto;
    grid-area: owners;
    grid-template-columns: 10em 1f 12em;
`


const Numeric = styled.span`
text-align: end;
`
enum Status {
    None,
    Pending,
    Done
}


export const PetalRow = ({flowerAddress, petal, label, setError}:{flowerAddress: string, petal:BalanceInfo, label: string, setError:(error: string) => void}) =>{
    const [balance, setBalance] = useState<string>(petal.balance);
    const { account, library } = useWeb3React();
    const [collectFeeStatus, setCollectFeeStatus] = useState<Status>(Status.None);
    const [transactionHash, setTransactionHash] = useState<string>("");
    const { chain } = useContext(AppContext);

    const collectFee = async () => {
        try {
            setCollectFeeStatus(Status.Pending);
            const service = new FlowerService(library, account!, chain)
            const txResponse = await service.collectFees(flowerAddress, petal.address);
            if (txResponse) {
                const receipt = await txResponse.wait()               
                if (receipt?.status === 1) {
                    setTransactionHash(receipt.transactionHash);
                    setCollectFeeStatus(Status.Done); 
                    setBalance(await service.getBalance(petal.address, account!))          
                }
                else {
                    setError("Transaction Failed");
                    setCollectFeeStatus(Status.None); 
                }
            }          
        }
        catch (e) {
            console.log(e)
            const errorMessage = extractErrorMessage(e);
            if(errorMessage) {
                setError(errorMessage);
            }
            setCollectFeeStatus(Status.None); 
        }
    }

    return (<>
    <TransactionCompletedModal 
                title={"Up Only Completed"}
                hash={transactionHash} 
                isOpen={collectFeeStatus === Status.Done}
                onDismiss={() => setCollectFeeStatus(Status.None)} />
        <FeesRowWrapper key={petal.address}>
            <ButtonPrimary onClick={collectFee}> {collectFeeStatus === Status.Pending ? <PendingContent text={"Collecting..."}/>: label }</ButtonPrimary>
            <AddressNavLink exact={true} to={`/flower/${petal.address}`}>{petal.address}</AddressNavLink>
            <Numeric>{balance}</Numeric>
            <span>ORLY</span>
         </FeesRowWrapper>
         
         </>
    )
}


export const Flowers = () => {
    const { address } = useParams<{ address: string }>();
    const { account, library, chainId } = useWeb3React();
    const [flower, setFlower] = useState<FlowerInfo | undefined>();
    const [payFeesStatus, setPayFeesStatus] = useState<Status>(Status.None);
    const [upOnlyStatus, setUpOnlyStatus] = useState<Status>(Status.None);
    const [price, setPrice] = useState<string>("");
    const [totalSupply, setTotalSupply] = useState<string>("");
    const [pairedBalance, setPairedBalance] =  useState<string>("");
    const [fees, setFees] = useState<string>("");
    const [parent, setParent] = useState<BalanceInfo | undefined>();
    const [petals, setPetals] = useState<BalanceInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [transactionHash, setTransactionHash] = useState<string>("");
    const { chain } = useContext(AppContext);
    const accountBalance = useTokenBalance(address);

    useEffect(() => {

        const getFlower = async () => {           
            if (library && account && chainId && supportedChain(chainId!, chain) && isAddress(address)) {
                const service = new FlowerService(library, account!, chain)
                setLoading(true);
                const flowerInfo = await service.getFlower(address);
                setFlower(flowerInfo);
                setPrice(flowerInfo.price);
                setTotalSupply(flowerInfo.totalSupply);
                setPairedBalance(flowerInfo.pairedBalance);
                setFees(await service.getBalance(flowerInfo.address, "0x6969696969696969696969696969696969696969"));
                setParent(await service.getParent(flowerInfo.address));
                setPetals(await service.getPetalBalances(flowerInfo.address, flowerInfo.petalCount))
                setLoading(false)
            }
        }

        getFlower();

    }, [library, account, chainId, chain, address])

    const payFees = async() => {
        setPayFeesStatus(Status.Pending);
        try {
            const service = new FlowerService(library, account!, chain);
            const txResponse = await service.payFees(flower!.address);
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

    const upOnly = async() => {
        setUpOnlyStatus(Status.Pending);
        try {
            const service = new FlowerService(library, account!, chain);
            const txResponse = await service.upOnly(flower!.address);

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

    const onSwapComplete = async () => {
        const service = new FlowerService(library, account!, chain)
        setPrice(await service.getPrice(flower!.address));
        setTotalSupply(await service.getTotalSupply(flower!.address));
        setPairedBalance(await service.getPairedBalance(flower!.address));
    }

    return (
        account && library && chainId 
        ?
        <PageWrapper>
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
             {loading 
                ? <Loader/> 
                : 
                flower && <> 
                <SwapCard>                    
                    <Swap flower={flower!} onComplete={onSwapComplete}/>
                </SwapCard>
                <InfoCard>
                    <CardContent>
                    <InfoWrapper>
                        <span>Price:</span><span>{price}</span>
                        <span>Total Supply:</span><span>{totalSupply}</span>
                        <span>Paired Balance:</span><span>{pairedBalance}</span>
                        <span>Account Balance:</span><span>{getDisplayBalance(accountBalance)}</span>
                        <span>Burn Rate:</span><span>{flower?.burnRate}%</span>
                        <span>Up Percent:</span><span>{flower?.upPercent}%</span>
                        <span>Up Delay:</span><span>{flower?.upDelay} seconds</span>
                        <span>Petal Count:</span><span>{flower?.petalCount}</span>
                        <span>Owner:</span> 
                        <AddressLink href={getEtherscanLink(chainId!, flower!.owner, 'address')}>
                            <span style={{ marginLeft: '4px' }}>{shortenAddress(flower!.owner)}</span>
                        </AddressLink>
                        <span>Onwer 2:</span>
                        <AddressLink href={getEtherscanLink(chainId!, flower!.owner2, 'address')}>
                            <span style={{ marginLeft: '4px' }}>{shortenAddress(flower!.owner2)}</span>
                        </AddressLink>
                        <span>Owner 3:</span>
                        <AddressLink href={getEtherscanLink(chainId!, flower!.owner3, 'address')}>
                            <span style={{ marginLeft: '4px' }}>{shortenAddress(flower!.owner3)}</span>
                        </AddressLink>
                    </InfoWrapper>
                    <ButtonsWrapper>
                        <ButtonPrimary onClick={upOnly}>
                            {upOnlyStatus === Status.Pending
                                ? <PendingContent text={"Pending..."}/>
                                : "UpOnly" }
                        </ButtonPrimary>
                    </ButtonsWrapper>
                    </CardContent>
                </InfoCard>
                <FeesCard>
                    <FeesRowWrapper>
                        <ButtonPrimary onClick={payFees}>
                            {payFeesStatus === Status.Pending
                                ? <PendingContent text={"Pending..."}/>
                                : "Pay Fees" }
                        </ButtonPrimary>
                        <div/>
                        <Numeric>{getDisplayBalance(fees)}</Numeric>
                        <span>ORLY</span>
                    </FeesRowWrapper>
                    {parent && <PetalRow setError={setError} key={parent.address} flowerAddress={flower.address} petal={parent} label={"Collect Fees from Parent"}/>}               
                    {petals && petals.length > 0 && petals.map((x,i)=><PetalRow key={x.address} setError={setError} flowerAddress={x.address} petal={x} label={`Collect Fees from Petal ${i + 1}`}/>)}
                    {error ? <ErrorMessage error={error} /> : null}
                </FeesCard>
                <OwnersCard>
                   <Owner flower={flower}/>
                </OwnersCard>
                </>}
        </PageWrapper>
        : null
    )
}