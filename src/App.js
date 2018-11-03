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
  constructor() {
    super()
  this.state = {
     myplaces : [],
     mymarkers: [],
     center: [],
     zoom: 14,
     presentvenue: [],
     venueimage : []
  }
}


componentDidMount() {
  foursquare.venues.getVenues(params)
      .then(res=> {
        const  myplaces  = res.response.venues;
        console.log (myplaces);
        const  center  = res.response.geocode.feature.geometry.center;
        const mymarkers = res.response.venues.map( venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            name: venue.name,
            isOpen: false,
            isVisible: true,
            id: venue.id
          }
        })
        this.setState({mymarkers, myplaces, center})
      });
  }

  closeAllMarkers = () => {
    const markers = this.state.mymarkers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({mymarkers: Object.assign(this.state.mymarkers, markers)})
  }

  handleMarkerClick = (marker) => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({mymarkers: Object.assign(this.state.mymarkers, marker)})
    let detailParams = {venue_id : marker.id}
    foursquare.venues.getVenue(detailParams)
        .then(response => {
        const details = Object.assign(response.response.venue, marker);
        this.setState({presentvenue : details})
        details.bestPhoto &&
          this.setState({venueimage : `${details.bestPhoto.prefix}200x200${details.bestPhoto.suffix}`})
        })
    }

handleMouseOver = (marker) => {

}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          LFK
          </header>
          <Menu places={this.state.mymarkers}/>
          <Map className="LFKMap"
          {...this.state}
          handleMarkerClick={this.handleMarkerClick}
          handleMouseOver={this.handleMouseOver}
        />

      </div>
    );
  }
}

export default App;
