import React, { Component } from  'react'

var LFKMap

class Map extends Component {

  async componentDidMount() {
      window.initMap = this.initMap;
      loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyB63D2az3Guib3VGk7Auoie1fyG3lY1SzQ&v=3&callback=initMap")
}

  initMap = () => {
    LFKMap = new window.google.maps.Map(document.getElementById('LFKMap'), {
      center: {lat: 38.9717, lng: 95.2353},
         zoom: 13
    });
  }
  render() {
    return (
      <div>
      <div id='LFKMap'></div>
      </div>
    )
  }
}

function loadJS(src) {
  let ref = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = src;
  script.async = true;
  script.defer = true;
  ref.parentNode.insertBefore(script, ref);
}

export default Map;
