import '../styles/StatsCard.css'
import styled from 'styled-components';
import { Card } from './Card.jsx';

export const StatsCard = ({pd}) =>{

    /*
    {numberOfD2s: 0, d2sBlocked: 0, avgReactionTimeD2: [], avgReactionMiss: [], longestStreak: 0, wrongReactionNum: 0, id:0 };                
    */
    
    return(
        <>
           <div className='statsParent'>
                <div className='statsContainer'>
                    <div className = 'headerText'>Your stats: </div>
                    <div className='statsText'>Successful d2 blocks: {pd.d2sBlocked}</div>
                    <div className='statsText'>d2 block percentage: {pd.numberOfD2s != 0 ? (pd.d2sBlocked / pd.numberOfD2s) : 0}%, {pd.d2sBlocked} / {pd.numberOfD2s}</div>
                    <div className ='statsText'>Average reaction time to d2: {pd.avgReactionTimeD2[1] != 0 ? (Math.floor(pd.avgReactionTimeD2[0] /pd.avgReactionTimeD2[1])) : 0} ms</div>
                    <div className ='statsText'>d2 reaction miss average: {pd.avgReactionMiss[1] != 0 ? (Math.floor(pd.avgReactionMiss[0] / pd.avgReactionMiss[1])) : 0} ms</div>
                    <div className ='statsText'>Longest d2 reaction streak: {pd.longestStreak[1]}</div>
                    <div className ='statsText'>Number of wrong reactions: {pd.wrongReactionNum}</div> 
               </div>
           </div>
        </>
    );
    
    
}

const FlexColumn = styled.div`
        display:flex;
        flex-direction: column;
`;  