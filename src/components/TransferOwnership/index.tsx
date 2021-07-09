import React, { useContext, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import ActionModal from "../ActionModal"
import { ControlCenterContext } from "../../contexts/ControlCenterContext";
import { FlowerService } from "../../services/FlowerService";
import AddressInput from "../AddressInput";

const TransferOwnership = ({ flowerAddress, isOpen, onDismiss } : { flowerAddress: string, isOpen: boolean, onDismiss: () => void }) => {
    const { account, library } = useWeb3React();
    const [owner, setOwner] = useState<string>("");
    const { chain } = useContext(ControlCenterContext);   

    const transferOwnership = async () => {
        return await new FlowerService(library, account!, chain).transferOwnership(flowerAddress, owner);
    }

    const close = () => {
        setOwner("");
        onDismiss();
    }

    return (
        <ActionModal isOpen={isOpen} onDismiss={close} action={transferOwnership} title={"Transfer Ownership"}>
            <AddressInput value={owner} label={"New Owner"} onChange={setOwner} />
        </ActionModal>
    )
}

export default TransferOwnership