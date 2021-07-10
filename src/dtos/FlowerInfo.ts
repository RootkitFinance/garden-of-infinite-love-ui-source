export class FlowerInfo {   
    public address: string;
    public pairedAddress: string;
    public price: string;
    public totalSupply: string;
    public pairedBalance: string;
    public burnRate: string;
    public upPercent: string;
    public upDelay: string;
    public petalCount: number;

    constructor(address: string, pairedAddress: string, price: string, totalSupply: string, pairedBalance: string, burnRate: string, upPercent: string, upDelay: string, petalCount: number) {        
        this.address = address;
        this.pairedAddress = pairedAddress;
        this.price = price;
        this.totalSupply = totalSupply;
        this.pairedBalance = pairedBalance;
        this.burnRate = burnRate;
        this.upPercent = upPercent;
        this.upDelay = upDelay;
        this.petalCount = petalCount;
    }
}