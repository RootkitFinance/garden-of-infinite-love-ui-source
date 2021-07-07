import { Contract } from '@ethersproject/contracts'
import gardenOfInfiniteLoveAbi from '../constants/abis/gardenOfInfiniteLove.json'
import octalilyAbi from '../constants/abis/octalily.json'
import erc20abi from '../constants/abis/erc20.json'
import { Web3Provider } from '@ethersproject/providers'
import { Chain, gardenAddresses } from '../constants'
import { getBalanceNumber, getDisplayBalance } from '../utils/formatBalance'
import { FlowerInfo } from '../dtos/FlowerInfo'
import { parseEther } from '@ethersproject/units'

export class FlowerService {
    private signer: any;
    private chain: Chain;

    constructor(library: Web3Provider, account: string, chain: Chain) {
        this.signer = library.getSigner(account).connectUnchecked();
        this.chain = chain;
    }

    public async getFlowers(pairedAddress: string){
        const contract = new Contract(gardenAddresses.get(this.chain)!, gardenOfInfiniteLoveAbi, this.signer);
        console.log(this.chain);
        console.log(contract.address);
        const count = getBalanceNumber(await contract.flowersOfPair(pairedAddress));
        const flowers: FlowerInfo[] = [];
        
        for (let i = 0; i < count; i++){
            const flowerAddress = await contract.pairedFlowers(pairedAddress, i);
            const info = await this.getInfo(pairedAddress, flowerAddress);
            flowers.push(info);
        }

        return flowers;
    }

    private async getInfo(pairedAddress: string, flowerAddress: string) {
        const balance = await this.getBalance(pairedAddress, flowerAddress);
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        const price = getDisplayBalance(await contract.price());
        const totalSupply = getDisplayBalance(await contract.totalSupply());

        return new FlowerInfo(flowerAddress, pairedAddress, price, totalSupply, balance);
    }

    public async buy(flowerAddress: string) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return await contract.buy();
    }

    public async sell(flowerAddress: string, value: string) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return await contract.sell(parseEther(value));
    }

    public async letTheFlowersCoverTheEarth(flowerAddress: string) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return await contract.letTheFlowersCoverTheEarth();
    }
    
    public async getBalance(tokenAddress: string, account: string) {
        const erc20Contract = new Contract(tokenAddress, erc20abi, this.signer);
        return getDisplayBalance(await erc20Contract.balanceOf(account));
    }
}