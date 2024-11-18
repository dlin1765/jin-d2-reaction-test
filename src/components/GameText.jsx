import '../styles/GameText.css'
import styled from 'styled-components';
import CustomCounter from '../components/CustomCounter.jsx';

export const GameText = ({mainText, detailText, shouldBlur}) =>{

    return (
        <>
            {shouldBlur &&
                <h1 className={'mainText'}>{mainText}</h1>
            } 
            {shouldBlur && 
                <p className = {'detailText'}>{detailText}</p>
            }
        </>
    );
}

const TextContainer = styled.div`
    display: flex;
    justify-content: center;
`