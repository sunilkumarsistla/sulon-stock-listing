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
          <table className='container'>
            <tbody>
              <tr>
                <td className='symbol-selector' colSpan='2'>
                  <SymbolSelector />    
                </td>
              </tr>
              <tr>
                <td className='symbol-holder'>
                  <Portfolio />    
                </td>
                <td className='symbol-details'>
                  <MasterView />    
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
}

export default App;
