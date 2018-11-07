import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
import Menu from './Menu.js'


//Set my clientID and clientSecret for react-foursquare
var foursquare = require('react-foursquare')({
  clientID: 'A01M4GOIYWVQQ3KVZMGJQHB1ASKPDDRY4RWJZTT0SA2DHADQ',
  clientSecret: 'GOJPCR5SCPPV5ABTCNTRUNRUFPMVN0UJJVOTZZ2M0ADQ0B3D'
});

//search parameters for react-foursquare
var params = {
  "near": "Lawrence, KS",
  "query": 'coffee shops',
  "radius": 1500
};

class App extends Component {
  constructor() {
    super()
  this.state = {

     mymarkers: [],
     center: [],
     zoom: 14,
     presentvenue: [],
     query: ''
  }
  this.handleQueryChange = this.handleQueryChange.bind(this)
  this.itemClick =this.itemClick.bind(this)
}

//call to foursquare for data
componentDidMount() {
  foursquare.venues.getVenues(params)
      .then(res=> {
        const  centerLat  = res.response.geocode.feature.geometry.center.lat;
        const  centerLng  = res.response.geocode.feature.geometry.center.lng;
        const center = {lat:centerLat, lng:centerLng}
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
        this.setState({mymarkers, center})
      }).catch(error => {
        alert(`There was an error of ${error}`)
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
    this.openMarker(marker);
}
//openMarker function provides information for the info window and opens the window
  openMarker(marker) {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({mymarkers: Object.assign(this.state.mymarkers, marker)})
    let detailParams = {venue_id : marker.id}
    foursquare.venues.getVenue(detailParams)
        .then(response => {
        const details = Object.assign(response.response.venue, marker);
        this.setState({presentvenue : details})
        })
        .catch(error => {
        this.setState({presentvenue: {}})
      })
    }
//adjusts the list and the markers based on user entry
    handleQueryChange(query) {
      let newMarkers= [];
      this.setState({query: query})
      if (this.state.query==='') {
      newMarkers = this.state.mymarkers.map(marker =>  {
        marker.isVisible = true
        return marker})
    } else {
      newMarkers = this.state.mymarkers.map( marker => {
        if (marker.name.toLowerCase().includes(query.toLowerCase())){
          marker.isVisible = true;
        } else {
          marker.isVisible = false;
        }
    return marker})
  }
  this.setState({mymarkers: newMarkers})
}
//connects the clicked list item to the marker on the map
  itemClick (id) {
    const linkedMarker = this.state.mymarkers.filter(marker=> marker.id===id);
    this.openMarker(linkedMarker[0])
}


  render() {
    const query = this.state.query
    return (
      <div className="App">
          <Menu query={query}
          handleQueryChange={this.handleQueryChange}
          itemClick={this.itemClick}
          places={this.state.mymarkers}/>
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
