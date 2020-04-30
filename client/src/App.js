import React, { useState } from 'react';
import Home from './Components/Home'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {UserContext} from './context/userContext'

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })
  return (
    <BrowserRouter>
    <UserContext.Provider value={{userData, setUserData}}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </UserContext.Provider>
    </BrowserRouter>

  );
}

export default App;
