import '../styles/AboutSection.css'
import styled from 'styled-components';
import { Card } from './Card.jsx';

export const AboutSection = () =>{


    return(
        <>
           <div className='flexParent2'>
               <div className='flexContainer'>
                   <FlexColumn>
                       <Card />
                       <Card />
                   </FlexColumn>
                   <FlexColumn>
                        <Card />
                        <Card />
                   </FlexColumn>
               </div>
           </div>
        </>
    );
    
    
}

const FlexColumn = styled.div`
        display:flex;
        flex-direction: column;
`;  