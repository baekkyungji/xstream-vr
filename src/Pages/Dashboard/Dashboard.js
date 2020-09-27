import React, {Component} from "react";
import {Fade} from "react-reveal";
import * as firebase from "./../../Services/Firebase";
import {Col, Container} from "react-bootstrap";
import {Avatar, Button, Card} from "antd";
import 'antd/dist/antd.css';
import eventImage from "./../../Assets/vrimage.svg";
import "./Dashboard.css";
import XStreamParticipant from "../../Assets/xstream-participant.png";
import {speakStart} from "./../../speak";

const { Meta } = Card;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRoom: [
        {
          id: 1,
          name: 'Webinar AR/VR',
          description: '10 December 2020 8PM',
        },
        {
          id: 2,
          name: 'Workshop Web',
          description: '15 December 2020 10AM'
        },
        {
          id: 3,
          name: 'Webinar AI',
          description: '15 December 2020 4PM'
        },
        {
          id: 4,
          name: 'Webinar Android',
          description: '17 December 2020 2PM'
        },
        {
          id: 5,
          name: 'Webinar Flutter',
          description: '18 December 2020 4PM'
        }
      ]
    }
  }

  joinRoom = (room) => {
    window.location = '/room/' + room.id;
  };

  handleOnRegister = async (room) => {
    const {userData} = this.props;
    this.setState({isLoading: true});
    const userRegisteredEvents = userData.registeredEvents !== undefined ? userData.registeredEvents : [];
    userRegisteredEvents.push(room.id);
    setTimeout( async () => {
      this.setState({isLoading: false});
      await firebase.db.ref('events').child(room.id).child('participants').set(userData);
      await firebase.db.ref('users').child(userData.uid).child('registeredEvents').set(userRegisteredEvents);
      speakStart("Congratulations! you are registered")
    }, 2000);
  };

  renderRoomCard = (room) => {
    const {userData} = this.props;
    const userRegisteredEvents = userData.registeredEvents !== undefined ? userData.registeredEvents : [];
    return (
        <Card
          style={{ width: 250, marginLeft: "20px", marginRight: "20px"}}
          cover={
            <img
              alt="example"
              src={eventImage}
            />
          }
          actions={[
            <Button
              loading={this.state.isLoading}
              onClick={ async () => {
                await this.handleOnRegister(room)
              }}
              disabled={userRegisteredEvents.includes(room.id)}
              variant="primary"
              className="mt-auto">{userRegisteredEvents.includes(room.id) ? 'Registered' : 'Register'}</Button>,
            <Button
              loading={this.state.isLoading}
              onClick={ async () => {
                await this.joinRoom(room)
              }}
              disabled={!userRegisteredEvents.includes(room.id)}
              variant="primary"
              className="mt-auto">Join Event</Button>,
          ]}
        >
          <Meta
            avatar={<Avatar src={XStreamParticipant} />}
            title={room.name}
            description={room.description}
          />
        </Card>
    )
  };

  render() {
    const {listRoom} = this.state;
    return (
      <div className="container-dashboard">
        {/*<div className="ui-background-dashboard-header">*/}
          {/*<h1></h1>*/}
        {/*</div>*/}
        <Avatar src={firebase.auth().currentUser.photoURL}
                style={{width: "125px", height: "125px"}}
                round={true}/>
        <h1 style={{color: "white", zIndex: 20}}
            className="dashboard--name">Welcome, {firebase.auth().currentUser.displayName}</h1>
        <span role="img" aria-label="tada">
                </span>
        <br></br>
        <Button variant="primary" size="sm" onClick={() => firebase.auth().signOut()}>Sign Out</Button>

        <div className="event-list">
          <Fade up>
            {/*<Row className="justify-content-md-center">*/}

              {listRoom.map((room, i) => {
                return (
                  this.renderRoomCard(room)
                );
              })}

            {/*</Row>*/}
          </Fade>
        </div>
      </div>
    )
  }
}

export default Dashboard;
