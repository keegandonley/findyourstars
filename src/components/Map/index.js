
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
  
export default class MapComponent extends Component {
  state = {
    currentLat: 51.505,
    currentLng: -0.09,
    zoom: 13,
  }
  
  componentDidMount() {
    console.log('mounted child: ', this.props.currentLat);
    this.setState({
      currentLat: this.props.currentLat,
      currentLng: this.props.currentLng,
    });
  }

  render() {
    console.log('child component ', this.state.currentLat);
    const currentPosition = [this.state.currentLat, this.state.currentLng]
    return (
      <Map center={currentPosition} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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