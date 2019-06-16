import React, { Component } from 'react';
import Header from './header';
import FeaturedHouse from './featured-house';
import HouseFilter from './house-filter';
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
      this.determineUniqueCountries();
    })
  }

  determineFeaturedHouse = () => {
    if(this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[randomIndex];
      this.setState({ featuredHouse });
    }
  }

  determineUniqueCountries = () => {
    const countries = this.allHouses
    //a set contains unique data. Good way of finding unique values.
    ? Array.from(new Set(this.allHouses.map(house => house.country)))
    : [];
    //make first position of array blank
    countries.unshift(null);
    this.setState({ countries });
  }

  filterHouses = (country) => {
    const filteredHouses = this.allHouses.filter(h => h.country === country);
    this.setState({ filteredHouses });
    this.setState({ country });
  }

  render() {
    return (
      <div className="container">
        <Header subtitle="Providing houses around the world" />
        <HouseFilter countries={this.state.countries} filterHouses={this.filterHouses} />
        <FeaturedHouse house={this.state.featuredHouse}/>
        
      </div>
    );
  }
}

export default App;
