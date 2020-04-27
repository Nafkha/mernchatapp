import React from 'react'
import './style.css'
import Forms from './forms'

function Home(){

    return(
        <div>
            <div className="firstpage">
                <h1>MERN CHAT APP</h1>
                <a href="#login" className="btn">Se connecter</a>
            </div>
            <div id="login" className="loginpage">
                <Forms/>
            </div>
        </div>
    )

}

export default Home