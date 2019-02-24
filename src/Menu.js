import React, { Component } from 'react';
import './Menu.css'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);

  }
handleChange(e) {
  this.props.handleQueryChange(e.target.value)
}


  render () {
    const menuClass = this.props.hideSidebar?`Menu`:`Menu show-menu`;
    const query = this.props.query;
    const userFavoritesDisplay = this.props.userFavorites.length>0?{width:'100%'}:{display:'none'};
    return (
      <div className={menuClass}>
        <div>

        <span className="info-span">powered by foursquare</span>

            <button
            style={userFavoritesDisplay}
            onClick={this.props.filterFavorites}>
            Filter Favorites
          </button>

          <p className="searchbar-header">Search for a place</p>
          <input type='text'
          id='search-input'
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
