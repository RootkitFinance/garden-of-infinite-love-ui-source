import React, { useContext, useEffect, useState } from "react"
import CurrencyInput from "../CurrencyInput"
import { useWeb3React } from "@web3-react/core"
import ActionModal from "../ActionModal"
import { ControlCenterContext } from "../../contexts/ControlCenterContext";
import { supportedChain } from "../../utils";
import { FlowerService } from "../../services/FlowerService";

const BuyAndTax = ({ flowerAddress, isOpen, onDismiss } : { flowerAddress: string, isOpen: boolean, onDismiss: () => void }) => {
    const { account, library, chainId } = useWeb3React()
    const [value, setValue] = useState<string>("")    
    const [balance, setBalance] = useState<string>("")
    const { chain } = useContext(ControlCenterContext);

    useEffect(() => {
        const getBalance = async () => setBalance(await new FlowerService(library, account!, chain).getBalance(flowerAddress, account!));
        if(isOpen && chainId && supportedChain(chainId!, chain)) {
            getBalance()
        }
    }, [chain, flowerAddress, library, account, isOpen, chainId])

    const buyAndTax = async () => {
        const amount = parseFloat(value);
        if (!Number.isNaN(amount) && amount > 0){
            return await await new FlowerService(library, account!, chain).sell(flowerAddress, value);
        }
    }

    const close = () => {
        setValue("");
        onDismiss();
    }

    return (
        <ActionModal isOpen={isOpen} onDismiss={close} action={buyAndTax} title={"Sell"}>
            <CurrencyInput
                value={value}
                balance={balance}
                onSubmit={buyAndTax}
                ticker={""}
                label={"Amount to spend"}
                onMax={() => setValue(balance.toString())}
                showMaxButton={true}
                onUserInput={(x) => setValue(x)}
                id={"amountToSpendInput"} />
        </ActionModal>
    )
}

export default BuyAndTax