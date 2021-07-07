export class TradeHistoryInfo {
    public date: string
    public type: string
    public amount: string

    constructor(date: string, type: string, amount: string) {
        this.date = date
        this.type = type
        this.amount = amount
    }
}