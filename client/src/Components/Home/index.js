import React, { useState, useContext } from 'react'
import './style.css'
import Forms from './forms'
import {UserContext} from './../../context/userContext'

function Home(){

    const { userData } = useContext(UserContext)

        return(
                <div>
                    {userData.user ? (
                    <div className="firstpage">
                        <h1>Welcome {userData.user.username}</h1>
                    </div>

                    ) : (
                    <div>
                        <div className="firstpage">
                            <h1>MERN CHAT APP</h1>
                            <a href="#login" className="btn">Se connecter</a>
                        </div>
                        <div id="login" className="loginpage">
                            <Forms/>
                        </div>
                    </div>
        
                    )}

                </div>
            )
        
    
}

export default Home