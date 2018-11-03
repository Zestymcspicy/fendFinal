import React, { Component } from 'react';


class Menu extends Component {

  render () {
    return (
      <div className="Menu">
      <ol>
      {this.props.places.map((item,key) => <li className="Menu-item" key={key}>
      <button>{item.name}</button>
      </li>)}
      </ol>
      </div>
    )
  }
}

export default Menu
