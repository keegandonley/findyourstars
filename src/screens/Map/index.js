import React, { Component } from 'react';
import {Wrapper} from './components';
import MapComponent from '../../components/Map';
import Menu from '../../components/Menu';
  
export default class MapScreen extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.locationSuccess.bind(this), this.error.bind(this));
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  locationSuccess(pos) {
    var crd = pos.coords;

    this.setState({
        lat: crd.latitude,
        lng: crd.longitude,
    });
  }

  render() {
    return (
        <Wrapper>
            <Menu/>
            <MapComponent 
                currentLat={this.state.lat}
                currentLng={this.state.lng}
            />
        </Wrapper>
    )
  }
}