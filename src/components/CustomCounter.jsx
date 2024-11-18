import React, {useState, useEffect, useRef} from 'react';

function CustomCounter({vidInfo, videoRef}){
    
    
    return(
        <>
            {counter}
        </>
    );

}

export default CustomCounter;





/*
    let [isCounting, setCounting] = useState(false);
    const [counter, setCounter] = useState(0);
    const [reactionTimerCount, setReactionTimer] = useState(0);


    const leftKeyPressed = (event) =>{
        if(event.key === 'ArrowLeft'){
          console.log("left arrow key pressed");
          setCounting(true);
          if(vidInfo.willD2){
           
          }
          setText();
        }  
    };

    const escKeyPressed = (event) =>{

    };

    async function setText(){
        console.log(vidInfo.vidLength);
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    async function setIfD2(){

    }

    useEffect(() => {
        window.addEventListener('keydown', leftKeyPressed);
        window.addEventListener('keydown', escKeyPressed);

        return() => {
            window.removeEventListener('keydown', leftKeyPressed);
            window.removeEventListener('keydown', escKeyPressed);
        };
    });

    useEffect(() => {
        let interval;
        if(isCounting){
            interval = setInterval(() =>{
                setCounter(prevCounter => prevCounter + 1);
            }, 1);
        }
        return () => clearInterval(interval);
    }, [videoRef, isCounting]); 

    useEffect(() => {
        let interval;
        if(isCounting){
            interval = setInterval(() =>{
                //console.log(videoRef.current.currentTime + "!");
            }, 1);
        }
        return () => clearInterval(interval);
    }, [isCounting]); 

    */