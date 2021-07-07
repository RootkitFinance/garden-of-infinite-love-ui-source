import { TokenInfo } from "./TokenInfo"

export class PoolInfo {
    public token: TokenInfo
    public tokenBalance: string
    public rootBalance: string
    public lpBalance: string
    public rootPrice: string    

    constructor(token: TokenInfo, tokenBalance: string, rootBalance: string, lpBalance: string, rootPrice: string) {
        this.token = token
        this.tokenBalance = tokenBalance
        this.rootBalance = rootBalance
        this.lpBalance = lpBalance
        this.rootPrice = rootPrice
    }
}