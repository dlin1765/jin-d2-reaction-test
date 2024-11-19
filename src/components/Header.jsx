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

                <div style={{display:"flex", flexGrow: 0, flexShrink: 1, flexBasis: '75%', alignItems:"center", justifyContent:"space-between"}}>
                        <p style = {{}}>Jin D2 Reaction Test</p>
                        <button style = {{}}>Register</button>
                </div>
            </div>
        
        </>
    );
}

export default Header;