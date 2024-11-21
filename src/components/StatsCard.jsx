import '../styles/StatsCard.css'
import styled from 'styled-components';
import { Card } from './Card.jsx';

export const StatsCard = () =>{

    // longest streak
    // amount of time i missed block by
    // total amount blocked 
    /*
                    <div className = 'headerText'>Your stats: </div>
                    <div className='statsText'>Successful d2 blocks: x</div>
                    <div className='statsText'>d2 block percentage: x, x/y</div>
                    <div className ='statsText'>Average reaction time to d2 is x ms</div>
                    <div className ='statsText'>d2 reaction miss average: x ms</div>
                    <div className ='statsText'>Longest d2 reaction streak: x</div>
                    <div className ='statsText'>Number of wrong reactions: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div> */
    return(
        <>
           <div className='statsParent'>
                <div className='statsContainer'>
                    <div className = 'headerText'>Your stats: </div>
                    <div className='statsText'>Successful d2 blocks: x</div>
                    <div className='statsText'>d2 block percentage: x, x/y</div>
                    <div className ='statsText'>Average reaction time to d2 is x ms</div>
                    <div className ='statsText'>d2 reaction miss average: x ms</div>
                    <div className ='statsText'>Longest d2 reaction streak: x</div>
                    <div className ='statsText'>Number of wrong reactions: xxxxxxxxxxxxxxxxxx</div> 
               </div>
           </div>
        </>
    );
    
    
}

const FlexColumn = styled.div`
        display:flex;
        flex-direction: column;
`;  