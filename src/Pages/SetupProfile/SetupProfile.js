import React, {Component} from "react";
import XStreamParticipant from "./../../Assets/xstream-participant.png";
import XStreamOrganizer from "./../../Assets/xstream-organzier.png";
import "./SetupProfile.css";
import {Fade} from "react-reveal";
import {Button, Modal, Input} from "antd";
import 'antd/dist/antd.css';
import {withRouter} from "react-router-dom"
import * as firebase from "../../Services/Firebase";

class SetupProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        role: '',
        name: '',
        email: ''
      },
      isLoading: false
    }
  }

  handleOnClickRole = (roleType) => {
    if (roleType === 'Participant') {
      this.setState({
        profile: {
          role: roleType
        }
      })
    }

    if (roleType === 'Organizer') {
      this.setState({
        profile: {
          role: roleType
        }
      })
    }
  };

  handleOnCancelRole = () => {
    this.setState({
      profile: {
        role: ''
      }
    })
  };

  handleOnRegister = async () => {
    const {userData} = this.props;
    const {profile} = this.state;
    const registeredUser = {
      ...userData,
      ...profile
    };
    this.setState({isLoading: true});
    setTimeout(async () => {
      this.setState({isLoading: false});
      this.props.setProfileCompleted(true);
      await firebase.db.ref("users")
        .child(userData.uid)
        .set(registeredUser)
    }, 2000);
  };

  render() {
    const {profile, isLoading} = this.state;
    console.log(this.state);
    return (
      <Fade>
        <div className="container">

          <Modal
            className="modal"
            title={'Become ' + profile.role}
            width={500}
            visible={profile.role !== ''}
            onOk={this.handleOnRegister}
            onCancel={this.handleOnCancelRole}
            style={{top: "30%", left: "30%"}}
            footer={[
              <Button key="back" onClick={this.handleOnCancelRole}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" loading={isLoading} onClick={async () => {
                await this.handleOnRegister()
              }}>
                Register
              </Button>,
            ]}>

            <Input style={{marginBottom: "10px", marginLeft: "5px", marginTop: "10px",}}
                   placeholder={profile.role + " Institution Name"}/>
            <Input style={{marginBottom: "10px", marginLeft: "5px", marginTop: "10px"}}
                   placeholder={profile.role + " Position"}/>
            <Input style={{marginBottom: "10px", marginLeft: "5px", marginTop: "10px"}}
                   placeholder={profile.role + " Phone Number"}/>
          </Modal>

          <img className="item" width="14%" src={XStreamParticipant} onClick={() => {
            this.handleOnClickRole('Participant');
          }}/>
          <img className="item" width="14%" src={XStreamOrganizer} onClick={() => {
            this.handleOnClickRole('Organizer');
          }}/>

        </div>
      </Fade>
    )
  }
}

export default withRouter(SetupProfile);
