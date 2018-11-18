import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import Logo from '../../resources/findyourstars_logo.svg';
import {Wrapper, Header, Container, Condition, LoadingConditions} from './components';
import ToggleSwitch from '../ToggleSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeatherIcon, getTherm } from './weatherIcons';
import { faCloud, faMoon, faStar } from '@fortawesome/pro-solid-svg-icons';
import { faSun } from '@fortawesome/pro-light-svg-icons';

function getConditions(conditions) {
    if (!conditions) {
      return <LoadingConditions><FontAwesomeIcon icon={faStar} spin /></LoadingConditions>;
    }
    const { currently, daily } = conditions;

    return (
      <React.Fragment>
        <br />
        <Condition>
          <strong>Conditions</strong>
        </Condition>
        <Condition>
          <FontAwesomeIcon icon={getWeatherIcon(currently.icon)} />{currently.summary}
        </Condition>
        <Condition>
          <FontAwesomeIcon icon={getTherm(currently.temperature)} />{Math.round(currently.temperature)}°F
        </Condition>
        <Condition>
          <FontAwesomeIcon icon={faCloud} />Cloud cover: {currently.cloudCover * 100}%
        </Condition>
        <Condition>
          <strong>Events</strong>
        </Condition>
        <Condition>
          <FontAwesomeIcon icon={faSun} />Sunrise: {moment(daily.data[0].sunriseTime * 1000).format('LT')}
        </Condition>
        <Condition>
          <FontAwesomeIcon icon={faMoon} />Sunset: {moment(daily.data[0].sunsetTime * 1000).format('LT')}
        </Condition>
      </React.Fragment>
    )
}

export default class Menu extends Component {
  render() {
    const { conditions, solarPathEnabled } = this.props;
    return (
        <Wrapper>
          <Header>
            <img src={Logo} alt="logo" />
          </Header>
          <Container>
            <ToggleSwitch label={"Paths for Solar Eclipses"} clickHandler={this.props.toggleSolarEclipsePaths}/>
            {
              solarPathEnabled
                ? (
                  <React.Fragment>
                    <small>(click an eclipse path to view date)</small>
                    <DateRangePicker
                      startDate={this.props.startDate} // momentPropTypes.momentObj or null,
                      startDateId={this.props.startDateId} // PropTypes.string.isRequired,
                      endDate={this.props.endDate} // momentPropTypes.momentObj or null,
                      endDateId={this.props.endDateId} // PropTypes.string.isRequired,
                      onDatesChange={this.props.onDatesChange} // PropTypes.func.isRequired,
                      focusedInput={this.props.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                      onFocusChange={this.props.onFocusChange} // PropTypes.func.isRequired,
                      isOutsideRange={() => false}
                    />
                  </React.Fragment>
                ) : ''
            }
            
            {getConditions(conditions)}
          </Container>
        </Wrapper>
    )
  }
}