import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(
  withGoogleMap((props) =>
    <GoogleMap
      defaultZoom={8}
      zoom={props.zoom}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      center={props.center}
      >
    {props.mymarkers && props.mymarkers.filter(marker => marker.isVisible).map((place,index) =>
      <Marker key={index} position={{lat:place.lat, lng:place.lng}} />
  )}
  </GoogleMap>
))

class Map extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     venues: [],
  //     markers: [],
  //     center: [],
  //     zoom: []
  //   };
  // }

  render() {
    return (
      <div className="my-map-container">
      <MyMapComponent
      {...this.props}
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?&key=AIzaSyB63D2az3Guib3VGk7Auoie1fyG3lY1SzQ&v=3"
      loadingElement={<div style={{ height: `100%`}} />}
      containerElement={<div style={{ height: `400px`}} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
    </div>
)
}}
export default Map;
