import React, {Component} from "react";
import 'aframe';
import 'aframe-particle-system-component';
import {LoggedInArea, Login, SetupProfile} from "./../../Pages"
import * as firebase from "./../../Services/Firebase"
import {withRouter} from "react-router-dom"
import "./PageContainer.css";
import Space from "./../../Assets/space.jpg";

import {Entity, Scene} from 'aframe-react';
import Loading from "../../Components/Loading/Loading";
import Dashboard from "../Dashboard/Dashboard";

class PageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoggedIn: false,
      isCompleteProfile: false,
      user: {},
      userData: {},
    }
  }

  componentDidMount = async () => {
    await this.checkIsLoggedIn();
  };

  checkIsLoggedIn = async () => {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          await firebase.db.ref('users').orderByChild('uid').equalTo(user.uid)
            .on('value', snapshot => {
              let userData = [];
              let isCompleteProfile;

              if (snapshot.exists()) {
                isCompleteProfile = true;
                snapshot.forEach((snap) => {
                  userData.push(snap.val())
                })
              }

              else {
                isCompleteProfile = false;
                userData = [{
                  uid: user.uid,
                  displayName: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                }]
              }

              this.setState({
                userData: userData[0],
                isCompleteProfile: isCompleteProfile,
                user: user,
                isLoading: false,
                isLoggedIn : true
              })
            })
        } catch (error) {
          this.setState({
            readError: error.message, loadingChats: false,
            user: {},
            userData: {},
            isLoading: false,
            isLoggedIn: false
          })
        }
      } else {
        this.setState({
          user: {},
          userData: {},
          isLoading: false,
          isLoggedIn: false
        })
      }
    })
  };

  setProfileCompleted = (status) => {
    this.setState({isCompleteProfile: status})
  };

  render() {
    const {isLoading, isLoggedIn, isCompleteProfile, userData} = this.state;
    console.log(this.state);
    console.log(this.props);
    return (
      <div>
        {isLoading && (<Loading/>)}

        <div className="ui-content">
          {!isLoading && !isLoggedIn && (<Login/>)}
          {!isLoading && isLoggedIn && !isCompleteProfile && (
            <div className="ui-background">
              <h1></h1>
              <SetupProfile userData={userData} setProfileCompleted={this.setProfileCompleted}/>
            </div>
          )}
          {!isLoading && isLoggedIn && isCompleteProfile && (<Dashboard/>)}
        </div>

        <div className="vr-layer">
          <Scene
            physics="debug: false"
            platform="all"
            light="defaultLightsEnabled: false"
            vr-mode-ui="enabled: true"
          >
            <a-assets>
              <img id="skyTexture" src={Space}/>
            </a-assets>

            <Entity primitive="a-light" type="ambient" color="#445451"/>
            <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>

            <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" width="2048" animation__rotate={{
              property: 'rotation',
              dur: 60000,
              easing: 'linear',
              loop: true,
              to: {x: 0, y: 360, z: 0}
            }}/>
            {/*<Entity particle-system={{preset: 'snow'}}/>*/}
            <Entity light={{type: 'point'}}/>
          </Scene>
        </div>


        {/*{!isLoading && isLoggedIn && !isCompleteProfile && (<SetupProfile/>)}*/}
      </div>
    )
  }
}

export default withRouter(PageContainer);
