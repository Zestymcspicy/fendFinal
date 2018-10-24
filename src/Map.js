import React, { Component } from  'react'

var LFKMap;

class Map extends Component {
  constructor(props) {
    super(props)
  this.state = {
    places : [
      {name: "The Roost", location: {lat:38.9666393, lng: -95.235518}},
      {name: "Love Garden Sounds", location: {lat: 38.9684721, lng : -95.23553029999999}}
    ],
    markers : []
  }
}

  async componentDidMount() {
      window.initMap = this.initMap;
      loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyB63D2az3Guib3VGk7Auoie1fyG3lY1SzQ&v=3&callback=initMap")
}


  initMap = () => {
    LFKMap = new window.google.maps.Map(document.getElementById('LFKMap'), {
      center: {lat: 38.9717, lng: -95.2353},
         zoom: 15
    });
  }

  setInitialMarkers() {
    for (var i = 0; i< this.state.places.length; i++) {
          var position = this.state.places[i].location;
          var title = this.state.places[i].title;

           var marker = new window.google.maps.Marker({
             position: position,
             title: title,
             animation: window.google.maps.Animation.DROP,
             id: i
           });

       this.setState({markers: this.state.markers.push(marker)});
     }
  }

  showPlaces() {
    var bounds = new window.google.maps.LatLngBounds();
    for (var i = 0; i < this.state.markers.length; i++) {
      this.state.markers[i].setMap(LFKMap);
      bounds.extend(this.state.markers[i].position);
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
