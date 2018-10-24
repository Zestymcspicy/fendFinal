import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
import Menu from './Menu.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        LFK
        </header>
        <Menu />
          <Map />

      </div>
    );
  }
}

export default App;
