import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	font-size: 2em;
	background-color: #191A1A;
`;	

export const MapLoader = styled.div`
	width: 100%;
	display: flex;
	align-items: center;

	& div {
		margin: 0 auto;
		text-align: center;
		font-size: 0.5em;
	}

	& svg {
		font-size: 2em;
	}
`;

export const LocationIcon = styled.div`
	position: absolute;
	right: 10px;
	top: 10px;
	cursor: pointer;
`;

export const Attribution = styled.div`
	position: absolute;
	right: 60px;
	bottom: 0;
	font-size: 0.35em;
	height: 16px;
	background-color: rgba(0, 0, 0, 0.7);
	line-height: 16px;
	padding: 0 10px;
	opacity: 0.7;

	& a {
		color: #3B87AE;
		text-decoration: none;
	}
`;