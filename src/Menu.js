import React, { Component } from 'react';


class Menu extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);

  }
handleChange(e) {
  this.props.handleQueryChange(e.target.value)
}


  render () {
    const menuClass = this.props.hideSidebar?`Menu hidden-menu`:`Menu`;
    const query = this.props.query
    return (
      <div className={menuClass}>
        <div>
        <header>
        <h1>LFKoffee</h1>
        <span className="info-span">powered by foursquare</span>
        </header>
          <p className="searchbar-header">Search for a place</p>
          <input type='text'
          value={query}
          onChange={this.handleChange}/>
          </div>
          <ul>
            {this.props.places.filter(marker => marker.isVisible).map((item,key) =>
              <li className="Menu-item"
              key={item.id}
              onClick={()=> this.props.itemClick(item.id)}>
              {(item.isOpen)?
                <button className="open-button">{item.name}</button>:
                <button>{item.name}</button>}
            </li>)}
            </ul>
      </div>
    )
  }
}

export default Menu
