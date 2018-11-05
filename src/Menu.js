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
    const query = this.props.query
    return (
      <div className="Menu">
        <div>
          <p className="searchbar-header">Search for a place</p>
          <input type='text'
          value={query}
          onChange={this.handleChange}/>
          </div>
          <ol>
            {this.props.places.filter(marker => marker.isVisible).map((item,key) =>
              <li className="Menu-item"
              key={item.id}
              onClick={()=> this.props.itemClick(item.id)}>
            <button>{item.name}</button>
            </li>)}
            </ol>
      </div>
    )
  }
}

export default Menu
