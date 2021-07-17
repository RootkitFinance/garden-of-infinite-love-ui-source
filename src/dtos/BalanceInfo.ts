export class BalanceInfo {
    public address: string
    public balance: string

    constructor(address: string, balance: string) {
        this.address = address
        this.balance = balance
    }
}