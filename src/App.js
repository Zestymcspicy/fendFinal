import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
import Menu from './Menu.js'

var foursquare = require('react-foursquare')({
  clientID: 'A01M4GOIYWVQQ3KVZMGJQHB1ASKPDDRY4RWJZTT0SA2DHADQ',
  clientSecret: 'GOJPCR5SCPPV5ABTCNTRUNRUFPMVN0UJJVOTZZ2M0ADQ0B3D'
});

var params = {
  "near": "Lawrence, KS",
  "query": 'coffee shops',
  "radius": 1500
};

class App extends Component {
  constructor(props) {
    super(props)
  this.state = {
    places : [
       {name: "The Roost", location: {lat:38.9666393, lng: -95.235518}},
       {name: "Love Garden Sounds", location: {lat: 38.9684721, lng : -95.23553029999999}}
     ],
     items : [],
     myplaces : [],
     mymarkers: [],
     center: [],
     zoom: 12
  }
}
componentDidMount() {
  foursquare.venues.getVenues(params)
      .then(res=> {
        const myplaces = res.response;
        console.log (myplaces)
        const center = myplaces.geocode.feature.geometry.center;
        const mymarkers = res.response.venues.map( venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            name: venue.location.name
          }
        })
        this.setState({mymarkers, myplaces, center})
        this.setState({ items: res.response.venues });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          LFK
          </header>
          <Menu places={this.state.items}/>
          <Map className="LFKMap"
          {...this.state} center={this.state.center}
        />

      </div>
    );
  }
}

export default App;
