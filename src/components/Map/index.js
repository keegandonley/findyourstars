
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import MapboxLayer from '../MapBox';


export default class MapComponent extends Component {
  state = {
    zoom: 4,
  }

  render() {
    const currentPosition = [this.props.currentLat, this.props.currentLng];
    const { geoJSON } = this.props;
    return (
      <Map center={currentPosition} zoom={this.state.zoom}>
        <MapboxLayer
          accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          style='mapbox://styles/mauricebecnel400/cjomdc81d1tch2sp3zcedcmqv'
        >
        </MapboxLayer>
        {this.props.solarPathEnabled ? <GeoJSON data={geoJSON}/> : null}
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