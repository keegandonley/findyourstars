
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
  
export default class MapComponent extends Component {
  state = {
    zoom: 13,
  }

  render() {
    const currentPosition = [this.props.currentLat, this.props.currentLng]
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