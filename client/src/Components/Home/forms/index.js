import React, { useState } from 'react'
import './style.css'



function Forms(){

    const [action,setAction] = useState('login')
    

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
                    <input type="text"/>
                    <label>Nom</label>
                    <input type="text"/>
                    <label>Prénom</label>
                    <input type="text"/>
                    <label>Email</label>
                    <input type="text"/>
                    <label>Mot de passe</label>
                    <input type="password"/>
                    <label>Répeter le mot de passe</label>
                    <input type="password"/>

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
                <form>
                    <label>Nom d'utilisateur</label>
                    <input type="text"/>
                    <label>Mot de passe</label>
                    <input type="password"/>
                </form>
            </div>

        </div>


        )
    }
}
export default Forms