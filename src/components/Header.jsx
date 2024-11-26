function Header(){

    return (
        <>
            
            <div style ={{display:'flex', 
                backgroundColor: "white", 
                boxShadow: "0px 0px 20px 0px black", 
                zIndex: 10, 
                justifyContent: "center",
                position: 'relative'
                }}>

                <div style={{display:"flex", flexGrow: 0, flexShrink: 1, flexBasis: '65%', alignItems:"center", justifyContent:"space-between"}}>
                        <p style = {{fontSize: '29.124px', fontWeight: '400', lineHeight: .5, margin: 0, color: 'black', letterSpacing:'-.5px'}}>Jin d2 Reaction Test</p>
                        <button style = {{fontSize: '29.124px', fontWeight: '400', color: 'black'}}>Other moves</button>
                </div>
            </div>
        
        </>
    );
}

export default Header;