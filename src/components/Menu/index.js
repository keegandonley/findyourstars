import React, { Component } from 'react';
import Logo from '../../resources/findyourstars_logo.svg';
import {Wrapper, Header, Container} from './components';
import Tile from '../../components/Tile';

export default class Menu extends Component {

  render() {
    return (
        <Wrapper>
          <Header>
            <img src={Logo} />
          </Header>
          <Container>
            <Tile></Tile>
          </Container>
        </Wrapper>
    )
  }
}