import React, {Component} from "react";
import 'aframe';
import 'aframe-particle-system-component';
import {Loading} from "./../../Components"
import {Login, SetupProfile, Dashboard} from "./../../Pages"
import * as firebase from "./../../Services/Firebase"
import {withRouter} from "react-router-dom"
import "./PageContainer.css";
import Space from "./../../Assets/space.jpg";

import {Entity, Scene} from 'aframe-react';

class PageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoggedIn: true,
      isCompleteProfile: false,
      user: {},
      userData: {},
    }
  }

  componentDidMount = async () => {
    // await this.checkIsLoggedIn();
    // setTimeout(() => {
    //   // this.setState({isLoading: false})
    // }, 100)
  };

  checkIsLoggedIn = async () => {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const isLoggedIn = true;
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
                isLoggedIn
              })
            })
        } catch (error) {
          this.setState({
            readError: error.message, loadingChats: false,
            user: user,
            isLoading: false,
          })
        }
      } else {
        this.setState({
          user: user,
          isLoading: false,
        })
      }
    })
  };

  render() {
    const {isLoading, isLoggedIn, isCompleteProfile} = this.state;
    console.log(this.state);
    console.log(this.props);
    return (
      <div>
        {/*{isLoading && (<Loading/>)}*/}

        <div className="ui-background">
          <h1> </h1>
        </div>
        <div className="ui-content">
          {!isLoading && !isLoggedIn && (<Login/>)}
          {!isLoading && isLoggedIn && (<SetupProfile/>)}
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
            }}></Entity>
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
