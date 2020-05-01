import React, { useState, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import Axios from 'axios'
import {UserContext} from '../../../context/userContext'
import './style.css'
import { Alert } from 'reactstrap';




function Forms(){

    const [action,setAction] = useState('register')
    const [username,setUsername] = useState('')
    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    // eslint-disable-next-line
    const [error, setError]= useState('')

    const {setUserData} = useContext(UserContext);
    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);
  
    const history = useHistory()

    const register = (e) =>{
        e.preventDefault()
        const registerdata = {username, firstname, lastname, email, password, password2}
        Axios.post('/api/users/register', registerdata).then(user => {
            Axios.post('/api/users/login',{username,password}).then(res=>{
                localStorage.setItem('auth-token',res.data.token)
                localStorage.setItem('username',res.data.user.username)
                setUserData({
                    token: res.data.token,
                    user: res.data.user
                })
                console.log(res.data.user)
                history.push('/')
            })
        }).catch(err =>{
            err.response.data.Error && setError(err.response.data.Error)
        })
    }

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
            console.log("error "+error)
         
        })

    }


    if(action === 'login'){

    return(
        <div className="main">
            <div className="left">
                <div className="button">
                    <button onClick={()=> setAction('createAccount')}  className="buttonP">Se Connecter</button>
                </div>
            </div>
            <div className="right">
                <h4>Créer un compte</h4>
                {
                    error ? (
                        <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                        {error}
                      </Alert>


                    ): null
                }
                <form onSubmit={register}>
                    <label>Nom d'utilisateur</label>
                    <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur"/>
                    <label>Nom</label>
                    <input type="text" name="lastname" onChange={(e) => setFirstname(e.target.value)} placeholder="Nom"/>
                    <label>Prénom</label>
                    <input type="text" name="firstname" onChange={(e) => setLastname(e.target.value)} placeholder="Prénom"/>
                    <label>Email</label>
                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Adresse e-mail"/>
                    <label>Mot de passe</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe"/>
                    <label>Répeter le mot de passe</label>
                    <input type="password" name="passwordrepeat" onChange={(e) => setPassword2(e.target.value)} placeholder="Repeter mot de passe"/>
                    <input type="submit" className="buttonP" style={{fontSize: ".8rem"}} value="Créer Compte"/>

                </form>
            </div>

        </div>
    )
    }else{
        return(
            <div className="main">
            <div className="left">
                <div className="button">
                    <button onClick={()=>setAction('login')}  className="buttonP">Créer un compte</button>
                </div>
            </div>
            <div className="right">
                <h4>Se Connecter</h4>
                {error ? (
                        <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                        {error}
                      </Alert>
                  
                ):null}
                <form onSubmit={login}>
                    <label>Nom d'utilisateur</label>
                    <input type="text" name="username" placeholder="Nom d'utilisateur" onChange={(e) => setUsername(e.target.value)}/>
                    <label>Mot de passe</label>
                    <input type="password" name="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}/>
                    <input type="submit" className="buttonP" style={{fontSize: ".8rem"}} value="Se connecter"/>
                </form>
            </div>

        </div>


        )
    }
}
export default Forms