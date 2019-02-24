import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';
import Menu from './Menu.js';
import Header from './Header.js';
import LogInSignUp from './LogInSignUp';
import { auth, db, dbAddUser } from './firebase.js'
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
    user: null,
    userFavorites: [],
    centerLat: 0,
    centerLng: 0,
    zoom: 16,
    presentvenue: [],
    query: '',
    favoritesFiltered: false,
    logInOpen: false,
  }
  this.filterFavorites = this.filterFavorites.bind(this)
  this.toggleLogInOpen = this.toggleLogInOpen.bind(this)
  this.handleQueryChange = this.handleQueryChange.bind(this)
  this.itemClick =this.itemClick.bind(this)
  this.slideMenu = this.slideMenu.bind(this)
  this.logout = this.logout.bind(this)
  this.setUserAndFavorites = this.setUserAndFavorites.bind(this)
  this.setNewFavorites = this.setNewFavorites.bind(this)
}

//call to foursquare for data
componentDidMount() {
  foursquare.venues.recommendations(params)
      .then(res=> {
        const  centerLat  = parseFloat(res.response.context.currentLocation.feature.geometry.center.lat);
        const  centerLng  = parseFloat(res.response.context.currentLocation.feature.geometry.center.lng);
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
            photo: photo,
            isFavorite : false
          }
        })

        this.setState({mymarkers, centerLat, centerLng})
      }).catch(error => {
        alert(`There was an error of ${error}`)
      });
      window.addEventListener("resize", this.resize.bind(this));
      auth.onAuthStateChanged(user => {
        const thisApp = this;
        if (user!==null) {
          // db.collection("users").doc(user.uid)
          //   .onSnapshot(function(doc) {
          //     if(doc.data()===undefined){
          //       dbAddUser(user.email, user.displayName, user.uid)
          //     }
          //
          //     thisApp.setState({
          //       user : user,
          //       logInOpen : false,
          //     });
            // });
            thisApp.setUserAndFavorites(user)
        }
      })
  }

  resize() {
    if(window.innerWidth>675&&this.state.hideSidebar===false) {
    this.setState({hideSidebar: true})
    }
  }

  toggleLogInOpen() {
    this.state.logInOpen===true?
    this.setState({logInOpen : false}):
    this.setState({
      logInOpen : true,
      hideSidebar : true
    })
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

favoriteMarkers(favoritesArray){
  let newMarkers = [];
  let myMarkers = this.state.mymarkers;
  for (let i = 0; i<myMarkers.length; i++) {
      myMarkers[i].isFavorite = favoritesArray.some(x=> x===myMarkers[i].id);
      newMarkers.push(myMarkers[i]);
    }
    return newMarkers;
  }


setNewFavorites(newFavorites) {
  let newMarkers = this.favoriteMarkers(newFavorites)
  this.setState({
    userFavorites : newFavorites,
    mymarkers : newMarkers
  });
}

filterFavorites = () => {
  if(this.state.favoritesFiltered===false){
    let newMarkers = this.state.mymarkers.map( marker => {
      if(marker.isFavorite===true) {
        marker.isVisible=true;
        return marker;
      }else{
        marker.isVisible=false;
        return marker;
      }
    })
    this.setState({
      mymarkers: Object.assign(this.state.mymarkers, newMarkers),
      favoritesFiltered: true
    });
  } else {
    let newMarkers = this.state.mymarkers.map( marker => {
      marker.isVisible = true;
      return marker;
    })
    this.setState({
      mymarkers: Object.assign(this.state.mymarkers, newMarkers),
      favoritesFiltered: false
    })
  }
}

setUserAndFavorites(user) {
  const thisApp = this;
  const docRef = db.collection('users').doc(user.uid);
    docRef.get().then(function(doc) {
      if(doc.exists) {
        let data = (doc.data())
        let userFavorites = data.favorites;
        let mymarkers = thisApp.favoriteMarkers(userFavorites)
        thisApp.setState({user, userFavorites, mymarkers});
        } else {
        thisApp.setState({user})
        }
      }).catch(function(error) {
        console.log(error);
        thisApp.setState({user})
      })
  }


  logout() {
      let resetMarkers = this.state.mymarkers.map(x => {
        x.isFavorite=false
        return x;
      });
      this.setState({
        user: null,
        mymarkers: resetMarkers,
        userFavorites : []
      })
      auth.signOut()
  }

  render() {
    const query = this.state.query


    return (
      <div className="App">
      <Header
      user={this.state.user}
      toggleLogInOpen={this.toggleLogInOpen}
      slideMenu={this.slideMenu}
      logout={this.logout}
       />
          <Menu query={query}
            filterFavorites={this.filterFavorites}
            hideSidebar={this.state.hideSidebar}
            handleQueryChange={this.handleQueryChange}
            itemClick={this.itemClick}
            places={this.state.mymarkers}/>
          {this.state.logInOpen?
          <LogInSignUp
            logout={this.logout}
            setUserAndFavorites={this.setUserAndFavorites}
            logInOpen={this.state.logInOpen}
            toggleLogInOpen={this.toggleLogInOpen}
          />:<div></div>
        }
          <Map
          {...this.state}
          setNewFavorites={this.setNewFavorites}
          handleMarkerClick={this.handleMarkerClick}
          handleMouseOver={this.handleMouseOver}
        />
        </div>
    );
  }
}

export default App;
