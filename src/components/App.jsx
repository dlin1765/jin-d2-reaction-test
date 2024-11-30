import { useState } from 'react'
import '../styles/App.css'
import Header from '../components/Header.jsx'
import {Game} from '../components/Game.jsx'
import {VideoPlayer} from '../components/VideoPlayer.jsx'


function App() {
  

//   <div style = {{padding: "32px", backgroundColor:'lightblue', zIndex: 2}}>
//   <VideoPlayer />
// </div>
  const twitterClicked = () =>{

  }

  return (
    <>
      <Header />
      <Game />
      <div className='socials'>
        <div className='container'>
              <div className='contact'>
                      Contact me for issues!
              </div>
              <a className ='logoContainer'
                href='https://twitter.com/WeenDaniel'
                target="_blank"
                rel="noopener noreferrer"
              >
                <object data="src/assets/twitter-logo.svg" type="image/svg+xml" className='logo'>
                
                </object>
              </a>
              
        </div>
      </div>
    </>
  )
}



export default App
