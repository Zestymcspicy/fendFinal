import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import FavoriteButton from './FavoriteButton.js'

const MyMapComponent = withScriptjs(
  withGoogleMap((props) =>
    <GoogleMap
      defaultZoom={8}
      zoom={props.zoom}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      center={{lat: props.centerLat, lng: props.centerLng}}
      >
    {props.mymarkers && props.mymarkers.filter(marker => marker.isVisible).map((marker,index) => {
      return <Marker
      name={marker.name}
      key={index}
      position={{lat:marker.lat, lng:marker.lng}}
      animation= {window.google.maps.Animation.DROP}
      onClick={()=> props.handleMarkerClick(marker)}>
      {marker.isOpen && (
        <InfoWindow className="info-window">
            <React.Fragment>
              <p>{marker.name}</p>
              {(props.presentvenue.photo) ? (
                <img alt={marker.name}
                  src={props.presentvenue.photo}/>)
                  :
                  (<p>No Image Available</p>)}
                <FavoriteButton
                  setNewFavorites={props.setNewFavorites}
                  user={props.user}
                  markerId={marker.id}
                  isFavorite={marker.isFavorite}/>
            </React.Fragment>
        </InfoWindow>
      )}
      </Marker>
  })}
  </GoogleMap>
))

class Map extends Component {

// componentDidMount(){
//   this.props.setNewFavorites()
// }


  render() {
    const mapClass = this.props.hideSidebar? `map-or-login` : `show-menu-map`;
    return (
      <div className={mapClass}>
      <MyMapComponent
      {...this.props}
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?&key=AIzaSyB63D2az3Guib3VGk7Auoie1fyG3lY1SzQ&v=3"
      loadingElement={<div style={{ height: `100%`}} />}
      containerElement={<div style={{width:`100%`, height: `800px`}} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
    </div>
)
}}
export default Map;
