import '../styles/StatsCard.css'
import styled from 'styled-components';
import { Card } from './Card.jsx';

export const StatsCard = ({children}) =>{

    /*
    {numberOfD2s: 0, d2sBlocked: 0, avgReactionTimeD2: [], avgReactionMiss: [], longestStreak: 0, wrongReactionNum: 0, id:0 };                
    <div className ='statsText'>Average reaction time to d2: {pd.avgReactionTimeD2[1] != 0 ? (Math.floor(pd.avgReactionTimeD2[0] /pd.avgReactionTimeD2[1])) : 0} ms</div>
    <div className ='statsText'>d2 reaction miss average: {pd.avgReactionMiss[1] != 0 ? (Math.floor(pd.avgReactionMiss[0] / pd.avgReactionMiss[1])) : 0} ms</div>
    <div className ='statsText'>Longest d2 reaction streak: {pd.longestStreak[1]}</div>
    <div className ='statsText'>Number of wrong reactions: {pd.wrongReactionNum}</div> 
    
    */
    
    return(
        <>
           <div className='statsParent'>
                <div className='statsContainer'>
                    {children}

                    
               </div>

               
           </div>
        </>
    );
    
    
}

 