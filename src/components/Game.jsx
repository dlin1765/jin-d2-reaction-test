import React, {useState, useEffect, useRef, useCallback} from 'react';
import d2TwoSec from '../assets/2-jin-d2.mp4';
import noThreeSec from '../assets/jin-standing-3.mp4';
import noFourSec from '../assets/jin-standing-4.mp4';
import styled from 'styled-components';
import BlurDiv from './BlurDiv.jsx';
import '../styles/MainDiv.css'
import { VideoPlayer } from './VideoPlayer.jsx';
import { GameText } from './GameText.jsx';
import { useStopwatch } from 'react-use-precision-timer';
import { useTimer } from 'react-use-precision-timer';

const jinD2Two = {vid: d2TwoSec, vidLength: 3620, d2At: 2000};
const jinNoThree = {vid: noThreeSec, vidLength: 3000, d2At: -1};
const jinNoFour = {vid: noFourSec, vidLength: 4000, d2At: -1};
const vidList = [jinD2Two, jinNoThree, jinNoFour];
const gameTextList = [
    'Can you react to Jin D2?',
     'Too early!', 
     'Too late!', 
     'Nice block!'
];
const detailTextList = [
    "When Jin does d2, click the video again to block, don't be late or too early!",
    "Make sure you only click when you see the d2 animation!",
    "You were a bit slow on the reaction, try again!",
    "You reacted to d2! Keep it up!"
];
// play the video
// if key down 

export const Game = () =>{
    const [shouldBlur, setBlur] = useState(true);
    const [randVid, setRandVid] = useState(vidList[Math.round(0 + Math.random() * (4))]);
    const [gameStateNum, setGameStateNum] = useState(0);
    let [mainText, setMainText] = useState(gameTextList[0]);
    let [detailText, setDetailText] = useState(detailTextList[0]);
    const [isVideoPlaying, setVideoPlaying] = useState(false);
    const [, rerender] = useState(0);
    const videoRef = useRef(null);
    const vidTimer = useTimer();
    const stopWatch = useStopwatch();

    const videoClicked = () =>{
        if(gameStateNum == 0){
            setGameStateNum(
                (gameStateNum+1)
            );
            setMainText(mainText = gameTextList[gameStateNum]);
            setDetailText(detailText = detailTextList[gameStateNum]);
            setGameStateNum(
                (gameStateNum+1)
            );
            setBlur(false);
            videoRef.current.play();
            if(randVid.d2At != -1){

            }
            else{
               
            }
            
        }
        else if(gameStateNum == 1){

        }
        else{
            setGameStateNum(
                (gameStateNum+1) % 3
            );
        }
        console.log("game state num = " + gameStateNum);
    }

    const videoOnPlay = () =>{
        setVideoPlaying(
            !isVideoPlaying
        );
    }

    const videoDone = () =>{
        
    }

    useEffect(() => {
        window.addEventListener('keydown', leftKeyPressed);
        //window.addEventListener('keydown', escKeyPressed);

        return() => {
            window.removeEventListener('keydown', leftKeyPressed);
            //window.removeEventListener('keydown', escKeyPressed);
        };
    });

    const leftKeyPressed = (event) =>{
        if(event.key === 'ArrowDown'){
            if(gameStateNum == 1){
                if(isVideoPlaying){
                    console.log("vid is playing0");
                }
            } 
        }  
    };

    


    return(
        <>
            <MainDiv className={'main'}>
                <GameText
                    mainText={mainText}
                    detailText={detailText}
                    shouldBlur={shouldBlur}
                >
                </GameText>
                <BlurDiv
                    shouldBlur={shouldBlur}
                >
                    <VideoPlayer
                        vid = {randVid}
                        videoClicked={videoClicked}
                        videoRef = {videoRef}
                        videoOnPlay = {videoOnPlay}
                    >
                    </VideoPlayer>
                </BlurDiv>
            </MainDiv>
        </>
    );
}

const MainDiv = styled.div`
    padding: 32px;
    background-color:lightblue;
    z-index: 1;
    height: 100%;
`;
