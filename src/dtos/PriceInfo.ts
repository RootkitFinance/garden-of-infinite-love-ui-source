export class PriceInfo {
    public basePool: string
    public elitePool: string

    constructor(basePool: string, elitePool: string, fiatPool: string = "") {
        this.basePool = basePool;
        this.elitePool = elitePool;
    }
}