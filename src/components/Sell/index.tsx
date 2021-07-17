import React, { useContext, useEffect, useState } from "react"
import CurrencyInput from "../CurrencyInput"
import { useWeb3React } from "@web3-react/core"
import ActionModal from "../ActionModal"
import { AppContext } from "../../contexts/AppContext";
import { supportedChain } from "../../utils";
import { FlowerService } from "../../services/FlowerService";
import { getBalanceNumber, getDisplayBalance, getFullDisplayBalance } from "../../utils/formatBalance"

const Sell = ({ flowerAddress, isOpen, onDismiss } : { flowerAddress: string, isOpen: boolean, onDismiss: () => void }) => {
    const { account, library, chainId } = useWeb3React();
    const [value, setValue] = useState<string>("");    
    const [balance, setBalance] = useState<any>();
    const { chain } = useContext(AppContext);

    useEffect(() => {
        const getBalance = async () => setBalance(await new FlowerService(library, account!, chain).getBalance(flowerAddress, account!));
        if(isOpen && chainId && supportedChain(chainId!, chain)) {
            getBalance()
        }
    }, [chain, flowerAddress, library, account, isOpen, chainId])

    const sell = async () => {
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
        <ActionModal isOpen={isOpen} onDismiss={close} action={sell} title={"Sell"}>
            <CurrencyInput
                value={value}
                balance={balance ? getDisplayBalance(balance) : "0"}
                numericBalance={balance ? getBalanceNumber(balance) : 0}
                onSubmit={sell}
                ticker={""}
                label={"Amount to spend"}
                onMax={() => setValue(getFullDisplayBalance(balance))}
                showMaxButton={true}
                onUserInput={(x) => setValue(x)}
                id={"amountToSpendInput"} />
        </ActionModal>
    )
}

export default Sell