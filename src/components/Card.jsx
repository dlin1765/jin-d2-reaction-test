import '../styles/Card.css'
import d2Loop from '../assets/jin-just-d2.mp4'

export const Card = ({content}) =>{

    /*
        
    */
    return(
        <>
           <div className='cardParent'>
               <div className={'cardBody'}>
                    <div className ='headerText'>What is Jin d2?</div>
                    <div className ='cardText'>
                        d2 is one of Jin's signature and annoying lows in Tekken 8
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
               </div>
           </div>
        </>
    );

}