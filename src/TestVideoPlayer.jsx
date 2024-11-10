import React, {useState, useEffect, useRef} from 'react';
import video from './assets/jin-standing.mp4'
import video2 from './assets/jin-d2.mp4'


function TestVideoPlayer({vidInfo}){
    // startState (stateNum) (whichVideoIndex) (timeTillD2)
        // startState the video will be rendered, when you press left arrow key, it starts playing the video, the video should not loop and should not autoplay 
    // playingVidState 
        // when the video starts playing, it starts counting down using time till d2, if time till d2 is negative, then it wont count
        // when it reaches time till d2, it starts counting again 45.45454545454545 miliseconds 
        // if down key is pressed during this time and either time till d2 is negative or its not time till d2, youre too early 
        // 

        //first render, videoplayer wrapper video player custom counter
        // video player wrapper provides video player with a video to play
        // video player inits the video as blur and does not start counting 
        // when left click is pressed, the video player unblurs and plays the video 
        // when left click is pressed the counter increases 
        // if left click is pressed before the counter reaches the end the video is paused 
        // if left click is pressed and in video player the willD2 field is false 
            // 
    // 
    const jinD2ThreeSec = {textPath: "jin d2", vidLength: 3045, willD2: true};
    const jinNoD2SixSec = {textPath: "jin standing", vidLength: 6000, willD2: false};
    const jinD2FiveSec = {textPath: "jin d2", vidLength: 5045, willD2: true};
    const jinNoD2TwoSec = {textPath: "jin standing", vidLength: 2000, willD2: false};
    const jinD2EightSec = {textPath: "jin d2", vidLength: 8045, willD2: true};
    const vidList = [jinD2ThreeSec, jinNoD2SixSec, jinD2FiveSec, jinNoD2TwoSec, jinD2EightSec];

    let [currentIndex, setIndex] = useState(0);
    let [isCounting, setCounting] = useState(false);
    const [jinStanding, willD2] = useState()
    const [shouldAutoplay, setAutoplay] = useState(false);

    currentIndex = Math.round(0 + Math.random() * (4));
    const [counter, setCounter] = useState(0)
    const vids = [video, video2];
    const min = 1;
    const max = 16;
    const vidRef = useRef(null);
  

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
        let interval;
        if(isCounting){
            interval = setInterval(() =>{
                setCounter(prevCounter => prevCounter + 1);
            }, 1);
        }
        return () => clearInterval(interval);
    }, [isCounting]); 

    const videoRef = useRef(null);
    return(
        <div style = {{display:'flex', alignItems: 'center', flexDirection: 'column'}}>
            <video 
                ref = {vidRef}
                width = '75%'
                height = 'auto'
                loop
                autoPlay = {shouldAutoplay}
                key = {currentIndex}
            >
               <source src={vidInfo.vid} type = "video/mp4" />
               your browser does not support video tag
            </video>
            <div>
                {vidInfo.vidLength + " " + vidInfo.d2At}
            </div>

        </div>
    )
}

export default TestVideoPlayer;