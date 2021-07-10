import { Contract } from '@ethersproject/contracts'
import gardenOfInfiniteLoveAbi from '../constants/abis/gardenOfInfiniteLove.json'
import octalilyAbi from '../constants/abis/octalily.json'
import erc20abi from '../constants/abis/erc20.json'
import { Web3Provider } from '@ethersproject/providers'
import { Chain, gardenAddresses } from '../constants'
import { getDisplayBalance } from '../utils/formatBalance'
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
       
        const count = parseInt(await contract.flowersOfPair(pairedAddress));

        const flowerAddrsPromise = [];

        for (let i = 0; i < count; i++){
            flowerAddrsPromise.push(contract.pairedFlowers(pairedAddress, i));
        }

        let flowersAddrs = await Promise.all((flowerAddrsPromise))
        const flowersPromises = [];
        for (let addr of flowersAddrs) {
            flowersPromises.push(this.getInfo(pairedAddress, addr))
        }

        return Promise.all(flowersPromises);
    }

    private async getInfo(pairedAddress: string, flowerAddress: string) {
        const balance = await this.getBalance(pairedAddress, flowerAddress);
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        const price = getDisplayBalance(await contract.price(), 18, 18);
        const totalSupply = getDisplayBalance(await contract.totalSupply());

        return new FlowerInfo(flowerAddress, pairedAddress, price, totalSupply, balance);
    }

    public async buy(flowerAddress: string, value: string) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return await contract.buy(parseEther(value));
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

    public async upOnly(flowerAddress: string) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return await contract.upOnly();
    }

    public async payFees(flowerAddress: string) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return await contract.payFees();
    }

    public async getOwner(flowerAddress: string) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return await contract.owner();
    }

    public async getPendingOwner(flowerAddress: string) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return await contract.pendingOwner();
    }

    public async transferOwnership(flowerAddress: string, newOwner: string) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return await contract.transferOwnership(newOwner);
    }

    public async claimOwnership(flowerAddress: string) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return await contract.claimOwnership();
    }
}