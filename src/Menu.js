import React, { Component } from 'react';
import Map from './Map.js'

class Menu extends Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
      <div className="Menu">
      <ol>
      {this.props.places.map((item,key) => <li className="Menu-item" key={key}>{item.name}</li>)}
      </ol>
      </div>
    )
  }
}

export default Menu
