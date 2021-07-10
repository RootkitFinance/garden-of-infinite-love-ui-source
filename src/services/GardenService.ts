import { Web3Provider } from '@ethersproject/providers'
import { Chain } from '../constants'
import { TokenInfo } from '../dtos/TokenInfo'

export class GardenService {
    private chain: Chain;

    constructor(library: Web3Provider, account: string, chain: Chain) {
        this.chain = chain;
    }

    public async getParentTokens() {
        let fileName = "eth";
        if (this.chain === Chain.Bsc){
            fileName = "bsc";
        } 
        else if (this.chain === Chain.Matic) {
            fileName = "matic";
        }

        const response = await fetch(`tokens/${fileName}.json`, {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
        });
        const data = await response.json();
        return data.map((x: any)=> new TokenInfo(x.symbol, x.address));
    }
}