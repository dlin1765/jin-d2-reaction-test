import '../styles/GameText.css'
import styled from 'styled-components';

export const GameText = ({mainText, detailText, shouldBlur, clickPlayAgainText, reactionSpeed}) =>{

    return (
        <>
            
            <div className={'textContainer'}>
                {shouldBlur &&
                    <h1 className={'mainText'}>{mainText} {reactionSpeed != -1 ? Math.floor(reactionSpeed) +'ms ' +  (reactionSpeed / 16.6666667).toFixed(2) + ' frames': ''}</h1>
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