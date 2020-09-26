import React, {Component} from "react";
import XStreamParticipant from "./../../Assets/xstream-participant.png";
import XStreamOrganizer from "./../../Assets/xstream-organzier.png";
import "./SetupProfile.css";
import {Fade} from "react-reveal";
import {Button, Modal} from "antd";
import 'antd/dist/antd.css';

class SetupProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        role: '',
        name: '',
        email: ''
      },
    }
  }

  handleOnClickRole = (roleType) => {
    if (roleType === 'participant') {
      this.setState({
        profile: {
          role: roleType
        }
      })
    }

    if (roleType === 'organizer') {
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

  handleOnRegister = () => {

  };

  render() {
    const {profile} = this.state;
    console.log(this.state);
    return (
      <Fade>
        <div className="container">

          <Modal
            className="modal"
            title={'Become ' + profile.role}
            width={700}
            visible={profile.role !== ''}
            onOk={this.handleOnRegister}
            onCancel={this.handleOnCancelRole}
            style={{top: "30%"}}
            footer={[
              <Button key="back" onClick={this.handleOnCancelRole}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={async () => {
                await this.handleOnRegister()
              }}>
                Register
              </Button>,
            ]}>

          </Modal>

          <img className="item" width="14%" src={XStreamParticipant} onClick={() => {
            this.handleOnClickRole('participant');
          }}/>
          <img className="item" width="14%" src={XStreamOrganizer} onClick={() => {
            this.handleOnClickRole('organizer');
          }}/>

        </div>
      </Fade>
    )
  }
}

export default SetupProfile;
