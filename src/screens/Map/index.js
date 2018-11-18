import React, { Component } from 'react';
import moment from 'moment';
import {Wrapper} from './components';
import MapComponent from '../../components/Map';
import Menu from '../../components/Menu';
import Dexie from 'dexie';
  
export default class MapScreen extends Component {
  state = {
    lat: 39.8283,
    lng: -98.5795,
    zoom: 13,
    geoJSON: null,
  }
  
  componentDidMount() {
    this.buildGeoJSON();
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

  toggleSolarEclipsePaths() {
    console.log('triggered');
}

  async buildGeoJSON() {
    const db = new Dexie("Geometries");
    const datares = await db.open();
    const mappings = {};

    // Get paths first
    const pathsTable = datares.table('paths');
    const pathsData = await pathsTable.toArray();
    const start = moment(Date.now()).unix();
    const end = moment().add(10, 'y').unix();
    pathsData.forEach((path) => {
      if (!mappings[path.id] && path.epoch > start && path.epoch < end) {
        mappings[path.id] = {
          type: "Feature",
          geometry: {
            type: path.geoType,
            coordinates: [],
          },
          properties: {
            name: path.name
          }
        }
      }
    });

    // Get geometries
    const geometriesTable = datares.table('eclipses');
    const geometriesData = await geometriesTable.toArray();
    geometriesData.forEach((geom) => {
      if (mappings[geom.id]) {
        mappings[geom.id].geometry.coordinates = geom.value;
      }
    });

    const res = {
      type: "FeatureCollection",
      features: Object.keys(mappings).map((id) => {
        return mappings[id];
      })
    };
    db.close();
    console.log(res);
    this.setState({ geoJSON: res });
  }

  render() {
    const { geoJSON } = this.state;
    return (
        <Wrapper>
            <Menu
                toggleSolarEclipsePaths={this.toggleSolarEclipsePaths}
            />
            {
              geoJSON
                ? <MapComponent 
                    currentLat={this.state.lat}
                    currentLng={this.state.lng}
                    geoJSON={geoJSON}
                  />
                : 'loading'
            }
            
        </Wrapper>
    )
  }
}