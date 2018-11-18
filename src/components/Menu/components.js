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
    & img {
        width: 90%;
        margin: 0 auto;
    }
`;

export const Container = styled.div`
    width: 100%;
	align-items: center;
    // overflow: scroll;
`;

export const Condition = styled.div`
    width: 100%;
    display: flex;
    padding: 5px 10px;
    font-size: 0.6em;
    text-align: center;
    align-items: center;

    & svg {
        padding-right: 10px;
        min-width: 40px;
    }
`;




