import { Contract } from '@ethersproject/contracts'
import erc20Abi from '../constants/abis/erc20.json'
import { Web3Provider } from '@ethersproject/providers'
import BigNumber from 'bignumber.js'
import { MaxUint256 }from '@ethersproject/constants'

export class TokenService {
    public contract: Contract
    public account: string
    public tokenAddress: string

    public constructor(library: Web3Provider, account: string, tokenAddress: string) {
        const signer = library.getSigner(account).connectUnchecked();
        this.contract = new Contract(tokenAddress, erc20Abi, signer);
        this.account = account;
        this.tokenAddress = tokenAddress;
    }

    public async getBalance(account: string) {
        return await this.contract.balanceOf(account)
    }

    public async isApproved (spender: string) {
        const allowance = await this.contract.allowance(this.account, spender);
        const currentAllowance = new BigNumber(allowance.toString());
        return !currentAllowance.isNaN() && !currentAllowance.isZero();
    }

    public async approve (spender: string) {    
        const approved = await this.isApproved(spender);
        if (!approved) {
            return await this.contract.approve(spender, MaxUint256);
        }        
    }
}