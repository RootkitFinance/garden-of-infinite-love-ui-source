import { Contract } from '@ethersproject/contracts'
import gardenOfInfiniteLoveAbi from '../constants/abis/gardenOfInfiniteLove.json'
import octalilyAbi from '../constants/abis/octalily.json'
import erc20abi from '../constants/abis/erc20.json'
import { Web3Provider } from '@ethersproject/providers'
import { Chain, DEPLOYER_ADDRESS, gardenAddresses } from '../constants'
import { getDisplayBalance } from '../utils/formatBalance'
import { FlowerInfo } from '../dtos/FlowerInfo'
import { parseEther } from '@ethersproject/units'
import { BalanceInfo } from '../dtos/BalanceInfo'
import { ImmutableFlowerInfo } from '../dtos/ImmutableFlowerInfo'

export class FlowerService {
    private signer: any;
    private chain: Chain;
    private account: string;

    constructor(library: Web3Provider, account: string, chain: Chain) {
        this.signer = library.getSigner(account).connectUnchecked();
        this.account = account;
        this.chain = chain;
    }

    // public async getAllFlowers(){
    //     const service = new CacheService(this.chain);
    //     const parentTokens = await service.getParentTokens();
    //     const flowers: FlowerInfo[] = [];

    //     for(let i = 0; i < parentTokens.length; i++){
    //         const pairedAddress = parentTokens[i].address;
    //         const contract = new Contract(gardenAddresses.get(this.chain)!, gardenOfInfiniteLoveAbi, this.signer);       
    //         const count = parseInt(await contract.flowersOfPair(pairedAddress));
    //         if (count === 0) continue;
    //         for(let j = 0; j < count; j++){
    //             const flowerAddress = await contract.pairedFlowers(pairedAddress, j);
    //             const data = await contract.flowers(flowerAddress);
    //             const info = await this.getInfo(pairedAddress, flowerAddress, data);
    //             for(let k = 1; k <= info.petalCount; k++){
    //                 info.petals.push(await contract.theEightPetals(k))
    //             }

    //             flowers.push(info);
    //         }            
    //    }

    //    console.log(JSON.stringify(flowers));
    // }

    // public async getFlowers(pairedAddress: string){
    //     const flowers: FlowerInfo[] = [];
    //     const parent = (await this.getParentFlower(pairedAddress))!;
    //     parent.petalsLoaded = true;
    //     flowers.push(parent!);
    //     const petals = await this.getPetals(parent!.address);       
        
    //     for (let i = 0; i < petals.length; i++){
    //         const petal = petals[i];
    //         petal.petalsLoaded = true;
    //         flowers.push(petal);
    //         const children = await this.getPetals(petal.address, petal.petalCount);
    //         for(let j = 0; j < children.length; j++){
    //             flowers.push(children[j]!);
    //         }
            
    //     }
    //     console.log(JSON.stringify(flowers));
    //     return flowers;
    // }

    public async deserializeFlowers(pairedAddress: string) {
        const response = await fetch(`flowers/${pairedAddress}.json`, {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
        });
        return await response.json();
    }

    public async getParentFlower(pairedAddress: string) {
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

    public async getPrice(flowerAddress: string){
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return getDisplayBalance(await contract.price(), 18, 8);
    }

    public async getTotalSupply(flowerAddress: string){
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return getDisplayBalance(await contract.totalSupply(), 18, 0);
    }

    public async getPairedBalance(flowerAddress: string){
        const gardenContract = new Contract(gardenAddresses.get(this.chain)!, gardenOfInfiniteLoveAbi, this.signer);
        const data = await gardenContract.flowers(flowerAddress);
        return getDisplayBalance(await this.getBalance(data.pairedAddress, flowerAddress));
    }

    public async getImmutableFlower(flowerAddress: string) {
        const gardenContract = new Contract(gardenAddresses.get(this.chain)!, gardenOfInfiniteLoveAbi, this.signer);
        const data = await gardenContract.flowers(flowerAddress);
        const burnRate = parseFloat(data.burnRate.toString())/100;
        const upPercent = parseFloat(data.upPercent.toString())/100;

        return new ImmutableFlowerInfo(
            flowerAddress, 
            data.pairedAddress, 
            burnRate.toString(), 
            upPercent.toString(), 
            data.upDelay.toString())
    }

    public async getFlower(flowerAddress: string){
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        const gardenContract = new Contract(gardenAddresses.get(this.chain)!, gardenOfInfiniteLoveAbi, this.signer);
        const data = await gardenContract.flowers(flowerAddress);
        const balance = getDisplayBalance(await this.getBalance(data.pairedAddress, flowerAddress));     
        const price = getDisplayBalance(await contract.price(), 18, 8);
        const totalSupply = getDisplayBalance(await contract.totalSupply(), 18, 0);
        const petals = await contract.petalCount();
        const burnRate = parseFloat(data.burnRate.toString())/100;
        const upPercent = parseFloat(data.upPercent.toString())/100;
        const owner = await contract.owner();
        const owner2 = await contract.owner2();
        const owner3 = await contract.owner3();

        return new FlowerInfo(
            flowerAddress, 
            data.pairedAddress,
            price, 
            totalSupply, 
            balance, 
            burnRate.toString(), 
            upPercent.toString(), 
            data.upDelay.toString(), 
            parseInt(petals.toString()),
            owner, 
            owner2, 
            owner3);
    }

    private async getInfo(pairedAddress: string, flowerAddress: string, data: any) {
        const balance = getDisplayBalance(await this.getBalance(pairedAddress, flowerAddress));
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        const price = getDisplayBalance(await contract.price(), 18, 8);
        const totalSupply = getDisplayBalance(await contract.totalSupply(), 18, 0);
        const petals = await contract.petalCount();
        const burnRate = parseFloat(data.burnRate.toString())/100;
        const upPercent = parseFloat(data.upPercent.toString())/100;
        const owner = await contract.owner();
        const owner2 = await contract.owner2();
        const owner3 = await contract.owner3();

        return new FlowerInfo(
            flowerAddress, 
            pairedAddress, 
            price, 
            totalSupply, 
            balance, 
            burnRate.toString(), 
            upPercent.toString(), 
            data.upDelay.toString(), 
            parseInt(petals.toString()),
            owner, 
            owner2, 
            owner3);
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
        return await contract.letTheFlowersCoverTheEarth({ gasLimit: 3696969 });
    }
    
    public async getBalance(tokenAddress: string, account: string) {
        const erc20Contract = new Contract(tokenAddress, erc20abi, this.signer);
        return await erc20Contract.balanceOf(account);
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

    public async getOwner2(flowerAddress: string) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return await contract.owner2();
    }

    public async getOwner3(flowerAddress: string) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return await contract.owner3();
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

    public async getPetals(flowerAddress: string) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        const petalsCount = parseInt((await contract.petalCount()).toString());
        const petals: ImmutableFlowerInfo[] = [];
        for(let i = 1; i <= petalsCount; i++){
            const petalAddress = await contract.theEightPetals(i);
            const petal = await this.getImmutableFlower(petalAddress);
            petals.push(petal);
        }
        
        return petals;
    }

    public async getParent(flowerAddress: string) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        const parent = await contract.parentFlower(); 
        
        if (!parent || parent.toString().toLowerCase() === DEPLOYER_ADDRESS.toLowerCase()) return undefined;       
        const balance = getDisplayBalance(await this.getBalance(parent, this.account))
        return new BalanceInfo(parent, balance);
    }

    public async getPetalBalances(flowerAddress: string, petalsCount: number) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        const petals: BalanceInfo[] = [];
        for(let i = 1; i <= petalsCount; i++){
            const petalAddress = await contract.theEightPetals(i);
            const balance = getDisplayBalance(await this.getBalance(petalAddress, this.account))
            petals.push(new BalanceInfo(petalAddress, balance));
        }
        
        return petals;
    }

    public async collectFees(flowerAddress: string, otherFlowerAddress: string) {
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return await contract.sellOffspringToken(otherFlowerAddress);
    }

    public async setOwners(flowerAddress: string, owner2: string, owner3: string){
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return await contract.sharingIsCaring(owner2, owner3);
    }

    public async lockOwners(flowerAddress: string, owner2Locked: boolean, owner3Locked: boolean){
        const contract = new Contract(flowerAddress, octalilyAbi, this.signer);
        return await contract.lockOwners(owner2Locked, owner3Locked);
    }
}