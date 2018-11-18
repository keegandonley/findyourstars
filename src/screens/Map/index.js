import React, { Component } from 'react';
import moment from 'moment';
import {Wrapper, MapLoader} from './components';
import MapComponent from '../../components/Map';
import Menu from '../../components/Menu';
import Dexie from 'dexie';
import { faStar } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
  
export default class MapScreen extends Component {
  state = {
    lat: 39.8283,
    lng: -98.5795,
    geoJSON: null,
    solarPathEnabled: false,
  }
  
  componentDidMount() {
    this.buildGeoJSON();
    this.getISSLocation();
    navigator.geolocation.getCurrentPosition(this.locationSuccess.bind(this), this.error.bind(this));
  }

  error(err) {
    this.getConditions();
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  locationSuccess(pos) {
    var crd = pos.coords;
    this.getConditions(crd.latitude, crd.longitude);
    this.setState({
        lat: crd.latitude,
        lng: crd.longitude,
    });
  }

  async getISSLocation() {
    const { data } = await Axios.get('https://us-central1-sachacks-222818.cloudfunctions.net/iss');
    this.setState({ ISSPosition: data.iss_position });
  }

  async getConditions(lat = null, long = null) {
    const config = {
      method: 'GET',
      params: {
        lat,
        long,
      },
      url: 'https://us-central1-sachacks-222818.cloudfunctions.net/conditions',
    }
    const { data } = await Axios(config);
    this.setState({ conditions: data });
  }

  toggleSolarEclipsePaths() {
    this.setState((prevState)=>{ return {solarPathEnabled: !prevState.solarPathEnabled}})
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
    this.setState({ geoJSON: res });
  }

  render() {
    const { geoJSON, ISSPosition, conditions } = this.state;
    return (
        <Wrapper>
            <Menu
                toggleSolarEclipsePaths={this.toggleSolarEclipsePaths.bind(this)}
                conditions={conditions || null}
            />
            {
              geoJSON && ISSPosition
                ? <MapComponent 
                    currentLat={this.state.lat}
                    currentLng={this.state.lng}
                    geoJSON={geoJSON}
                    ISSPosition={ISSPosition}
                    solarPathEnabled={this.state.solarPathEnabled}
                  />
                : <MapLoader>
                  <div>
                    <FontAwesomeIcon spin icon={faStar} />
                    <br />
                    <br />
                    Building your map
                  </div>
                </MapLoader>
            }
            
        </Wrapper>
    )
  }
}