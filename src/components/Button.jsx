import '../styles/Button.css'

function Button({onClick}){

    

    return(
        <>
            
            <div className = 'buttonContainer'>
                <button
                    onClick={onClick}
                >
                    Share your stats
                </button>
            </div>
        </>
    );
}

export default Button;