import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header.jsx'
import VideoPlayer from './VideoPlayer.jsx'
import TestVideoPlayer from './TestVideoPlayer.jsx'
import VideoPlayerWrapper from './VideoPlayerWrapper.jsx'

function App() {
  const [count, setCount] = useState(0)

        
//   <div style = {{padding: "32px", backgroundColor:'lightblue', zIndex: 2}}>
//   <VideoPlayer />
// </div>

  return (
    <>
      <Header />

      <div style = {{padding: "32px", backgroundColor:'lightblue', zIndex: 2}}>
        <VideoPlayerWrapper />
      </div>
    </>
  )
}

export default App
