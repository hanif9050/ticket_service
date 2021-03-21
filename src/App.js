import logo from "./logo.svg";
import "./App.css";
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Destination from "./Destination/Destination";
import Header from "./Header/Header";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Error from "./Error/Error";

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div className="main-home">
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/destination">
              <Destination></Destination>
            </PrivateRoute>
            <Route exact path="/">
              <Home></Home>
            </Route>

            <PrivateRoute path="/:vehId">
              <Destination></Destination>
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
