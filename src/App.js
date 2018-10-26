import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
import Menu from './Menu.js'

class App extends Component {
  constructor(props) {
    super(props)
  this.state = {
    places : [
       {name: "The Roost", location: {lat:38.9666393, lng: -95.235518}},
       {name: "Love Garden Sounds", location: {lat: 38.9684721, lng : -95.23553029999999}}
     ],
     placesResp : []
  }
}
componentDidMount() {
  fetch('https://api.foursquare.com/v2/venues/explore?client_id=A01M4GOIYWVQQ3KVZMGJQHB1ASKPDDRY4RWJZTT0SA2DHADQ&client_secret=GOJPCR5SCPPV5ABTCNTRUNRUFPMVN0UJJVOTZZ2M0ADQ0B3D&v=20180323&limit=1&ll=38.9717,-95.2353&query=coffee')
      .then(resp => {
        console.log(resp)
          this.setState({placesResp : resp});
      })
      .catch((error) => {
          console.log(error)
          })

}
  render() {
    return (
      <div className="App">
        <header className="App-header">
        LFK
        </header>
        <Menu places={this.state.places}/>
          <Map
          places={this.state.places}
        />

      </div>
    );
  }
}

export default App;
