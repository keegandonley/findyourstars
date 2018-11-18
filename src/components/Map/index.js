
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import MapboxLayer from '../MapBox';
import ISSIconImage from './ISSicon.png';


export default class MapComponent extends Component {
  state = {
    zoom: 4,
  }

  render() {
    const currentPosition = [this.props.currentLat, this.props.currentLng];
    const { geoJSON, ISSPosition } = this.props;
    const ISSIcon = L.icon({
      iconUrl: ISSIconImage,
      iconSize: [66,40],
      iconAnchor: [33, 20],
      popupAnchor: [0, -20],
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null
  });
    return (
      <Map center={currentPosition} zoom={this.state.zoom}>
        <MapboxLayer
          accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          style='mapbox://styles/mauricebecnel400/cjomdc81d1tch2sp3zcedcmqv'
        >
        </MapboxLayer>
        <GeoJSON
          data={geoJSON}
        />
        <Marker position={currentPosition}>
          <Popup>
            You are Here
            <br/>
          </Popup>
        </Marker>
        <Marker position={[ISSPosition.latitude, ISSPosition.longitude]} icon={ISSIcon}>
          <Popup>
            International Space Station
            <br/>
          </Popup>
        </Marker>
      </Map>
    )
  }
}