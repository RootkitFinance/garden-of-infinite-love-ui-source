import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Web3ReactManager from './components/Web3ReactManager';
import { Home } from './pages/Home';
import { Switch, Route, HashRouter } from 'react-router-dom';
import ToastProvider from './components/ToastProvider';
import TransactionsProvider from './contexts/Transactions/TransactionsProvider';
import { ControlCenterProvider } from './contexts/ControlCenterContext';
import { PairedFlowers } from './pages/PairedFlowers';
import { Flowers } from './pages/Flowers';

const AppWrapper = styled.div`
  
`
const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  padding: 1em;
  position: sticky;
  top:0;
  z-index: 2;
`
const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding-bottom: 6em;
  `};
`
export const App = () => {
  
  return (
    <HashRouter>     
      <AppWrapper>
        <TransactionsProvider>
          <ControlCenterProvider>                   
            <HeaderWrapper>
              <Header />
            </HeaderWrapper>
            <BodyWrapper>
              <Web3ReactManager>
                <ToastProvider>
                  <Switch>
                    <Route exact strict path="/" component={Home} />    
                    <Route exact strict path="/paired/:address" component={PairedFlowers} />
                    <Route exact strict path="/flower/:address" component={Flowers} />    
                  </Switch>
                  </ToastProvider>
                </Web3ReactManager>
            </BodyWrapper>
          </ControlCenterProvider>
        </TransactionsProvider>
      </AppWrapper>
  </HashRouter>
  );
}

export default App;
