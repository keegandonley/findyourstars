import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 75%;
    max-width: 300px;
    height: 100%;
    flex-direction: column;
	align-items: center;
    background-color: black;
    border-right: 1px solid white;
`;

export const Header = styled.div` 
    width: 100%;
    align-items: center;
    padding: 15px;
    & > img {
        width: 90%;
        margin: 0 auto;
    }
`;

export const Container = styled.div`
    width: 100%;
    align-items: center;
`;
