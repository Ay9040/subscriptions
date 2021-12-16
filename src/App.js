import Navbar from './Navbar'
import Login from "./Login"
import Subscription from "./Subscription"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import background from "./header.png";
import Home from './Home'
import Signup from './Signup'
function checkLogin() {

}

function App() {
  const [login, setLogin] = useState(null)

  useEffect(async function () {
    const loggedInUser = await localStorage.getItem("user");
    console.log(loggedInUser)
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      await setLogin(foundUser);
    }
  }, []);


  return (
    <Router>
      <div className="App min-h-screen" style={{ backgroundImage: `url(${background})` }}>
        <Navbar login={login} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/subscriptions" component={() => login == null ? <Login login={login} setLogin={setLogin} message={null} /> : <Subscription username={login} />} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
