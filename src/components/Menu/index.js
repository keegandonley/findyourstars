import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import Logo from '../../resources/findyourstars_logo.svg';
import {Wrapper, Header, Container} from './components';
import ToggleSwitch from '../ToggleSwitch';

export default class Menu extends Component {

  render() {
    console.log(this.props);
    return (
        <Wrapper>
          <Header>
            <img src={Logo} />
          </Header>
          <Container>
            <ToggleSwitch label={"Paths for Solar Eclipse"} clickHandler={this.props.toggleSolarEclipsePaths}/>
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
          </Container>
        </Wrapper>
    )
  }
}