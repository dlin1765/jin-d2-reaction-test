import React, {useState, useEffect, useRef} from 'react';
import TestVideoPlayer from './TestVideoPlayer';
import CustomCounter from './CustomCounter';
import d2TwoSec from './assets/2-jin-d2.mp4';
import noThreeSec from './assets/jin-standing-3.mp4';
import noFourSec from './assets/jin-standing-4.mp4';

function VideoPlayerWrapper(){
    const jinD2Two = {vid: d2TwoSec, vidLength: 3620, d2At: 2000};
    const jinNoThree = {vid: noThreeSec, vidLength: 3000, d2At: -1};
    const jinNoFour = {vid: noFourSec, vidLength: 4000, d2At: -1};
    const vidList = [jinD2Two, jinNoThree, jinNoFour];

    const [shouldBlur, setBlur] = useState(true);
    //let [currentIndex, setIndex] = useState(0);
    let currentIndex = Math.round(0 + Math.random() * (4));



    const leftKeyPressed = (event) =>{
        if(event.key === 'ArrowLeft'){
          console.log("left arrow key pressed");
          if(shouldBlur){
            setBlur(() => {
                shouldBlur = false;
            });
          }
        }  
    };

    const escKeyPressed = (event) =>{

    }


    useEffect(() => {
        window.addEventListener('keydown', leftKeyPressed);
        window.addEventListener('keydown', escKeyPressed);

        return() => {
            window.removeEventListener('keydown', leftKeyPressed);
            window.removeEventListener('keydown', escKeyPressed);
        };
    });


    return(
        <div style = {{display:'flex', justifyContent: 'center', gap: '64px'}}>
            <TestVideoPlayer vidInfo = {vidList[currentIndex]} blur = {shouldBlur}/>
            <CustomCounter />
        </div>
    );
}

export default VideoPlayerWrapper;
