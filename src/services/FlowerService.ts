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
        const flowers: FlowerInfo[] = [];
        for (let i = 0; i < count; i++){
            const flowerAddress = await contract.pairedFlowers(pairedAddress, i);
            const data = await contract.flowers(flowerAddress);
            const info = await this.getInfo(pairedAddress, flowerAddress, data);
            flowers.push(info);
        }

        return flowers;
    }

    public async getParentFlower(pairedAddress: string){
        const contract = new Contract(gardenAddresses.get(this.chain)!, gardenOfInfiniteLoveAbi, this.signer);       
        const count = parseInt(await contract.flowersOfPair(pairedAddress));
        if (count === 0) { 
            return undefined; 
        }

        const flowerAddress = await contract.pairedFlowers(pairedAddress, 0);
        const data = await contract.flowers(flowerAddress);
        const info = await this.getInfo(pairedAddress, flowerAddress, data);
        return info;
    }

    public async getFlower(flowerAddress: string){
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        const gardenContract = new Contract(gardenAddresses.get(this.chain)!, gardenOfInfiniteLoveAbi, this.signer);
        const data = await gardenContract.flowers(flowerAddress);
        const balance = await this.getBalance(data.pairedAddress, flowerAddress);     
        const price = getDisplayBalance(await contract.price(), 18, 18);
        const totalSupply = getDisplayBalance(await contract.totalSupply());
        const petals = await contract.petalCount();
        const burnRate = parseFloat(data.burnRate.toString())/100;
        const upPercent = parseFloat(data.upPercent.toString())/100;

        return new FlowerInfo(flowerAddress, data.pairedAddress, price, totalSupply, balance, burnRate.toString(), upPercent.toString(), data.upDelay.toString(), parseInt(petals.toString()));
    }

    private async getInfo(pairedAddress: string, flowerAddress: string, data: any) {
        const balance = await this.getBalance(pairedAddress, flowerAddress);
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        const price = getDisplayBalance(await contract.price(), 18, 18);
        const totalSupply = getDisplayBalance(await contract.totalSupply());
        const petals = await contract.petalCount();
        const burnRate = parseFloat(data.burnRate.toString())/100;
        const upPercent = parseFloat(data.upPercent.toString())/100;

        return new FlowerInfo(flowerAddress, pairedAddress, price, totalSupply, balance, burnRate.toString(), upPercent.toString(), data.upDelay.toString(), parseInt(petals.toString()));
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

    public async getPetals(flowerAddress: string, petalsCount: number) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        const petals: FlowerInfo[] = [];
        for(let i = 1; i <= petalsCount; i++){
            const petalAddress = await contract.theEightPetals(i);
            const petal = await this.getFlower(petalAddress);
            petals.push(petal);
        }
        
        return petals;
    }
}