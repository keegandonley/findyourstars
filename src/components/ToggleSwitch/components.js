import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100vw;
	height: 25px;
    display: flex;
    flex-direction: row;
	align-items: center;
	font-size: .6em;
`;	

export const Switch = styled.div`
	width: 50px;
    height: 100%;
    display: flex;
    border-radius: 20px;
    margin: 5px 10px;
    transition: .4s;
    ${props=>(props.enabled ? 'background-color: rgb(43, 152, 240);' : 'background-color: rgb(52,51,50);')}
`;	

export const Slider = styled.div`
	width: 25px;
    height: 100%;
    border-radius: 50%;
    background-color: #ffffff;
    transition: all .2s ease-in-out;
    margin: ${props=>(props.enabled ? '0 0 0 calc(100% - 25px);' : '0 calc(100% - 25px) 0 0;')}
`;	