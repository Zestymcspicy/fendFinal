import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = withScriptjs(
  withGoogleMap((props) =>
    <GoogleMap
      defaultZoom={8}
      zoom={props.zoom}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      center={props.center}
      >
    {props.mymarkers && props.mymarkers.filter(marker => marker.isVisible).map((marker,index) => {

      return <Marker name={marker.name} key={index} position={{lat:marker.lat, lng:marker.lng}}
      onClick={()=> props.handleMarkerClick(marker)}>
      {marker.isOpen && (
        <InfoWindow className="info-window">
          <React.Fragment>
            <p>{marker.name}</p>
            {(props.presentvenue.bestPhoto) ? (
            <img alt={marker.name}
            src={`${props.presentvenue.bestPhoto.prefix}200x200${props.presentvenue.bestPhoto.suffix}`}/>)
            :
            (<p>No Image Available</p>)}
            </React.Fragment>
        </InfoWindow>
      )}
      </Marker>
  })}
  </GoogleMap>
))

class Map extends Component {




  render() {
    return (
      <div className="my-map-container">
      <MyMapComponent
      {...this.props}
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?&key=AIzaSyB63D2az3Guib3VGk7Auoie1fyG3lY1SzQ&v=3"
      loadingElement={<div style={{ height: `100%`}} />}
      containerElement={<div style={{ height: `600px`}} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
    </div>
)
}}
export default Map;
