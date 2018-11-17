import React, { Component } from 'react';
import { Wrapper, StarContainer } from './components';
import Starjs from './stargen';

export default class Landing extends Component {
	componentDidMount() {
		const stars = new Starjs({ id: 'myStars' });
  		stars.init();
	}

	render() {
		return (
			<Wrapper>
				<StarContainer id="myStars"></StarContainer>
				<div>
					hello world
				</div>
			</Wrapper>
		);
	}
}