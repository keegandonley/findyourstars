import React, { Component } from 'react';
import Logo from '../../resources/findyourstars_logo.svg';
import {Wrapper, Header, Container} from './components';
import ToggleSwitch from '../ToggleSwitch';

export default class Menu extends Component {

  render() {
    return (
        <Wrapper>
          <Header>
            <img src={Logo} />
          </Header>
          <Container>
            <ToggleSwitch label={"Paths for Solar Eclipse"} clickHandler={this.props.toggleSolarEclipsePaths}/>
          </Container>
        </Wrapper>
    )
  }
}