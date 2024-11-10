import React, {useState, useEffect, useRef} from 'react';
import video from './assets/jin-standing.mp4'
import video2 from './assets/jin-d2.mp4'


function VideoPlayer({vid}){
    // startState (stateNum) (whichVideoIndex) (timeTillD2)
        // startState the video will be rendered, when you press left arrow key, it starts playing the video, the video should not loop and should not autoplay 
    // playingVidState 
        // when the video starts playing, it starts counting down using time till d2, if time till d2 is negative, then it wont count
        // when it reaches time till d2, it starts counting again 45.45454545454545 miliseconds 
        // if down key is pressed during this time and either time till d2 is negative or its not time till d2, youre too early 
        // 
    // 
    const [currentIndex, setIndex] = useState(0);
    const [shouldAutoplay, setAutoplay] = useState(false);
    const vids = [video, video2];
    const min = 1;
    const max = 16;
    const vidRef = useRef(null);
    const leftKeyPressed = (event) =>{
      if(event.key === 'ArrowLeft'){
        console.log("left arrow key pressed");
        if(vidRef.current.paused){
            vidRef.current.play();
            setToD2();
        }
      }  
    };

    async function setToD2(){
        const rand = (min + Math.random() * (max - min)) * 1000;
        console.log("waiting for ", rand, " seconds");
        await new Promise(resolve => setTimeout(resolve, rand));
        console.log("done waiting");
        setIndex((prevIndex) => {
            return (vids.length - 1);
        });
        setAutoplay(() =>{
            return (true);
        });
    };


    useEffect(() => {
        window.addEventListener('keydown', leftKeyPressed);
    });
    

    const videoRef = useRef(null);
    return(
        <div style = {{display:'flex', justifyContent: 'center'}}>
            <video 
                ref = {vidRef}
                width = '75%'
                height = 'auto'
                loop
                autoPlay = {shouldAutoplay}
                key = {currentIndex}
            >
               <source src={vids[currentIndex]} type = "video/mp4" />
               your browser does not support video tag
            </video>

        </div>
    )
}

export default VideoPlayer;