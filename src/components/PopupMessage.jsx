import '../styles/PopupMessage.css'

function PopupMessage({text}){

    return(
        <div className="msgContainer">
            <p className = "msgText">
               {text}
            </p>
        </div>
    );
}

export default PopupMessage;