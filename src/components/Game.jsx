import React, {useState, useEffect, useRef, useCallback} from 'react';
import d2TwoSec from '../assets/2-jin-d2.mp4';
import noThreeSec from '../assets/jin-standing-3.mp4';
import noFourSec from '../assets/jin-standing-4.mp4';
import d2Loop from '../assets/jin-just-d2.mp4'
import styled from 'styled-components';
import BlurDiv from './BlurDiv.jsx';
import Button from './Button.jsx'
import { AboutSection } from './AboutSection.jsx';
import '../styles/MainDiv.css'
import '../styles/Game.css'
import { VideoPlayer } from './VideoPlayer.jsx';
import { GameText } from './GameText.jsx';
import { Card } from './Card.jsx';
import { StatsCard } from './StatsCard.jsx'
import '../styles/AboutSection.css'
import StatsTooltip from './StatsTooltip.jsx';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip } from 'recharts';


const jinD2Two = {vid: d2TwoSec, vidLength: 3620, d2At: 2000, id: 0};
const jinNoThree = {vid: noThreeSec, vidLength: 3000, d2At: -1, id: 1};
const jinNoFour = {vid: noFourSec, vidLength: 4000, d2At: -1, id: 2};
const vidList = [jinD2Two, jinNoThree, jinNoFour];

const defaultSessionData = {numberOfD2s: 0, d2sBlocked: 0, avgReactionTimeD2: [0,0], avgReactionMiss: [0,0], longestStreak: [0,0], wrongReactionNum: 0, blockPercentage: 0, id: '|'};

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


// To-do
// fix line height in body text and central text
// pick a font for the website
// pick a color scheme for the website
// fix letter spacing for leader (negative line height)
// 50-75 characters long for text paragraphs
// two different font sizes for text
// 
// change d2 about section (change header text), remove why you should learn to react to it
// make them bullet points 

// figure out what the stats page should look like 
// find bug where it says the video is no d2 but it actually is 
// - its because sarah's reaction time is so slow that the video stops playing so it ju

// stretch goal: get a global counter of how many d2s and how many blocked 


export const Game = () =>{
    const [shouldBlur, setBlur] = useState(true);
    let [randVid, setRandVid] = useState(vidList[Math.floor(Math.random() * (3 - 0) + 0)]);
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
    const [renderOnce, setRenderOnce] = useState(false);

    const [, rerender] = useState(0);
    const videoRef = useRef(null);
    const blurRef = useRef(null);

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
                    }
                    console.log('current time = ' + currentTime);
                    setGameStateNum(gameStateNum + 1);
                    addD2Num();
                }
                else{
                    // if the video has no d2 and you clicked
                    displayResults(4);
                    addD2BlockStreak(false);
                    setCurrentReactionTime(-1);
                    setMissedReactions();
                    console.log("no d2 what are you reacting to!");
                } 
        }
        else{
            setBlur(false);
            setPrevVid(randVid);
            setIsVideoLoading(true);
            let randNum = Math.floor(Math.random() * (2 - 0) + 0);
            if(vidList[randNum] == randVid){
                videoRef.current.load();
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
        }
        else if(gameStateNum == 1 && randVid.d2At != -1){
            displayResults(2);
            addD2Num();
            addD2BlockStreak(false);
            setCurrentReactionTime(videoRef.current.currentTime * 1000 -  randVid.d2At);
            setReactionTime(((videoRef.current.currentTime * 1000 - randVid.d2At)));
            setReactionTimeEarly(((videoRef.current.currentTime * 1000 - (randVid.d2At + 366.6674))));
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
        if (videoRef.current && randVid) {
            setVideoHeight(videoRef.current.clientHeight);
            videoRef.current.load(); // Reload the video when randVid changes
        }
    }, [randVid]);

    useEffect(()=>{
        console.log(videoRef.current.clientHeight);
        setVideoHeight(videoRef.current.clientHeight);
       
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
            setRenderOnce(true);
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
          setRenderOnce(true);
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

    return(
        <>
            
            <div className={'flexParent'}>
                <MainDiv className={'main'}>
                    
                    <GameText
                        mainText={mainText}
                        detailText={detailText}
                        shouldBlur={shouldBlur}
                        clickPlayAgainText={clickPlayAgainText}
                        reactionSpeed = {reactionSpeed}
                    >
                    </GameText>
                    <BlurDiv
                        shouldBlur={shouldBlur}
                        ref = {blurRef}
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
                        <FlexColumn>
                            <StatsCard>
                                    <FlexRow>
                                        <div className = 'headerText'>d2's blocked</div>
                                        <Button />
                                    </FlexRow>
                                    <FlexRow>
                                        <div className='statsText'>Successful d2 blocks:</div>
                                        <div className = 'statsText'><strong>{playerSessionData.d2sBlocked}</strong></div>
                                    </FlexRow>
                                    
                                    <FlexRow>
                                        <div className='statsText'>d2 block percentage:</div>
                                        <div className = 'statsText'><strong>{playerSessionData.numberOfD2s != 0 ? (playerSessionData.blockPercentage) : 0}%, {playerSessionData.d2sBlocked} / {playerSessionData.numberOfD2s}</strong></div>
                                    </FlexRow>
                            </StatsCard>
                            <StatsCard>
                                <div className = 'headerText'>Reaction statistics</div>
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
                                <div className = 'headerText'>Missed reaction statistics</div>
                                <FlexRow>
                                    <div className ='statsText'>Number of wrong reactions:</div> 
                                    <div className = 'statsText'><strong>{playerSessionData.wrongReactionNum}</strong></div>
                                </FlexRow>
                                <FlexRow>
                                    <div className ='statsText'>d2 reaction miss average:</div>
                                    <div className = 'statsText'><strong>{playerSessionData.avgReactionMiss[1] != 0 ? (Math.floor(playerSessionData.avgReactionMiss[0] / playerSessionData.avgReactionMiss[1])) : 0} ms</strong></div>
                                </FlexRow>
                            </StatsCard>
                        </FlexColumn>
                        
                        <Card>
                            <div className ='headerText'>Jin d2</div>
                            
                            <video
                                loop = {true}
                                autoPlay = {true}
                                playsInline
                                webkitPlaysinline
                                muted
                                width={'100%'}
                                style={{objectFit: 'contain'}}
                            >
                                <source src = {d2Loop} type = "video/mp4" />
                            </video>
                            
                            <div className ='cardText'>
                                d2 is an high crushing low with good tracking that also launches on counterhit . On top of all that, it's also only <strong>-14 on block.</strong>
                            </div>
                            <div className='cardText'>
                                - not launch punishable for majority of the cast 
                            </div>
                            <div className='cardText'>
                               - evades jabs and moves that are used to stop Jin from doing big moves
                            </div>
                            <div className='cardText'>
                                - extremely threatening which allows Jin to gain free pressure
                            </div>
                            <div className='cardText'>
                                - synergizes with the rest of Jin's movelist
                            </div>
                            <div className='cardText'>
                                Training yourself to block d2 on reaction solves one piece of the puzzle and lets you focus on other areas of the match.
                            </div> 
                        </Card>
                    </div>
            </div>
            
            <div className = 'flexParent2'>
                <div className='flexContainer'>
                    <Card>
                        <FlexRow>
                            <div className = 'headerText'>Previous sessions stats</div>
                            {allowsLocalStorage ? 
                                <button 
                                    className = 'cardText'
                                    onClick={()=>{
                                        localStorage.clear();
                                    }}
                                >
                                    Clear local storage data
                                </button>
                            :
                                <div className ='cardText'>local storage disabled</div>
                             }
                            
                        </FlexRow>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            {allowsLocalStorage ?
                                <LineChart
                                    width = {800}
                                    height = {400}
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
                                    <Line type="monotone" dataKey="blockPercentage" stroke="#82ca9d" />
                                    <Tooltip
                                        content={<StatsTooltip
                                            payload={previousPlayerData}
                                        />}
                                    />
                                </LineChart>
                                :
                                <div className ='cardText'>local storage disabled</div>
                            }
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