import { useState } from 'react'
import '../styles/App.css'
import Header from '../components/Header.jsx'
import {Game} from '../components/Game.jsx'
import {VideoPlayer} from '../components/VideoPlayer.jsx'
import svgLogo from '../assets/twitter-logo.svg'
import PopupMessage from './PopupMessage.jsx'



function App() {

  const [shouldDisplayMessage, setDisplayCopiedButtonPressed] = useState('');


  function displayCopiedMessage(){
    setDisplayCopiedButtonPressed('Stats copied to clipboard!');
    setTimeout(hideCopiedMessage, 5000);
  }
  
  function displayStorageCleared(){
    setDisplayCopiedButtonPressed('Local storage cleared');
    setTimeout(hideCopiedMessage, 5000);
  }

  function hideCopiedMessage(){
    setDisplayCopiedButtonPressed('');
  }
  

  return (
    <>
      <Header />
      <div className='flexMsgBox'>
        {
          shouldDisplayMessage.length != 0 ?
          <PopupMessage 
            text={shouldDisplayMessage}          
          />
          :
          <>
          </>
        }
      </div>
      <Game 
        statsClicked ={displayCopiedMessage}
        clearClicked ={displayStorageCleared}
      />
     
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
                <object data= {svgLogo} type="image/svg+xml" className='logo'>
                
                </object>
              </a>
        </div>
        <div className='container contact'>
          developed by CatPie / Daniel Lin
        </div>
      </div>
    </>
  )
}



export default App
