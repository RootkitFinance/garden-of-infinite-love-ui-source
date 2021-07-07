import { TokenInfo } from "./TokenInfo"

export class TokenBalanceInfo {
    public token: TokenInfo
    public balance: string

    constructor(token: TokenInfo, balance: string) {
        this.token = token
        this.balance = balance
    }
}