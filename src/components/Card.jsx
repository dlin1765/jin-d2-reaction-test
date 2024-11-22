import '../styles/Card.css'
import d2Loop from '../assets/jin-just-d2.mp4'

export const Card = ({children}) =>{

    /*
        
    */
    return(
        <>
           <div className='cardParent'>
               <div className={'cardBody'}>
                    {children}
               </div>
           </div>
        </>
    );

}

/*

<>
           <div className='cardParent'>
               <div className={'cardBody'}>
                    <div className ='headerText'>What is Jin d2?</div>
                    <div className ='cardText'>
                        d2 is one of Jin's signature and most annoying lows in Tekken 8
                    </div>
                    <video
                        loop = {true}
                        autoPlay = {true}
                        playsInline
                        muted
                        width={'100%'}
                        style={{objectFit: 'contain'}}

                    >
                        <source src = {d2Loop} type = "video/mp4" />
                    </video>
                    <div className ='bolderText'>Why should you learn to react to it?</div>
                    <div className ='cardText'>
                        d2 is an high crushing low with good tracking that also launches on counterhit . On top of all that, it's also only <strong>-14 on block.</strong>
                    </div>
                    <div className='cardText'>
                    This means that most characters won't be able to launch punish it, making d2 a relatively low risk move considering its properties and the reward Jin can get on hit.
                    </div>
                    <div className='cardText'>
                        This move also synergizes perfectly with the rest of Jin's moveset since it evades highs, the moves commonly used to control and prevent Jin from doing his bigger higher reward moves. 
                    </div>
                    <div className='cardText'>
                    Just the threat of d2 might stop someone from playing keepout or applying pressure, giving the Jin player free rein to do whatever they want.
                    </div>
                    <div className='cardText'>
                        d2 combined with Jin's excellent neutral pokes, high reward launchers, plus frame moves, and panic moves makes him an incredibly difficult character to deal with, especially online.
                    </div>
                    <div className='cardText'>
                        Training yourself to recognize the animation even if you can only do it semi-consistently solves one piece of the puzzle and lets you focus on other areas of the match.
                    </div> 
               </div>
           </div>
        </>
*/