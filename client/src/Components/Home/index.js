import React, {  useContext } from 'react'
import './style.css'
import Forms from './forms'
import {UserContext} from './../../context/userContext'

function Home(){

    const { userData } = useContext(UserContext)

        return(
                <div>
                    {userData.user ? (
                    <div className="firstpage">
                        <h1 className="title">Welcome {localStorage.getItem('username')}</h1>
                    </div>

                    ) : (
                    <div>
                        <div className="firstpage">
                            <h1 className="title">MERN CHAT APP</h1>
                            <a href="#login" className="buttonP">Se connecter</a>
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