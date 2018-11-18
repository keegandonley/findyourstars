
import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
  
export default class MapScreen extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.locationSuccess, this.error);
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  locationSuccess(pos) {
    var crd = pos.coords;

    this.setState({
        lat: crd.latitude,
        lng: crd.longitude,
    })
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
  }
}