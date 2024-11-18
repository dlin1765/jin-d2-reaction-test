import Header from './Header.jsx'
import VideoPlayer from './VideoPlayer.jsx';
import TestVideoPlayer from './TestVideoPlayer.jsx'
import video2 from './assets/jin-d2.mp4'

function Webpage(){
    <>

        <div>
            <Header />
           <VideoPlayer vid = {video2}/>
        
        </div>
    </>
}

export default Webpage;