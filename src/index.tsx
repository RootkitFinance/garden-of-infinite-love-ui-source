import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { NetworkContextName } from './constants';
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from './theme';
import { Web3Provider } from '@ethersproject/providers';
import ToastProvider from './components/ToastProvider';

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false; 

  // Refresh page on network change
  // https://github.com/ethers-io/ethers.js/issues/866
  // The "any" network will allow spontaneous network changes
  const provider = new Web3Provider(window.ethereum as any, "any");
  provider.on("network", (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
          window.location.reload();
      }
  });
}

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}

window.addEventListener('error', error => {
 console.log(`${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`)
})

ReactDOM.render(
  <React.StrictMode>
     <FixedGlobalStyle />
      <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <ThemeProvider>
          <ThemedGlobalStyle /> 
          <ToastProvider>
          <App />
          </ToastProvider>        
          
        </ThemeProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
