import Navbar from './Navbar'
import Login from "./Login"
import Subscription from "./Subscription"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function checkLogin(){

}

function App() {
  const [login, setLogin] = useState(null)

  useEffect(async function() {
    const loggedInUser = await localStorage.getItem("user");
    console.log(loggedInUser)
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      await setLogin(foundUser);
    }
  }, []);


  return (
    <Router>
    <div className="App">
      <Navbar login={login}/>
      <Switch>
        <Route path="/" exact component={() => login == null ? <Login login={login} setLogin={setLogin} message={null}/> : <Subscription username={login}/>} />
        <Route path="/subscriptions" component={() => login == null ? <Login login={login} setLogin={setLogin} message={null}/> : <Subscription username={login}/>} />
      </Switch>
    </div>
    </Router> 
  );
}

export default App;
