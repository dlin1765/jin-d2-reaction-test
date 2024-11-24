import '../styles/GameText.css'
import styled from 'styled-components';
import CustomCounter from '../components/CustomCounter.jsx';

export const GameText = ({mainText, detailText, shouldBlur, clickPlayAgainText, reactionSpeed}) =>{

    return (
        <>
            
            <div className={'textContainer'}>
                {shouldBlur &&
                    <h1 className={'mainText'}>{mainText} {reactionSpeed != -1 ? Math.floor(reactionSpeed) +'ms' : ''}</h1>
                }
                {shouldBlur &&
                    <p className = {'detailText'}>{detailText}</p>
                }
                {shouldBlur &&
                    <p className = {'playAgainText'}>{clickPlayAgainText}</p>
                }
            </div>
        </>
    );
}

const TextContainer = styled.div`
    display: flex;
    justify-content: center;
`