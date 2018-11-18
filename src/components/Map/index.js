/* eslint-disable react/style-prop-object */
import React, { Component } from 'react';
import moment from 'moment';
import { Map, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import MapboxLayer from '../MapBox';
import ISSIconImage from './international_space_station.png';


export default class MapComponent extends Component {
  state = {
    zoom: 4,
  }

  render() {
    const currentPosition = [this.props.currentLat, this.props.currentLng];
    const { geoJSON, ISSPosition } = this.props;
    const ISSIcon = L.icon({
      iconUrl: ISSIconImage,
      iconSize: [80,80],
      iconAnchor: [40, 40],
      popupAnchor: [-4, -40],
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null
    });

    return (
      <Map
        center={currentPosition}
        zoom={this.state.zoom}
        maxBounds={[[-90,-180], [90,180]]}
        minZoom={3}
        attributionControl
        customAttribution="https://hub.arcgis.com/datasets/4c1cd73495d3490a9dfa9d43fe2df852_3"
      >
        <MapboxLayer
          accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          style='mapbox://styles/mauricebecnel400/cjomdc81d1tch2sp3zcedcmqv'
          renderWorldCopies={false}
        >
        </MapboxLayer>
        {this.props.solarPathEnabled
          ? (
            <GeoJSON
              data={geoJSON}
              key={`gjson-layer-at${Date.now()}`}
              onEachFeature={(feature, layer) => {
                layer.bindPopup(`${moment.utc(feature.properties.date, 'X').format('MMM DD, YYYY')}`);
              }}
            />
          ) : null}
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