import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={props.center
    }
  >
    {props.isMarkerShown && props.mymarkers.map((place,index) =>
      <Marker key={index} position={{lat:place.lat, lng:place.lng}} />
  )}
  </GoogleMap>
))

class Map extends Component {
  render() {
    return (
      <div className="my-map-container">
      <MyMapComponent
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?&key=AIzaSyB63D2az3Guib3VGk7Auoie1fyG3lY1SzQ&v=3"
      loadingElement={<div style={{ height: `700px`, width:`700px`}} />}
      containerElement={<div style={{ height: `700px`, width:`700px`}} />}
      mapElement={<div style={{ height: `700px`, width:`700px`}} />}
    />
    </div>
)
}}
export default Map;
