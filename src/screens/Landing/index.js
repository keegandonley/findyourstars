import React, { Component } from 'react';
import Dexie from 'dexie';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/pro-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import {
	Wrapper,
	StarContainer,
	LoadingStar,
	LoaderWrapper,
	LoaderInner,
	LoadingText,
	LoadingData
} from './components';
import Starjs from './stargen';
import frontLogo from './findyourstars_LogoTitle.svg'

export default class Landing extends Component {
	state = {
		loading: true,
		loadingPerc: 0,
		loadingText: 'preparing',
		geometries: {},
		error: false,
	}
	async getGeometries() {
		try {
			await this.setState({ loadingPerc: 10, loadingText: 'fetching eclipse geometries' });
			let { data } = await Axios.get(`/data/eclipse_geometries.json`);
			const db = new Dexie("Geometries");
			db.version(2).stores({
				eclipses: "&id",
				paths: "&id",
			});
			await db.eclipses.bulkPut(Object.keys(data).map((id) => {
				return {
					id: id,
					value: data[id]
				};
			}));
			await this.setState({ loadingPerc: 25, loadingText: 'fetching eclipse locations' });
			const eclipses = await Axios.get('https://us-central1-sachacks-222818.cloudfunctions.net/http');
			await db.paths.bulkPut(eclipses.data[0].map((eclipse) => {
				const { eclipse_id, ...rest } = eclipse;
				if (!eclipse_id) {
					return null;
				}
				return {
					id: `${eclipse_id}`,
					...rest
				};
			}).filter(x => x));
			db.close();
			await this.setState({ loadingPerc: 100, loadingText: 'setting up application', geometries: data });
			setTimeout(() => {
				this.setState({ loading: false });
			}, 2000);
		} catch (e) {
			this.setState({ error: true });
		}
		
	}

	componentDidMount() {
		localStorage.setItem('data', true);
		const stars = new Starjs({ id: 'myStars' });
		stars.init();
		setTimeout(() => {
			this.getGeometries();
		}, 500);
	}

	render() {
		const { loading, loadingPerc, loadingText } = this.state;
		if (!loading) {
			return <Redirect to="/map" />;
		}
		return (
			<Wrapper>
				<StarContainer id="myStars"></StarContainer>
				<LoadingData large={loadingPerc <= 10}>
					<img src={frontLogo} alt="logo" />
					{
						loadingPerc > 10
							? (
								<React.Fragment>
									<LoadingStar>
										<FontAwesomeIcon icon={faStar} />
									</LoadingStar>
									<LoaderWrapper visible={loadingPerc > 0}>
										<LoaderInner perc={loadingPerc}/>
									</LoaderWrapper>
									<LoadingText visible={loadingPerc > 0}>{loadingText}...</LoadingText>
								</React.Fragment>
							) : ''
					}
				</LoadingData>
			</Wrapper>
		);
	}
}