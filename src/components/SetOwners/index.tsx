import React, { useContext, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import ActionModal from "../ActionModal"
import { AppContext } from "../../contexts/AppContext";
import { FlowerService } from "../../services/FlowerService";
import AddressInput from "../AddressInput";

const SetOwners = ({ flowerAddress, isOpen, onDismiss } : { flowerAddress: string, isOpen: boolean, onDismiss: () => void }) => {
    const { account, library } = useWeb3React();
    const [owner2, setOwner2] = useState<string>("");
    const [owner3, setOwner3] = useState<string>("");
    const { chain } = useContext(AppContext);   

    const transferOwnership = async () => {
        return await new FlowerService(library, account!, chain).setOwners(flowerAddress, owner2, owner3);
    }

    const close = () => {
        setOwner2("");
        setOwner3("");
        onDismiss();
    }

    return (
        <ActionModal isOpen={isOpen} onDismiss={close} action={transferOwnership} title={"Set Owner 2 and Owner 3"}>
            <AddressInput value={owner2} label={"Owner 2"} onChange={setOwner2} />
            <AddressInput value={owner3} label={"Owner 3"} onChange={setOwner3} />
        </ActionModal>
    )
}

export default SetOwners