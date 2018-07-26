import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteLoader from "./InfiniteLoader";
import fetch from 'isomorphic-fetch';

const BASE_URL = 'http://cdn.dota2.com/apps/dota2/images/heroes/';
const ITEMS_TO_RENDER = 30;

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

export default class LoaderDemo extends React.Component {
  state = {
    items: [],
    heroes: []
  };

  imageGrid = {}

  fetchHeroes = async() => {
    const response = await fetch('https://api.opendota.com/api/heroes');
    const heroes = await response.json();
    this.setState({
      heroes
    }, () => {
      this.fetchMoreData();
    });
  }

  formatUrl = (hero) => {

    hero = hero.replace("-", "");
    hero = hero.replace(" ", "_");
    return `${BASE_URL}${hero.toLowerCase()}_full.png`;
  }

  componentDidMount() {
    this.fetchHeroes();

  }

  fetchMoreData = () => {
    console.log('fetchmoreData');

    const {heroes, items} = this.state;

    const nextCounter = items.length == 0
      ? 0
      : items.length + 1;

    const nextData = heroes.filter((hero, index) => {
      // console.log({index}); console.log({nextCounter}); console.log('nextCounter +
      // ITEMS_TO_RENDER', nextCounter + ITEMS_TO_RENDER);
      if (index >= nextCounter && index < nextCounter + ITEMS_TO_RENDER) {
        return true
      }
    });

    this.setState({
      items: items.concat(nextData)
    });
  };

  render() {
    return (
      <div>
        <h1>demo: react-infinite-scroll-component</h1>
        <hr/>
        <InfiniteLoader
          fetchMoreData={this.fetchMoreData}
          hasMoreItems={true}
          customLoader={< h4 > Loading ...</h4>}
          endOfResultsRender={< h4 > End of Results < /h4>}>
          {this
            .state
            .items
            .map((hero, index) => (
              <div className='hero-wrapper' key={hero.localized_name}>
                {/* < img src={this.formatUrl(hero.localized_name)} alt={hero.localized_name}/> */}
                <div
                  style={{
                  height: '144px',
                  width: '254px',
                  background: 'lightblue'
                }}>{index}</div>
              </div>
            ))}
        </InfiniteLoader>
      </div>
    );
  }
}
