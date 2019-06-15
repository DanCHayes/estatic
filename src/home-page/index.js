import React, { Component } from 'react';
import Header from './header';
import FeaturedHouse from './featured-house';
import './home-page.css';

class App extends Component {
  state = {}

  componentDidMount() {
    this.fetchHouses();
  }

  fetchHouses = () => {
    fetch('/houses.json')
    .then(res => res.json())
    .then(allHouses => {
      this.allHouses = allHouses;
      this.determineFeaturedHouse();
    })
  }

  determineFeaturedHouse = () => {
    if(this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[randomIndex];
      this.setState({ featuredHouse });
    }
  }

  render() {
    return (
      <div className="container">
        <Header subtitle="Providing houses around the world" />
        <FeaturedHouse house={this.state.featuredHouse}/>
        
      </div>
    );
  }
}

export default App;
