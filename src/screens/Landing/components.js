import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	font-size: 2em;

	& div {
		margin: 0 auto;
	}
`;	

export const StarContainer = styled.canvas`
	position: absolute;
	width: 100vw;
	height: 100vh;
`;