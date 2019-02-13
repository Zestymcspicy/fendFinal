import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
import Menu from './Menu.js'
import hamburgerIcon from './hamburger.png'

//Set my clientID and clientSecret for react-foursquare
var foursquare = require('react-foursquare')({
  clientID: 'A01M4GOIYWVQQ3KVZMGJQHB1ASKPDDRY4RWJZTT0SA2DHADQ',
  clientSecret: 'GOJPCR5SCPPV5ABTCNTRUNRUFPMVN0UJJVOTZZ2M0ADQ0B3D'
});

//search parameters for react-foursquare
var params = {
  "near": "Lawrence, KS",
  "query": 'coffee',
  "radius": 1800
};

class App extends Component {
  constructor() {
    super()
  this.state = {
    hideSidebar: true,
    mymarkers: [],
    // center: {},
    centerLat: 0,
    centerLng: 0,
    zoom: 14,
    presentvenue: [],
    query: ''
  }
  this.handleQueryChange = this.handleQueryChange.bind(this)
  this.itemClick =this.itemClick.bind(this)
  this.slideMenu = this.slideMenu.bind(this)
}

//call to foursquare for data
componentDidMount() {
  foursquare.venues.recommendations(params)
      .then(res=> {
        console.log(res.response);
        const  centerLat  = parseFloat(res.response.context.currentLocation.feature.geometry.center.lat);
        const  centerLng  = parseFloat(res.response.context.currentLocation.feature.geometry.center.lng);
        // const  centerLat  = parseFloat(res.response.geocode.feature.geometry.center.lat);
        // const  centerLng  = parseFloat(res.response.geocode.feature.geometry.center.lng);
        // const mymarkers = res.response.venues.map( venue => {
        const mymarkers = res.response.group.results.map( x => {
          let venue = x.venue;
          let photo;
          x.photo!==undefined?
            photo = `${x.photo.prefix}200x200${x.photo.suffix}`:
            photo = undefined;
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            name: venue.name,
            isOpen: false,
            isVisible: true,
            id: venue.id,
            photo: photo
          }
        })
        this.setState({mymarkers, centerLat, centerLng})
      }).catch(error => {
        alert(`There was an error of ${error}`)
      });
      window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    if(window.innerWidth>675&&this.state.hideSidebar===false) {
    this.setState({hideSidebar: true})
    }
  }


  slideMenu() {
    this.state.hideSidebar?
    this.setState({hideSidebar : false}):
    this.setState({hideSidebar : true});
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
    this.setState({
      mymarkers: Object.assign(this.state.mymarkers, marker),
      presentvenue : marker,
      centerLat: marker.lat,
      centerLng: marker.lng
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
      <header>
      <button
      id="hamburger"
      onClick={this.slideMenu}
      ><img src={hamburgerIcon} alt="hamburger" height="35" width="32"/></button>
      <h1>LFKoffee</h1>
      </header>
          <Menu query={query}
          hideSidebar={this.state.hideSidebar}
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
