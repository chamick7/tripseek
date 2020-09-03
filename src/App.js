import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

//Pages import
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cookies from "js-cookie";
import { useRecoilValue } from "recoil";
import { account as accountAtom } from '../src/atom';

import Navbar from "./Components/Navbar";

function App() {
  const account = useRecoilValue(accountAtom)
  const token = Cookies.get('token') 
  
  const checkLogin = () =>{
    if(!(account && token)){
      localStorage.removeItem('recoil-persist');
      Cookies.remove('token');
      return false;
    } else{
      return true;
    }
  }

  const isLogined = checkLogin();


  return (
    
    <Router>
    <Navbar isLogined={isLogined} />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/register">
        { isLogined? <Redirect to="/"/>: <Register /> }
        </Route>

        <Route path="/login">
          { isLogined? <Redirect to="/"/>: <Login /> }
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
