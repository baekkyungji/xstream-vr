import React from 'react'
import * as firebase from './../../Services/Firebase'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import {Fade} from "react-reveal"
import {uiConfig} from "../../Services/Firebase"
import "./Login.css";
import logo from "../../Assets/logo.png";

const Login = () => {
  return (
    <div className="container">
      <Fade left>
        <img className="item-logo" width="14%" src={logo}/>
      </Fade>
      <Fade right>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Fade>
    </div>
  )
};

export default Login
