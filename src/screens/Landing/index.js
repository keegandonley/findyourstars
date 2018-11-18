import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/pro-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import { Wrapper, StarContainer, LoadingStar, LoaderWrapper, LoaderInner, LoadingText, LoadingData } from './components';
import Starjs from './stargen';

export default class Landing extends Component {
	state = {
		loading: true,
		loadingPerc: 0,
		loadingText: 'preparing'
	}
	componentDidMount() {
		const stars = new Starjs({ id: 'myStars' });
		stars.init();
		setTimeout(() => {
			this.setState({ loadingPerc: 10 });
		}, 1000);
		setTimeout(() => {
			this.setState({ loadingPerc: 25, loadingText: 'fetching map data' });
		}, 2000);
		setTimeout(() => {
			this.setState({ loadingPerc: 50, loadingText: 'fetching map images' });
		}, 3000);
		setTimeout(() => {
			this.setState({ loadingPerc: 75, loadingText: 'logging in securely' });
		}, 4000);
		setTimeout(() => {
			this.setState({ loadingPerc: 100, loadingText: 'redirecting' });
		}, 5000);
		setTimeout(() => {
			this.setState({ loading: false });
		}, 7000);
		if (navigator.geolocation) {
			console.log(navigator.geolocation.getCurrentPosition);
		};
	}

	render() {
		const { loading, loadingPerc, loadingText } = this.state;
		if (!loading) {
			return <Redirect to="/map" />;
		}
		return (
			<Wrapper>
				<StarContainer id="myStars"></StarContainer>
				<LoadingData>
					<LoadingStar>
						<FontAwesomeIcon icon={faStar} />
					</LoadingStar>
					<LoaderWrapper visible={loadingPerc > 0}>
						<LoaderInner perc={loadingPerc}/>
					</LoaderWrapper>
					<LoadingText visible={loadingPerc > 0}>{loadingText}...</LoadingText>
				</LoadingData>
			</Wrapper>
		);
	}
}