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
    public owner: string;
    public owner2: string;
    public owner3: string;
    public petalsLoaded: boolean;
    public petals: string[];

    constructor(
        address: string, 
        pairedAddress: string, 
        price: string, 
        totalSupply: string, 
        pairedBalance: string, 
        burnRate: string, 
        upPercent: string, 
        upDelay: string, 
        petalCount: number, 
        owner: string, 
        owner2: string, 
        owner3: string) {    
        this.address = address;
        this.pairedAddress = pairedAddress;
        this.price = price;
        this.totalSupply = totalSupply;
        this.pairedBalance = pairedBalance;
        this.burnRate = burnRate;
        this.upPercent = upPercent;
        this.upDelay = upDelay;
        this.petalCount = petalCount;
        this.owner = owner;
        this.owner2 = owner2;
        this.owner3 = owner3;
        this.petalsLoaded = false;
        this.petals = [];
    }
}