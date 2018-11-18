/* eslint-disable no-mixed-operators */
import React, { Component } from 'react';
import moment from 'moment';
import {Wrapper, MapLoader, LocationIcon, Attribution} from './components';
import MapComponent from '../../components/Map';
import Menu from '../../components/Menu';
import Dexie from 'dexie';
import { faStar } from '@fortawesome/pro-solid-svg-icons';
import { faLocation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export default class MapScreen extends Component {
  state = {
    lat: 39.8283,
    lng: -98.5795,
    geoJSON: null,
    solarPathEnabled: true,
    currentYear: 0,
    startDate: moment(),
    endDate: moment().add(10, 'y'),
    FocusedInput: null,
    error: false,
  }
  
  componentDidMount() {
    const res = localStorage.getItem('data');
    if (res !== 'true') {
      window.location = '/';
    } else {
      this.buildGeoJSON();
      this.getISSLocation();
      navigator.geolocation.getCurrentPosition(this.locationSuccess.bind(this), this.error.bind(this));
    }
  }

  async error(err) {
    this.getConditions();
    const fallback = await Axios.get('http://ip-api.com/json');
    this.setState({ lat: fallback.data.lat, lng: fallback.data.lon });
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
    try {
      const { data } = await Axios.get('https://us-central1-sachacks-222818.cloudfunctions.net/iss');
      this.setState({ ISSPosition: data.iss_position });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  async getConditions(lat = null, long = null) {
    try {
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
    } catch (e) {
      this.setState({ error: true });
    }
  }

  toggleSolarEclipsePaths() {
    this.setState((prevState)=>{ return {solarPathEnabled: !prevState.solarPathEnabled}})
  }

  onDatesChange({ startDate, endDate }) {
      this.setState({startDate, endDate});
      if (startDate && startDate.isValid() && endDate && endDate.isValid()) {
        this.buildGeoJSON();
      }
  }

  changeYear(year){
      this.setState({currentYear: year});
  }

  async buildGeoJSON() {
    const db = new Dexie("Geometries");
    const datares = await db.open();
    const mappings = {};

    // Get paths first
    const pathsTable = datares.table('paths');
    const pathsData = await pathsTable.toArray();
    const start = this.state.startDate.unix();
    const end = this.state.endDate.unix();
    pathsData.forEach((path) => {
      if (!mappings[path.id] && path.epoch > start && path.epoch < end) {
        mappings[path.id] = {
          type: "Feature",
          geometry: {
            type: path.geoType,
            coordinates: [],
          },
          properties: {
            name: path.name,
            date: path.epoch,
            duration: path.DurationSeconds,
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
    await this.setState({ geoJSON: res });
  }

  render() {
    const { geoJSON, ISSPosition, startDate, endDate, conditions } = this.state;

    return (
        <Wrapper>
            <Menu
                toggleSolarEclipsePaths={this.toggleSolarEclipsePaths.bind(this)}
                solarPathEnabled={this.state.solarPathEnabled}
                startDate={startDate}
                startDateId={startDate && startDate.toString() || 'startDate-noID'}
                endDateId={endDate && endDate.toString() || 'endDate-noID'}
                endDate={endDate}
                onDatesChange={this.onDatesChange.bind(this)}
                focusedInput={this.state.FocusedInput}
                onFocusChange={FocusedInput => this.setState({ FocusedInput })}
                conditions={conditions || null}
            />
            {
              geoJSON && ISSPosition
                ? <React.Fragment>
                    <MapComponent 
                      currentLat={this.state.lat}
                      currentLng={this.state.lng}
                      geoJSON={geoJSON}
                      ISSPosition={ISSPosition}
                      solarPathEnabled={this.state.solarPathEnabled}
                    />
                    <LocationIcon>
                      <FontAwesomeIcon
                        icon={faLocation}
                        onClick={() => navigator.geolocation.getCurrentPosition(this.locationSuccess.bind(this), this.error.bind(this))}
                      />
                    </LocationIcon>
                    <Attribution>
                      <a href="https://hub.arcgis.com/datasets/4c1cd73495d3490a9dfa9d43fe2df852_3" rel="noopener noreferrer" target="_blank">eclipse data</a> from arcgis hub | conditions from <a href="https://darksky.net/dev" rel="noopener noreferrer" target="_blank">darkSky</a> | tiles from <a href="https://www.mapbox.com" rel="noopener noreferrer" target="_blank">mapBox</a> | ISS location data from <a href="http://api.open-notify.org" rel="noopener noreferrer" target="_blank">open-notify</a>
                    </Attribution>
                  </React.Fragment>
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