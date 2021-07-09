import BigNumber from 'bignumber.js'

export const getBalanceNumber = (balance: any, decimals = 18) => {
  const displayBalance = new BigNumber(balance.toString()).dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toNumber()
}

export const getDisplayBalance = (balance: any, decimals = 18, displayDecimals = 4) => {
  const displayBalance = new BigNumber(balance.toString()).dividedBy(new BigNumber(10).pow(decimals))
  return parseFloat(displayBalance.toFixed(displayDecimals, 1)).toLocaleString(undefined, { maximumFractionDigits: displayDecimals, minimumFractionDigits: displayDecimals })
}

export const toNumber = (balance: any, decimals = 18) => {
  const displayBalance = new BigNumber(balance.toString()).dividedBy(new BigNumber(10).pow(decimals))  
  return displayBalance.toNumber()
}

export const getFullDisplayBalance = (balance: any, decimals = 18) => {
  return new BigNumber(balance.toString()).dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}
