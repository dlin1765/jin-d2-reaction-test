import React, {useState, useEffect, useRef} from 'react';
import video from '../assets/jin-standing.mp4'
import video2 from '../assets/jin-d2.mp4'


export const VideoPlayer = ({vid, videoClicked, videoRef, videoOnPlay, videoFinished, videoLoading}) => {
    return(
        <>
            {vid && vid.vid ?
            <video 
                ref = {videoRef}
                width = '75%'
                height = 'auto'
                loop = {false}
                autoPlay = {false}
                onClick={videoClicked}
                onPlaying={videoOnPlay}
                onEnded={videoFinished}
                onLoadedData={videoLoading}
                onError={
                    console.log("vid name: " + vid.vid.source)
                }
                preload='auto'
            >
            <source src={vid.vid} type = "video/mp4" />
            your browser does not support video tag
            </video> : <div></div>
            }
        </>
    )
}
