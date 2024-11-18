import React, {useState, useEffect, useRef} from 'react';
import Button from '../components/Button.jsx'
import '../styles/BlurDiv.css'

function BlurDiv({ children, shouldBlur }){
    return(
        <>
            <div className= {shouldBlur ? 'blurStyle' : 'defaultStyle'}>
                {children}
            </div>
        </>
        
    );
}

export default BlurDiv;