import React from 'react'
import * as firebase from './../../Services/Firebase'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import {Fade} from "react-reveal"
import {uiConfig} from "../../Services/Firebase"
import "./Login.css";

const Login = () => {
  return (
    <Fade>
      <div className="login-container">
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </Fade>
  )
};

export default Login
