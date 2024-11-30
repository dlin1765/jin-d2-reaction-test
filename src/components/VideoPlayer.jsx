import React, {useState, useEffect, useRef} from 'react';
import poster from '../assets/jin-d2-1_000.png'

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
                    onLoadStart={isVideoLoading}
                    preload='auto'
                    poster={poster}
                    style = {{zIndex: 4, height: '100%', width: 'clamp(300px, 65%, 1280px)'}}
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
