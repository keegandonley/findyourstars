import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	font-size: 2em;
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