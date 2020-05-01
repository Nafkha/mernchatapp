import React, { useState, useEffect } from 'react';
import Home from './Components/Home'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {UserContext} from './context/userContext'
import Axios from 'axios'

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

       Axios.post("/api/users/tokenIsValid", null, {
        headers: {
          "x-auth-token":token
        }
      }).then(tokenRes => {
         Axios.get("/api/users", {
          headers:{
            "x-auth-token":token
          }
        }).then(userRes =>{
          setUserData({
            token,
            user: userRes
          })
        }).catch(err => console.log(err.message))
      }).catch(err => console.log(err.message))

    };

    checkLoggedIn();
  }, []);


  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{userData, setUserData}}>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>

  );
}

export default App;
