import { Chain } from '../constants'

export class CacheService {
    private chain: Chain;

    constructor(chain: Chain) {
        this.chain = chain;
    }
    public getParentTokens = async () => await this.loadJsonData(`tokens/${this.chainToFileName()}.json`);
    
    public getFlowerTokens = async () => await this.loadJsonData(`flowers/${this.chainToFileName()}.json`);

    private async loadJsonData(path: string) {
        const response = await fetch(path, {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
        });
        return await response.json();
    }

    private chainToFileName = () => this.chain === Chain.Ethereum ? "eth" : this.chain === Chain.Bsc ? "bsc" :  "matic";
}