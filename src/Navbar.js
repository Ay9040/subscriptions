function logout(){
    localStorage.removeItem('user')
    window.location.href = "/"
}

function Navbar(props){
    return( 
        <div className="bg-black">
            <div className="flex flex-row justify-around text-white">
                <div className="my-3 p-5 transition duration-500 ease-in-out bg-black hover:bg-white hover:text-black transform hover:scale-110">
                    <a href="/" className="">HOME</a>
                </div>
                <div className="my-3 p-5 transition duration-500 ease-in-out bg-black hover:bg-white hover:text-black transform hover:scale-110">
                    <a href="/#Sabout" className="">ABOUT</a>
                </div>
                <div className="my-3 p-5 transition duration-500 ease-in-out bg-black hover:bg-white hover:text-black transform hover:scale-110">
                    <a href="/subscriptions" className="">SUBSCRIPTIONS</a>
                </div>
                { props.login ?
                <div className="my-3 p-5 transition duration-500 ease-in-out bg-red-500 hover:bg-red-500 hover:text-white transform hover:scale-110">
                    <button href="/subscriptions" className="focus:outline-none" onClick={logout}>LOGOUT</button>
                </div> : null
                }   
            </div>
        </div>
    )
}

export default Navbar;