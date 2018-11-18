
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
  
export default class MapComponent extends Component {
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
    const currentPosition = [this.state.currentLat, this.state.currentLng]
    return (
      <Map center={currentPosition} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        <Marker position={currentPosition}>
          <Popup>
            You are Here
            <br/>
          </Popup>
        </Marker>
      </Map>
    )
  }
}