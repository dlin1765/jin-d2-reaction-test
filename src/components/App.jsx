import { useState } from 'react'
import '../styles/App.css'
import Header from '../components/Header.jsx'
import {Game} from '../components/Game.jsx'
import {VideoPlayer} from '../components/VideoPlayer.jsx'
import TestVideoPlayer from '../components/TestVideoPlayer.jsx'
import VideoPlayerWrapper from '../components/VideoPlayerWrapper.jsx'

function App() {
  const [count, setCount] = useState(0)

        
//   <div style = {{padding: "32px", backgroundColor:'lightblue', zIndex: 2}}>
//   <VideoPlayer />
// </div>

  return (
    <>
      <Header />
      <Game />
    </>
  )
}



export default App
