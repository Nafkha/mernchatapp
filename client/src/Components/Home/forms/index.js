import React, { useState, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import Axios from 'axios'
import {UserContext} from '../../../context/userContext'
import './style.css'



function Forms(){

    const [action,setAction] = useState('login')
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')
    // eslint-disable-next-line
    const [error, setError]= useState('')

    const {setUserData} = useContext(UserContext);
    const history = useHistory()

    const login = (e) =>{
        e.preventDefault()
        const logindata = {username, password}
        Axios.post('/api/users/login', logindata).then(res => {
            localStorage.setItem('auth-token', res.data.token)
            localStorage.setItem('username', res.data.user.username)

            setUserData({
                token: res.data.token,
                user: res.data.user
            })
            console.log(res.data.user)
            history.push("/")

        }).catch(err =>{
            err.response.data.Error && setError(err.response.data.Error)
         
        })

    }


    if(action === 'login'){

    return(
        <div className="main">
            <div className="left">
                <div className="button">
                    <button onClick={()=> setAction('createAccount')}  className="btn">Se Connecter</button>
                </div>
            </div>
            <div className="right">
                <h4>Créer un compte</h4>
                <form>
                    <label>Nom d'utilisateur</label>
                    <input type="text" name="username" placeholder="Nom d'utilisateur"/>
                    <label>Nom</label>
                    <input type="text" name="lastname" placeholder="Nom"/>
                    <label>Prénom</label>
                    <input type="text" name="firstname" placeholder="Prénom"/>
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Adresse e-mail"/>
                    <label>Mot de passe</label>
                    <input type="password" name="password" placeholder="Mot de passe"/>
                    <label>Répeter le mot de passe</label>
                    <input type="password" name="passwordrepeat" placeholder="Repeter mot de passe"/>

                </form>
            </div>

        </div>
    )
    }else{
        return(
            <div className="main">
            <div className="left">
                <div className="button">
                    <button onClick={()=>setAction('login')}  className="btn">Créer un compte</button>
                </div>
            </div>
            <div className="right">
                <h4>Se Connecter</h4>
                <form onSubmit={login}>
                    <label>Nom d'utilisateur</label>
                    <input type="text" name="username" placeholder="Nom d'utilisateur" onChange={(e) => setUsername(e.target.value)}/>
                    <label>Mot de passe</label>
                    <input type="password" name="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}/>
                    <input type="submit" value="submit"/>
                </form>
            </div>

        </div>


        )
    }
}
export default Forms