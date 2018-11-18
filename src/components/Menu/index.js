import React, { Component } from 'react';
import {Wrapper, Header} from './components';

export default class Menu extends Component {
  state = {
    currentLat: 51.505,
    currentLng: -0.09,
    zoom: 13,
  }
  
  componentDidMount() {
    this.setState({
      currentLat: this.props.currentLat,
      currentLng: this.props.currentLng,
    });
  }

  render() {
    return (
        <Wrapper>
          <Header> Find Your Stars </Header>
        </Wrapper>
    )
  }
}