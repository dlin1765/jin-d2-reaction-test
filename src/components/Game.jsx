import React, {useState, useEffect, useRef, useCallback} from 'react';
import d2OneSec from '../assets/jin-d2-1.mp4';
import d2TwoSec from '../assets/jin-d2-2.mp4';
import d2ThreeSec from '../assets/jin-d2-3.mp4';
import d2HalfSec from '../assets/jin-d2-half.mp4';
import d2DashOneSec from '../assets/jin-d2dash-1.mp4';
import d2Dash38 from '../assets/jin-d2dash-38.mp4';
import df14OneSec from '../assets/jin-df14-1.mp4';
import df14Half from '../assets/jin-df14-half.mp4';
import ff31OneSec from '../assets/jin-ff31-1.mp4';
import ff31TwoSec from '../assets/jin-ff31-2.mp4';
import ff31Long from '../assets/jin-ff31-long.mp4';
import ws44OneSec from '../assets/jin-ws44-1.mp4';

import d2Loop from '../assets/jin-just-d2.mp4'
import styled from 'styled-components';
import BlurDiv from './BlurDiv.jsx';
import Button from './Button.jsx'
import '../styles/MainDiv.css'
import '../styles/Game.css'
import { VideoPlayer } from './VideoPlayer.jsx';
import { GameText } from './GameText.jsx';
import { Card } from './Card.jsx';
import { StatsCard } from './StatsCard.jsx'
import StatsTooltip from './StatsTooltip.jsx';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip, ResponsiveContainer } from 'recharts';

const jinD2Half = {vid: d2HalfSec, d2At: 500}
const jinD2One = {vid: d2OneSec, d2At: 1000}
const jinD2Two = {vid: d2TwoSec, d2At: 2000};
const jinD2Three = {vid: d2ThreeSec, d2At: 3000};
const jinD2Dash = {vid: d2DashOneSec, d2At: 1000};
const jinD2Dash38 = {vid: d2Dash38, d2At: 633.33333346};
const jinDf14One = {vid: df14OneSec, d2At: -1};
const jinDf14Half = {vid: df14Half, d2At: -1};
const jinFf31OneSec = {vid: ff31OneSec, d2At: -1};
const jinFf31TwoSec = {vid: ff31TwoSec, d2At: -1};
const jinFF31Long = {vid: ff31Long, d2At: -1};
const jinWs44OneSec = {vid: ws44OneSec, d2At: -1};

const vidList = [jinD2Half, jinD2One, jinD2Two,
      jinD2Dash38, jinD2Dash, 
     jinFf31OneSec, jinD2Half, jinD2Dash38, jinD2Dash, 
     jinFf31TwoSec, jinWs44OneSec, jinFf31OneSec, jinWs44OneSec,jinFf31TwoSec,
];

const defaultSessionData = {numberOfD2s: 0, d2sBlocked: 0, avgReactionTimeD2: [0,0], avgReactionMiss: [0,0], longestStreak: [0,0], wrongReactionNum: 0, blockPercentage: 0, totalReactions: 0, id: '|'};

const gameTextList = [
    'Can you react to Jin D2?',
     'Too early!', 
     'Too late!', 
     'Nice block!',
     'Wrong reaction...',
     'Good patience!'

];
const detailTextList = [
    "Click the video to begin! When Jin does d2, click again or press S to block",
    "You pressed down before the move started, try to only block when you see d2!",
    "You were a bit slow on the reaction, try again!",
    "You reacted to d2! Keep it up!",
    "Make sure you only click when you see the d2 animation!",
    "Good job only reacting to the d2 animation!"
];

const rightColor = '#BFD7FF'
const wrongColor = '#FF6962';

// To-do

// stretch goal: get a global counter of how many d2s and how many blocked 


export const Game = ({statsClicked, clearClicked}) =>{
    const [shouldBlur, setBlur] = useState(true);
    let [randVid, setRandVid] = useState(vidList[Math.floor(Math.random() * (vidList.length - 0) + 0)]);
    let [prevVid, setPrevVid] = useState(randVid);
    const [gameStateNum, setGameStateNum] = useState(0);
    let [mainText, setMainText] = useState(gameTextList[0]);
    let [detailText, setDetailText] = useState(detailTextList[0]);
    let [clickPlayAgainText, setClickPlayAgainText] = useState("There's a chance Jin may not even do d2, so be alert!");
    const [isVideoPlaying, setVideoPlaying] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [vidHeight, setVideoHeight] = useState(1080);
    const [reactionSpeed, setCurrentReactionTime] = useState(-1);
    const [playerSessionData, setSessionData] = useState(defaultSessionData);
    const [allowsLocalStorage, setAllowsLocalStorage] = useState(true);
    const [sessionId, setSessionID] = useState('');
    const [previousPlayerData, setPreviousData] = useState([]);
    const [hasRenderedOnce, setHasRenderOnce] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(rightColor);

    const [, rerender] = useState(0);
    const videoRef = useRef(null);

    const videoClicked = () =>{
        if(gameStateNum == 0){
            setGameStateNum(
                (gameStateNum+1)
            );
            setMainText(mainText = gameTextList[gameStateNum]);
            setDetailText(detailText = detailTextList[gameStateNum]);
            setClickPlayAgainText(clickPlayAgainText = "There's a chance Jin may not even do d2, so be alert!");
            setGameStateNum(
                (gameStateNum+1)
            );
            setBlur(false);
            videoRef.current.play();
            
        }
        else if(gameStateNum == 1){
                if(randVid.d2At != -1 && isVideoPlaying){
                    const currentTime = videoRef.current.currentTime * 1000;
                    const moveAt = Math.abs(randVid.d2At);
                    // d2 video and clicked early
                    if(currentTime < moveAt){
                        console.log("too early");
                        addD2BlockStreak(false);
                        setCurrentReactionTime(-1);
                        displayResults(1);
                        setBackgroundColor(wrongColor);
                    }
                    // d2 video and clicked right
                    else if(currentTime > moveAt  && currentTime <= (moveAt + 366.6674)){
                        console.log("blocked");
                        addD2Blocked();
                        setReactionTime(((currentTime - moveAt)));
                        setCurrentReactionTime(currentTime - moveAt);
                        addD2BlockStreak(true);
                        displayResults(3);
                    }
                    // d2 video and clicked late
                    else{
                        console.log("too late!");
                        setBackgroundColor(wrongColor);
                        setReactionTime(((currentTime - moveAt)));
                        setCurrentReactionTime(currentTime - moveAt);
                        setReactionTimeEarly(((currentTime - (moveAt + 366.6674))));
                        addD2BlockStreak(false);
                        displayResults(2);
                    }
                    console.log('current time = ' + currentTime);
                    setGameStateNum(gameStateNum + 1);
                    addD2Num();
                    setTotalReactions();
                }
                else{
                    // if the video has no d2 and you clicked
                    setBackgroundColor(wrongColor);
                    displayResults(4);
                    addD2BlockStreak(false);
                    setCurrentReactionTime(-1);
                    setMissedReactions();
                    setTotalReactions();
                    console.log("no d2 what are you reacting to!");
                } 
                
        }
        else{
            setBlur(false);
            setPrevVid(randVid);
            setBackgroundColor(rightColor);
            let randNum = Math.floor(Math.random() * (vidList.length - 0) + 0);
            if(vidList[randNum] == randVid){
                videoRef.current.load();
                videoRef.current.play();
                console.log("same video");
                //console.log(vidList[randNum].vidLength + " ___ " + prevVid.vidLength);
            }
            else{
                console.log("different vid");
                //console.log(vidList[randNum].vidLength + " ___ " + prevVid.vidLength);
            }
            setRandVid(vidList[randNum]);
            console.log("random number = " + randNum);
            setGameStateNum(
                (gameStateNum - 1)
            );
            
        }
        console.log("game state num = " + gameStateNum);
    }   

    function handleReaction(){
        if(gameStateNum == 1){
            if(randVid.d2At != -1 && isVideoPlaying){
                const currentTime = videoRef.current.currentTime * 1000;
                const moveAt = Math.abs(randVid.d2At);
                // d2 video and clicked early
                if(currentTime < moveAt){
                    console.log("too early");
                    addD2BlockStreak(false);
                    setCurrentReactionTime(-1);
                    displayResults(1);
                    setBackgroundColor(wrongColor);
                }
                // d2 video and clicked right
                else if(currentTime > moveAt  && currentTime <= (moveAt + 366.6674)){
                    console.log("blocked");
                    addD2Blocked();
                    setReactionTime(((currentTime - moveAt)));
                    setCurrentReactionTime(currentTime - moveAt);
                    addD2BlockStreak(true);
                    displayResults(3);
                }
                // d2 video and clicked late
                else{
                    console.log("too late!");
                    setReactionTime(((currentTime - moveAt)));
                    setCurrentReactionTime(currentTime - moveAt);
                    setReactionTimeEarly(((currentTime - (moveAt + 366.6674))));
                    addD2BlockStreak(false);
                    displayResults(2);
                    setBackgroundColor(wrongColor);
                }
                console.log('current time = ' + currentTime);
                setGameStateNum(gameStateNum + 1);
                addD2Num();
                setTotalReactions();
            }
            else{
                // if the video has no d2 and you clicked
                displayResults(4);
                addD2BlockStreak(false);
                setCurrentReactionTime(-1);
                setMissedReactions();
                setBackgroundColor(wrongColor);
                setTotalReactions();
                console.log("no d2 what are you reacting to!");
            } 
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', sKeyPressed);
        //window.addEventListener('keydown', escKeyPressed);

        return() => {
            window.removeEventListener('keydown', sKeyPressed);
            //window.removeEventListener('keydown', escKeyPressed);
        };
    });

    const sKeyPressed = (event) =>{
        
        if(event.code == 'KeyS'){
            console.log("S key pressed");
            handleReaction();
        }
    }

    const videoOnPlay = () =>{
        setVideoPlaying(
            true
        );
    }

    const videoDone = () =>{
        setVideoPlaying(
            false
        );
        if(gameStateNum == 1 && randVid.d2At == -1){
            displayResults(5);
            console.log("good patience");
            setCurrentReactionTime(-1);
            setTotalReactions();
        }
        else if(gameStateNum == 1 && randVid.d2At != -1){
            displayResults(2);
            addD2Num();
            addD2BlockStreak(false);
            setCurrentReactionTime(videoRef.current.currentTime * 1000 -  randVid.d2At);
            setReactionTime(((videoRef.current.currentTime * 1000 - randVid.d2At)));
            setReactionTimeEarly(((videoRef.current.currentTime * 1000 - (randVid.d2At + 366.6674))));
            setBackgroundColor(wrongColor)
            setTotalReactions();
            console.log("too late");
        }
    }

    const CheckIfVideoLoading = () =>{
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

    function setLoadingVideo(){
        setIsVideoLoading(true);
        console.log("am i firing");
    }
    
    useEffect(() => {
        if (videoRef.current && randVid) {
            //setVideoHeight(videoRef.current.clientHeight);
            videoRef.current.load(); // Reload the video when randVid changes
        }
    }, [randVid]);

    useEffect(()=>{
        console.log(videoRef.current.clientHeight);
        //setVideoHeight(videoRef.current.clientHeight);
       
    }, [videoRef]);

    useEffect(() =>{
        // this is where I'll save stuff to local storage
        console.log("player session data changed");

        if(allowsLocalStorage && sessionId != ''){
            let temp = localStorage.getItem(sessionId);
            if(temp == null){  
                console.log("current session id has no data");
                localStorage.setItem(sessionId, JSON.stringify(playerSessionData));
                let sessionIds = localStorage.getItem('sessions');
                if(sessionIds == null){
                    console.log("session id list is empty");
                    localStorage.setItem('sessions', JSON.stringify([sessionId]));
                }
                else{
                    console.log("session id list is not empty, adding new session id");
                    let ids = JSON.parse(sessionIds);
                    ids.push(sessionId);
                    localStorage.setItem("sessions", JSON.stringify(ids));
                }
            }
            else if(temp != null){
                console.log("current session id has data updating info");
                localStorage.setItem(sessionId, JSON.stringify(playerSessionData))
            }
          
        }
    }, [playerSessionData, sessionId]);
    // when playersessiondata changes, update the object, and store it in local storage
    // unique session id, set item playerdata

    useEffect(()=>{
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
          } catch (error) {
            setAllowsLocalStorage(false);
          }
          setAllowsLocalStorage(true);
          setSessionID(crypto.randomUUID());
          setPreviousData(getLocalData());
    },[]);  

    function addD2Num(){
        setSessionData(prevData =>({
            ...prevData,
            numberOfD2s: prevData.numberOfD2s + 1,
            blockPercentage: Math.ceil((prevData.d2sBlocked / (prevData.numberOfD2s+1)) * 100)
        }));
    };

    function addD2Blocked(){
        setSessionData(prevData =>({
            ...prevData,
            d2sBlocked: prevData.d2sBlocked + 1
        }));
    }

    function addD2BlockStreak(successfulBlock){
        if(successfulBlock){
            if(playerSessionData.longestStreak[0] + 1 > playerSessionData.longestStreak[1]){
                setSessionData(prevData =>({
                    ...prevData,
                    longestStreak: [prevData.longestStreak[0] + 1, prevData.longestStreak[0] + 1]
                })); 
            }
            else{
                setSessionData(prevData =>({
                    ...prevData,
                    longestStreak: [prevData.longestStreak[0] + 1, prevData.longestStreak[1]]
                })); 
            }
        }
        else{
            setSessionData(prevData =>({
                ...prevData,
                longestStreak: [0, prevData.longestStreak[1]]
            })); 
        }
        
    }

    function setReactionTime(newReaction){
        setSessionData(prevData =>({
            ...prevData,
            avgReactionTimeD2: [prevData.avgReactionTimeD2[0] + (newReaction), prevData.avgReactionTimeD2[1] + 1]
        }));
    }

    function setReactionTimeEarly(newReaction){
        setSessionData(prevData =>({
            ...prevData,
            avgReactionMiss: [prevData.avgReactionMiss[0] + (newReaction), prevData.avgReactionMiss[1] + 1]
        }));
    }

    function setMissedReactions(){
        setSessionData(prevData =>({
            ...prevData,
            wrongReactionNum: prevData.wrongReactionNum + 1
        }));
    }

    function setTotalReactions(){
        setSessionData(prevData =>({
            ...prevData,
            totalReactions: prevData.totalReactions + 1
        }));
    }

    function getLocalData(){
        if(allowsLocalStorage){
            let sessionList = JSON.parse(localStorage.getItem('sessions'));
            let newlist = [];
            if(sessionList != null){
                sessionList.forEach(element => {
                    newlist.push(JSON.parse(localStorage.getItem(element)))
                });
            }
            return newlist;
        }
        return [];
    }

    const getStatsButtonClicked = () =>{
        navigator.clipboard.writeText(
            `Jin d2 reaction test\n🎯 ${playerSessionData.d2sBlocked}/${playerSessionData.numberOfD2s} d2s blocked\n✅ ${playerSessionData.totalReactions - playerSessionData.wrongReactionNum - (playerSessionData.numberOfD2s - playerSessionData.d2sBlocked)+ '/' + playerSessionData.totalReactions} all correct reactions\n⏱️ ${playerSessionData.avgReactionTimeD2[1] != 0 ? (Math.floor(playerSessionData.avgReactionTimeD2[0] /playerSessionData.avgReactionTimeD2[1])) : 0} ms avg\n🔥 ${playerSessionData.longestStreak[1]} streak\n⁉️ ${playerSessionData.wrongReactionNum} wrong reactions\n❌ late by ${playerSessionData.avgReactionMiss[1] != 0 ? (Math.floor(playerSessionData.avgReactionMiss[0] / playerSessionData.avgReactionMiss[1])) : 0} ms avg`
        );
        statsClicked();
    }

    const videoFirstFrameLoaded = ()=>{
        if(!hasRenderedOnce){
            setHasRenderOnce(true);
            setVideoHeight(videoRef.current.clientHeight);
        }
        setIsVideoLoading(false);
    }

    return(
        <>
            
            <div className={'flexParent'} style={{backgroundColor: backgroundColor}}>
                <MainDiv className={'main'}>
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
                            isVideoLoading = {setLoadingVideo}
                            canVideoPlayFirstFrame = {videoFirstFrameLoaded}
                        >
                        </VideoPlayer>
                    </BlurDiv>
                    <div className={'fillerDiv'} style={{minHeight: `${vidHeight}px`}}>
                        
                    </div>
                </MainDiv>
                <GameText
                        mainText={mainText}
                        detailText={detailText}
                        shouldBlur={shouldBlur}
                        clickPlayAgainText={clickPlayAgainText}
                        reactionSpeed = {reactionSpeed}
                    >
                </GameText>
            </div>
            <div className='flexParent2'>
                    <div className='flexContainer'>
                        <FlexColumn>
                            <StatsCard>
                                    <FlexRow>
                                        <div className = 'headerText'><strong>d2's blocked</strong></div>
                                    </FlexRow>
                                    <FlexRow>
                                        <div className='statsText'>Successful d2 blocks:</div>
                                        <div className = 'statsText'><strong>{playerSessionData.d2sBlocked}</strong></div>
                                    </FlexRow>
                                    
                                    <FlexRow>
                                        <div className='statsText'>d2 block percentage:</div>
                                        <div className = 'statsText'><strong>{playerSessionData.numberOfD2s != 0 ? (playerSessionData.blockPercentage) : 0}%, {playerSessionData.d2sBlocked} / {playerSessionData.numberOfD2s}</strong></div>
                                    </FlexRow>

                                    <FlexRow>
                                        <div className='statsText'>total correct reactions:</div>
                                        <div className = 'statsText'><strong>{playerSessionData.totalReactions != 0 ?  Math.floor((((playerSessionData.totalReactions - playerSessionData.wrongReactionNum) - (playerSessionData.numberOfD2s - playerSessionData.d2sBlocked)) * 100) / playerSessionData.totalReactions) : 0}%, {playerSessionData.totalReactions - playerSessionData.wrongReactionNum - (playerSessionData.numberOfD2s - playerSessionData.d2sBlocked)} / {playerSessionData.totalReactions}</strong></div>
                                    </FlexRow>
                            </StatsCard>
                            <StatsCard>
                                <div className = 'headerText'><strong>Reaction statistics</strong></div>
                                <FlexRow>
                                    <div className ='statsText'>Average reaction time to d2:</div>
                                    <div className = 'statsText'><strong>{playerSessionData.avgReactionTimeD2[1] != 0 ? (Math.floor(playerSessionData.avgReactionTimeD2[0] /playerSessionData.avgReactionTimeD2[1])) : 0} ms</strong></div>
                                </FlexRow>
                                <FlexRow>
                                    <div className ='statsText'>Longest d2 reaction streak:</div>
                                    <div className ='statsText'><strong>{playerSessionData.longestStreak[1]}</strong></div>
                                </FlexRow>
                            </StatsCard>
                            <StatsCard>
                                <div className = 'headerText'><strong>Missed reaction statistics</strong></div>
                                <FlexRow>
                                    <div className ='statsText'>Number of wrong reactions:</div> 
                                    <div className = 'statsText'><strong>{playerSessionData.wrongReactionNum}</strong></div>
                                </FlexRow>
                                <FlexRow>
                                    <div className ='statsText'>d2 reaction miss average:</div>
                                    <div className = 'statsText'><strong>{playerSessionData.avgReactionMiss[1] != 0 ? (Math.floor(playerSessionData.avgReactionMiss[0] / playerSessionData.avgReactionMiss[1])) : 0} ms</strong></div>
                                </FlexRow>
                                <Button 
                                    onClick={getStatsButtonClicked}
                                />
                            </StatsCard>
                        </FlexColumn>
                        
                        <Card>
                            <div className ='headerText'><strong>Jin d2</strong></div>
                            
                            <video
                                loop = {true}
                                autoPlay = {true}
                                playsInline
                                muted
                                width={'100%'}
                                style={{objectFit: 'contain', margin: '0px 0px 12.182px 0px'}}
                            >
                                <source src = {d2Loop} type = "video/mp4" />
                            </video>
                            
                            
                            <p className ='cardText1'>
                                <strong>Why d2 is good</strong>
                            </p>
                            <ul className = 'bulletList'> 
                                <li className="cardText">high crushing counterhit launching low</li>
                                <li className="cardText">only <strong>-14 on block</strong> which is not launch punishable for majority of the cast</li>
                                <li className="cardText">evades jabs and moves that are used to stop Jin from doing big moves</li>
                                <li className="cardText">synergizes with the rest of Jin's movelist</li>
                            </ul>
                            <div className='cardText'>
                                Training yourself to block d2 on reaction solves one piece of the puzzle and lets you focus on other areas of the match.
                            </div> 
                        </Card>
                    </div>
            </div>
            
            <div className = 'flexParent2'>
                <div className='flexContainer'>
                    <Card>
                        <FlexRow style={{margin: '0 0 15px 0'}}>
                            <div className = 'headerText'>Previous sessions stats</div>
                            {allowsLocalStorage ? 
                                <button 
                                    className = 'cardText'
                                    onClick={()=>{
                                        localStorage.clear();
                                        clearClicked();
                                    }}
                                >
                                    Clear local storage data
                                </button>
                            :
                                <div className ='cardText'>local storage disabled</div>
                             }
                            
                        </FlexRow>
                        <div className='graph'>
                            <ResponsiveContainer
                                width={'100%'}
                                height={'100%'}
                            >
                                {allowsLocalStorage && localStorage.getItem('sessions') != null && JSON.parse(localStorage.getItem('sessions')).length > 1?
                                    <LineChart
                                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                                        data={previousPlayerData}
                                    >
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis>
                                        <Label
                                            value={'previous play sessions'}
                                            offset={0}
                                            position={'insideBottom'}
                                        />
                                        </XAxis>
                                        <YAxis
                                            label={{value: 'd2 block %', angle: -90, position: 'insideLeft'}}
                                        />
                                        <Line type="monotone" dataKey="blockPercentage" stroke="#82ca9d" strokeWidth={2} fill='#82ca9d' />
                                        <Tooltip
                                            content={<StatsTooltip
                                                payload={previousPlayerData}
                                            />}
                                        />
                                    </LineChart>
                                    :
                                    <div className ='cardText' style = {{textAlign: 'center'}}>You have no previous data or local storage is disabled</div>
                                }
                            </ResponsiveContainer>
                        </div>
                       
                        
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
    width:100%
`;

const FlexColumn = styled.div`
    display:flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    gap: 29.124px;
`;  

const FlexRow = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
`; 

//<div className ='bolderText'>Why should you learn to react to it?</div>