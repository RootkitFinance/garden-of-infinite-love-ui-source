import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'

const useBlock = () => {
    const [block, setBlock] = useState(0)
    const { chainId, library } = useWeb3React() 

    useEffect(() => {       
        const interval = setInterval(async () => {
          const latestBlockNumber = await library.getBlockNumber()
          if (block !== latestBlockNumber) {
            setBlock(latestBlockNumber)
          }
        }, 2000)    
        return () => clearInterval(interval)
      }, [chainId])
    
      return block
}

export default useBlock