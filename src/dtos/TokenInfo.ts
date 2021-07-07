export class TokenInfo {
    public symbol: string
    public address: string
    public decimals: number

    constructor(symbol: string, address: string, decimals: number = 18) {
        this.symbol = symbol
        this.address = address
        this.decimals = decimals
    }
}