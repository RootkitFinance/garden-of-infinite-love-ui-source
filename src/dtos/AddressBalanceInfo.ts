import { TokenBalanceInfo } from "./TokenBalanceInfo"

export class AddressBalanceInfo {
    public name: string
    public address: string
    public balances: TokenBalanceInfo[]

    constructor(name: string, address: string, balances: TokenBalanceInfo[]) {
        this.name = name
        this.address = address
        this.balances = balances
    }
}