import { TransactionResponse } from "@ethersproject/providers";

export class TransactionInfo {
    public description: string
    public response: TransactionResponse

    public constructor(description: string, response: TransactionResponse) {
        this.description = description
        this.response = response
    }
}