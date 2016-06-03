import React from 'react';
import { Component } from 'react';
import SearchBar from '../containers/search_bar';
import Header from './header';
import Logo from './logo';

export default class App extends Component {
  render() {
    return (
      <div className="componentDiv">
        <Header />
        <SearchBar />
        <Logo />
      </div>
    );
  }
}
