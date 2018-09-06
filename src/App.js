import React, { Component } from 'react';
import './App.css';

import SymbolSelector from './components/symbolSelector';
import Portfolio, { MasterView } from './components/portfolio';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Suzlon Stock Listing
        </header>
        <div className="filter">
          <div className='symbol-selector' colSpan='2'>
              <SymbolSelector />    
          </div>
        </div>
        <div className='app-wrapper'>
          <div className='symbol-holder'>
            <Portfolio />    
          </div>
          <div className='symbol-details'>
            <MasterView />    
          </div>
        </div>
      </div>
    );
  }
}

export default App;
