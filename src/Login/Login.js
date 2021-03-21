import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import "./Login.css";
import { UserContext } from "../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const Login = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    match: false,
    error: false,
    signIn: false,
    signUp: false,
    successSignUP: false,
    successIn: false,
    failedSignUp: false,
    failedSignIn: false,
    displayName: "",
  });
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const handleEvent = (e) => {
    let formValid = true;
    if (e.target.name === "name") {
      user.name = e.target.value;
    }
    if (e.target.name === "email") {
      formValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        String(e.target.value).toLowerCase()
      );
      //   const userInfo = { ...user };
      //   userInfo[e.target.name] = e.target.value;
      //   setUser(userInfo);
      //   console.log(user);
      user.email = e.target.value;
    }

    if (e.target.name === "password") {
      formValid = /^(?=.*\d)(?=.*[a-z]).{8,}$/.test(e.target.value);
      //   const userInfo = { ...user };
      //   userInfo.password = e.target.value;
      //   setUser(userInfo);
      user.password = e.target.value;
    }
    if (e.target.name === "confirmPassword") {
      //   formValid = /^(?=.*\d)(?=.*[a-z]).{8,}$/.test(e.target.value);
      //   const userInfo = { ...user };
      //   userInfo.confirmPassword = e.target.value;
      //   setUser(userInfo);
      user.confirmPassword = e.target.value;
    }
    if (user.password === user.confirmPassword) {
      const newUser = { ...user };

      newUser.error = false;
      newUser.match = true;
      setUser(newUser);
      formValid = true;
    }
    if (!user.signIn && user.password !== user.confirmPassword) {
      const newUser = { ...user };
      newUser.error = true;
      newUser.match = false;
      setUser(newUser);
    }
  };

  const signIn = () => {
    const userinfo = { ...user };
    userinfo.signIn = true;
    userinfo.signUp = true;

    setUser(userinfo);
  };

  const signUp = () => {
    const userInfo = { ...user };
    userInfo.signIn = false;
    userInfo.signUp = false;
    setUser(userInfo);
  };
  if (user.error) {
    setTimeout(function () {
      const userInfo = { ...user };
      userInfo.error = false;
      setUser(userInfo);
    }, 5000);
  }
  if (user.successSignUP) {
    setTimeout(function () {
      const userInfo = { ...user };
      userInfo.successSignUP = false;
      setUser(userInfo);
    }, 5000);
  }

  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.

        const user = result.user;
        console.log("google sign in", user.displayName);
        const userInfo = { ...user };
        userInfo.successIn = true;
        userInfo.displayName = user.displayName;
        setUser(userInfo);
        console.log(userInfo.displayName);
        setLoggedInUser(userInfo);
        history.replace(from);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log("google sign error", errorMessage);
        // ...
      });
  };
  const handleSubmit = (e) => {
    if (!user.signIn && user.match && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const user1 = userCredential.user;

          updateUserName(user.name);
          const userInfo = { ...user };
          userInfo.successSignUP = true;
          setUser(userInfo);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          const userInfo = { ...user };
          userInfo.failedSignUp = true;
          setUser(userInfo);
        });
    }
    if (user.signIn && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const user1 = userCredential.user;
          console.log(user1.displayName);
          const userInfo = { ...user };
          userInfo.successIn = true;
          userInfo.displayName = user1.displayName;
          setUser(userInfo);
          setLoggedInUser(userInfo);
          history.replace(from);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }
    const updateUserName = (name) => {
      var user = firebase.auth().currentUser;

      user
        .updateProfile({
          displayName: name,
        })
        .then(function () {
          // Update successful.
        })
        .catch(function (error) {
          // An error happened.
        });
    };

    e.preventDefault();
  };
  return (
    <div>
      {!user.successIn && (
        <form onSubmit={handleSubmit} className="main-form">
          <fieldset className="form-group">
            {!user.signIn && (
              <input
                type="text"
                required
                onBlur={handleEvent}
                placeholder="Name"
                name="name"
                className="form-control"
              />
            )}
            <input
              type="email"
              required
              onBlur={handleEvent}
              placeholder="email"
              name="email"
              className="form-control"
            />
            <input
              type="password"
              required
              onBlur={handleEvent}
              placeholder="password"
              name="password"
              className="form-control"
            />
            {!user.signIn && (
              <input
                type="password"
                required
                onBlur={handleEvent}
                placeholder="confirm password"
                name="confirmPassword"
                className="form-control"
              />
            )}

            <input
              className="form-control"
              type="submit"
              value={user.signUp ? "Sign In" : "Create"}
            />
            {user.signUp ? (
              <span>Not Registered ? </span>
            ) : (
              <span>Already Registered ? Sign In</span>
            )}
            {!user.signIn && (
              <button className="btn-control" onClick={signIn}>
                Sign In
              </button>
            )}
            {user.signUp && (
              <button className="btn-control" onClick={signUp}>
                Sign Up
              </button>
            )}

            {user.error && user.confirmPassword !== "" && (
              <p style={{ color: "red" }}>password not match</p>
            )}
            {user.successIn && <p>Login Successfully</p>}
            {user.successSignUP && <p>Created Successfully</p>}
            {user.failedSignUp && (
              <p style={{ color: "green" }}>Failed to create account</p>
            )}
          </fieldset>
        </form>
      )}
      <div className="google-sign-in">
        <button onClick={googleSignIn}>Sign With Google</button>
      </div>
    </div>
  );
};

export default Login;
