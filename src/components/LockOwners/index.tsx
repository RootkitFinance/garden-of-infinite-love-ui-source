import React, { useContext, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import ActionModal from "../ActionModal"
import { AppContext } from "../../contexts/AppContext";
import { FlowerService } from "../../services/FlowerService";
import styled from "styled-components";
import Toggle from "../Toggle";

const ToggleWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 1em;  
    align-items: center;  
`

const ToggleLabel = styled.span`
    color: ${({ theme }) => theme.text3};
    font-size: 0.875em;
    padding-left: 1em;
`

const LockOwners = ({ flowerAddress, isOpen, onDismiss } : { flowerAddress: string, isOpen: boolean, onDismiss: () => void }) => {
    const { account, library } = useWeb3React();
    const [owner2Locked, setOwner2Locked] = useState<boolean>(false);
    const [owner3Locked, setOwner3Locked] = useState<boolean>(false);
    const { chain } = useContext(AppContext);   

    const transferOwnership = async () => {
        return await new FlowerService(library, account!, chain).lockOwners(flowerAddress, owner2Locked, owner3Locked);
    }

    const close = () => {
        setOwner2Locked(false);
        setOwner3Locked(false);
        onDismiss();
    }

    return (
        <ActionModal isOpen={isOpen} onDismiss={close} action={transferOwnership} title={"Lock"}>
            <ToggleWrapper>
               <ToggleLabel>Owner 2 Locked</ToggleLabel>
               <Toggle isActive={owner2Locked} toggle={() => setOwner2Locked(!owner2Locked)}/>
               <ToggleLabel>Owner 3 Locked</ToggleLabel>
               <Toggle isActive={owner3Locked} toggle={() => setOwner3Locked(!owner3Locked)}/>
           </ToggleWrapper> 
        </ActionModal>
    )
}

export default LockOwners