import React, {useState, useEffect, useRef, useCallback} from 'react';
import d2TwoSec from '../assets/2-jin-d2.mp4';
import noThreeSec from '../assets/jin-standing-3.mp4';
import noFourSec from '../assets/jin-standing-4.mp4';
import d2Loop from '../assets/jin-just-d2.mp4'
import styled from 'styled-components';
import BlurDiv from './BlurDiv.jsx';
import { AboutSection } from './AboutSection.jsx';
import '../styles/MainDiv.css'
import '../styles/Game.css'
import { VideoPlayer } from './VideoPlayer.jsx';
import { GameText } from './GameText.jsx';
import { useStopwatch } from 'react-use-precision-timer';
import { useTimer } from 'react-use-precision-timer';
import { Card } from './Card.jsx';
import { StatsCard } from './StatsCard.jsx'
import '../styles/AboutSection.css'

const jinD2Two = {vid: d2TwoSec, vidLength: 3620, d2At: 2000, id: 0};
const jinNoThree = {vid: noThreeSec, vidLength: 3000, d2At: -1, id: 1};
const jinNoFour = {vid: noFourSec, vidLength: 4000, d2At: -1, id: 2};
const vidList = [jinD2Two, jinNoThree, jinNoFour];

const defaultSessionData = {numberOfD2s: 0, d2sBlocked: 0, avgReactionTimeD2: [], avgReactionMiss: [], longestStreak: 0, wrongReactionNum: 0, id:0 };

const gameTextList = [
    'Can you react to Jin D2?',
     'Too early!', 
     'Too late!', 
     'Nice block!',
     'Wrong reaction...',
     'Good patience!'

];
const detailTextList = [
    "When Jin does d2, click the video again to block, don't be late or too early!",
    "You pressed down before the move started, try to only block when you see d2!",
    "You were a bit slow on the reaction, try again!",
    "You reacted to d2! Keep it up!",
    "Make sure you only click when you see the d2 animation!",
    "Good job only reacting to the d2 animation!"
];
// play the video
// if key down 


export const Game = () =>{
    const [shouldBlur, setBlur] = useState(true);
    let [randVid, setRandVid] = useState(vidList[Math.floor(Math.random() * (3 - 0) + 0)]);
    let [prevVid, setPrevVid] = useState(randVid);
    const [gameStateNum, setGameStateNum] = useState(0);
    let [mainText, setMainText] = useState(gameTextList[0]);
    let [detailText, setDetailText] = useState(detailTextList[0]);
    let [clickPlayAgainText, setClickPlayAgainText] = useState("");
    const [isVideoPlaying, setVideoPlaying] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [vidHeight, setVideoHeight] = useState(1080);

    const [playerSessionData, setSessionData] = useState(defaultSessionData);

    const [d2Num, incrementD2Num] = useState(0);
    const [d2Blocked, incrementD2Blocked] = useState(0);

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
            setClickPlayAgainText(clickPlayAgainText = "");
            setGameStateNum(
                (gameStateNum+1)
            );
            setBlur(false);
            videoRef.current.play();
        }
        else if(gameStateNum == 1){
            
        }
        else{
            setBlur(false);
            setPrevVid(randVid);
            setIsVideoLoading(true);
            let randNum = Math.floor(Math.random() * (2 - 0) + 0);
            if(vidList[randNum] == randVid){
                videoRef.current.play();
                console.log("same video");
                console.log(vidList[randNum].vidLength + " ___ " + prevVid.vidLength);
            }
            else{
                console.log("different vid");
                console.log(vidList[randNum].vidLength + " ___ " + prevVid.vidLength);
            }
            setRandVid(vidList[randNum]);
            console.log("random number = " + randNum);
            
            setGameStateNum(
                (gameStateNum - 1)
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
        setVideoPlaying(
            !isVideoPlaying
        );
        if(gameStateNum == 1 && randVid.d2At == -1){
            displayResults(5);
            console.log("good patience");
        }
        else if(gameStateNum == 1 && randVid.d2At != -1){
            displayResults(2);
            addD2Num();
            console.log("too late");
        }
    }

    const CheckIfVideoLoading = () =>{
        setIsVideoLoading(false);
        if(gameStateNum == 1){
            videoRef.current.play();
            //console.log(videoRef.current.);
        }
    }

    function displayResults(i){
        setBlur(true);
        setMainText(mainText = gameTextList[i]);
        setDetailText(detailText = detailTextList[i]);   
        setClickPlayAgainText(clickPlayAgainText = "Click here to play again");
        setGameStateNum(
            (gameStateNum+1) % 3
        );
    }

    useEffect(() => {
        window.addEventListener('keydown', leftKeyPressed);
        //window.addEventListener('keydown', escKeyPressed);

        return() => {
            window.removeEventListener('keydown', leftKeyPressed);
            //window.removeEventListener('keydown', escKeyPressed);
        };
    });
    
    useEffect(() => {
        if (videoRef.current && randVid) {
            setVideoHeight(videoRef.current.clientHeight);
            videoRef.current.load(); // Reload the video when randVid changes
        }
    }, [randVid]);

    useEffect(() =>{
        // this is where I'll save stuff to local storage
    }, [playerSessionData]);

   

    function addD2Num(){
        setSessionData(prevData =>({
            ...prevData,
            numberOfD2s: prevData.numberOfD2s + 1
        }));
    };

    function addD2Blocked(){
        setSessionData(prevData =>({
            ...prevData,
            d2sBlocked: prevData.d2sBlocked + 1
        }));
    }

    const leftKeyPressed = (event) =>{
        if(event.key === 'ArrowDown'){
            if(gameStateNum == 1){
                if(randVid.d2At != -1 && isVideoPlaying){
                    const currentTime = videoRef.current.currentTime * 1000;
                    // d2 video and clicked early
                    if(currentTime < randVid.d2At){
                        console.log("too early");
                        displayResults(1);
                    }
                    // d2 video and clicked right
                    else if(currentTime > randVid.d2At  && currentTime <= (randVid.d2At + 366.6674)){
                        console.log("blocked");
                        addD2Blocked(d2Blocked+1);
                        displayResults(3);
                    }
                    // d2 video and clicked late
                    else{
                        console.log("too late!");
                        displayResults(2);
                    }
                    console.log('current time = ' + currentTime);
                    addD2Num(d2Num);
                }
                else{
                    // if the video has no d2 and you clicked
                    displayResults(4);
                    console.log("no d2 what are you reacting to!");
                }
            } 
        }  
    };

    return(
        <>
            
            <div className={'flexParent'}>
                <MainDiv className={'main'}>
                    
                    <GameText
                        mainText={mainText}
                        detailText={detailText}
                        shouldBlur={shouldBlur}
                        clickPlayAgainText={clickPlayAgainText}
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
                            videoFinished = {videoDone}
                            videoLoading = {CheckIfVideoLoading}
                            isVideoLoading = {isVideoLoading}
                        >
                        </VideoPlayer>
                    </BlurDiv>
                    <div className={'fillerDiv'} style={{minHeight: `${vidHeight}px`}}>
                    </div>
                </MainDiv>
            </div>
            <div className='flexParent2'>
                    <div className='flexContainer'>
                        <StatsCard
                            pd={playerSessionData}
                        />
                        <Card>
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
                        </Card>
                    </div>
            </div>

            <div className = 'flexParent2'>
                <div className='flexContainer'>
                    <Card>

                    </Card>
                </div>
            </div>

            <div className = 'flexParent2'>
                <div className='flexContainer'>
                </div>
            </div>
        </>
    );
}

const MainDiv = styled.div`
    z-index: 1;
`;

const FlexColumn = styled.div`
    display:flex;
    flex-direction: column;
`;  