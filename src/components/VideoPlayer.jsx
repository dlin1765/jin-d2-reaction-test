import React, {useState, useEffect, useRef} from 'react';
import video from '../assets/jin-standing.mp4'
import video2 from '../assets/jin-d2.mp4'

/*
/*
            <div style={{
                    position: "absolute",
                    width: "75%",
                    height: "100%",
                    backgroundColor: "transparent",
                    zIndex: 3
                  }}>

            </div>

            {vid && vid.vid ?
                <video 
                    ref = {videoRef}
                    width = '75%'
                    height = '100%'
                    loop = {false}
                    autoPlay = {false}
                    onClick={videoClicked}
                    onPlaying={videoOnPlay}
                    onEnded={videoFinished}
                    onLoadedData={videoLoading}
                    key={key}
                    onError={
                        console.log("vid name: " + vid.vid.source)
                    }
                    preload='auto'
                    style = {{zIndex: 4}}
                >
                <source src={vid.vid} type = "video/mp4" />
                your browser does not support video tag
                </video> : 
            
                <div style={{
                    width: "75%",
                    height: "100%",
                    backgroundColor: "white",
                    zIndex: 3
                  }}>

                </div>
            }

*/
export const VideoPlayer = ({vid, videoClicked, videoRef, videoOnPlay, videoFinished, videoLoading, key, isVideoLoading, canVideoPlayFirstFrame}) => {
    return(
        <>
            {vid && vid.vid ?
                <video 
                    ref = {videoRef}
                    playsInline = {true}
                    loop = {false}
                    autoPlay = {false}
                    onPointerDown={videoClicked}
                    onPlaying={videoOnPlay}
                    onEnded={videoFinished}
                    onLoadedData={videoLoading}
                    onCanPlay={canVideoPlayFirstFrame}
                    key={key}
                    onError={
                        console.log("vid name: " + vid.vid.source)
                    }
                    preload='auto'
                    style = {{zIndex: 4, width:'65%', height: '100%'}}
                >
                <source src={vid.vid} type = "video/mp4" />
                your browser does not support video tag
                </video> : 
            
                <div style={{
                    
                  }}>
                    loading...
                </div>
            }
            
        </>
    )
}
