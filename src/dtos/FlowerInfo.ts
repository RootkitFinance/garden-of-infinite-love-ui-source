export class FlowerInfo {   
    public address: string
    public pairedAddress: string
    public price: string
    public totalSupply: string
    public pairedBalance: string

    constructor(address: string, pairedAddress: string, price: string, totalSupply: string, pairedBalance: string) {        
        this.address = address;
        this.pairedAddress = pairedAddress;
        this.price = price;
        this.totalSupply = totalSupply;
        this.pairedBalance = pairedBalance;
    }
}