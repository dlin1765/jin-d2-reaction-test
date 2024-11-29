import '../styles/Button.css'

function Button({onClick}){

    

    return(
        <>
            <div 
                className ='buttonContainer'
                onClick={onClick}
            >
                <img src='src/assets/logo.png' className ='icon'></img>
                <div className = 'buttonTxt'>Share your stats</div>
            </div>
        </>
    );
}

export default Button;