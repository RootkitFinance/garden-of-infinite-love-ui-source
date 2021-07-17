export class ImmutableFlowerInfo {   
    public address: string;
    public pairedAddress: string;    
    public burnRate: string;
    public upPercent: string;
    public upDelay: string;
    public petalsLoaded: boolean

    constructor(
        address: string, 
        pairedAddress: string,       
        burnRate: string, 
        upPercent: string, 
        upDelay: string) {    
        this.address = address;
        this.pairedAddress = pairedAddress;
        this.burnRate = burnRate;
        this.upPercent = upPercent;
        this.upDelay = upDelay;
        this.petalsLoaded = false;
    }
}