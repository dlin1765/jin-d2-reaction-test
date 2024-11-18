import React, {useState, useEffect, useRef, useCallback} from 'react';
import TestVideoPlayer from '../components/TestVideoPlayer.jsx';
import CustomCounter from '../components/CustomCounter.jsx';
import d2TwoSec from '../assets/2-jin-d2.mp4';
import noThreeSec from '../assets/jin-standing-3.mp4';
import noFourSec from '../assets/jin-standing-4.mp4';

function VideoPlayerWrapper(){
    
    const jinD2Two = {vid: d2TwoSec, vidLength: 3620, d2At: 2000};
    const jinNoThree = {vid: noThreeSec, vidLength: 3000, d2At: -1};
    const jinNoFour = {vid: noFourSec, vidLength: 4000, d2At: -1};
    const vidList = [jinD2Two, jinNoThree, jinNoFour];
    const currentIndex = Math.round(0 + Math.random() * (4));
    const randVid = vidList[currentIndex];
    const [shouldBlur, setBlur] = useState(true);

    const [tooEarly, setTooEarly] = useState(false);
    //let [currentIndex, setIndex] = useState(0);
    let counter = 0;
    const videoRef = useRef(null);
    const [stateNum, setStateNum] = useState(0);
    const d2ReactionTimer = 366;



    const leftKeyPressed = (event) =>{
        if(event.key === 'ArrowLeft'){
          console.log("left arrow key pressed, state num: " + stateNum);
        }  
    };

    const changeStateNum = useCallback(() =>{
        setStateNum((stateNum + 1) % 3);
    }, [stateNum]);

    const downKeyPressed = (event) =>{
        if(stateNum == 1){
            if(event.key === 'ArrowDown'){
                console.log("left arrow key pressed");
            }  
        }
    };

    const escKeyPressed = (event) =>{

    }

    useEffect(() => {
        window.addEventListener('keydown', leftKeyPressed);
        window.addEventListener('keydown', downKeyPressed);
        window.addEventListener('keydown', escKeyPressed);

        return() => {
            window.removeEventListener('keydown', leftKeyPressed);
            window.removeEventListener('keydown', escKeyPressed);
        };
    });


    return(
        <>
            <TestVideoPlayer vidInfo = {jinD2Two} videoRef = {videoRef} changeStateNum = {changeStateNum}/>
        </>
    );
}

export default VideoPlayerWrapper;
