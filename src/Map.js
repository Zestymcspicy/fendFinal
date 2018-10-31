import React, { Component } from  'react'

var LFKMap;

class Map extends Component {
  constructor(props) {
    super(props);
    this.initMap = this.initMap.bind(this);    
  }


    markers = [];



  async componentDidMount() {
      window.initMap = this.initMap;
      loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyB63D2az3Guib3VGk7Auoie1fyG3lY1SzQ&v=3&callback=initMap")
}


  initMap = () => {
    LFKMap = new window.google.maps.Map(document.getElementById('LFKMap'), {
      center: {lat: 38.9717, lng: -95.2353},
         zoom: 16
    });
    this.setInitialMarkers();
    this.setMapBounds();
  }

  setInitialMarkers() {
    for (var i = 0; i< this.props.places.length; i++) {
      var position = this.props.places[i].location;
      var title = this.props.places[i].title;

      var marker = new window.google.maps.Marker({
        position: position,
        title: title,
        map: window.LFKMap,
        animation: window.google.maps.Animation.DROP,
        id: i
      });

      this.markers.push(marker)
    }
  }

  setMapBounds()  {
    var bounds = new window.google.maps.LatLngBounds();
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(LFKMap);
      bounds.extend(this.markers[i].position);
     }
     LFKMap.fitBounds(bounds);
   }

  render() {
    return (
      <div className='map-container'>
      <div id='LFKMap'></div>
      </div>
    )
  }
}


//build the script element to attach the google maps api to
function loadJS(src) {
  let ref = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = src;
  script.async = true;
  script.defer = true;
  ref.parentNode.insertBefore(script, ref);
}

export default Map;
