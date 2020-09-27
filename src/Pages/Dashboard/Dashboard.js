import React, {Component} from "react";
import {Avatar, Button} from "antd";
import {Fade} from "react-reveal";
import * as firebase from "firebase";
import {Container, Jumbotron, Card, Col, Row} from "react-bootstrap";

import 'antd/dist/antd.css';
import eventImage from "./../../Assets/vrimage.svg";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRoom: [
        {
          id: 1,
          name: 'Room 1',
          description: 'Description 1',
        },
        {
          id: 2,
          name: 'Room 2',
          description: 'Description 2'
        }
      ]
    }
  }

  renderRoomCard = (room) => {
    return (
      <Col xs lg="4">
        <Card style={{}} className="shadow-lg p-3 mb-5 bg-white rounded">
          <Card.Body className="d-flex flex-column">
            <Card.Title>{room.name}</Card.Title>
            <Card.Text>
              {room.description}
            </Card.Text>
            <Card.Img variant="top" src={eventImage}/>
            <Button
              onClick={() => {
                // this.joinRoom(room);
              }}
              variant="primary"
              className="mt-auto">
              Join Room
            </Button>
          </Card.Body>
        </Card>
      </Col>
    )
  };

  render() {
    const {listRoom} = this.state;
    return (
      <div className="container-dashboard">
          <div className="ui-background-dashboard-header">
            <h1></h1>
          </div>
            <Avatar src={firebase.auth().currentUser.photoURL}
                    style={{ width: "125px", height: "125px"}}
                    round={true}/>
            <h1 style={{color: "white", zIndex: 20}}
                className="dashboard--name">Welcome, {firebase.auth().currentUser.displayName}</h1>
            <span role="img" aria-label="tada">
                </span>
            <br></br>
            <Button variant="primary" size="sm" onClick={() => firebase.auth().signOut()}>Sign Out</Button>

          {/*<Container>*/}
          {/*<Fade up>*/}
          {/*<Row className="justify-content-md-center">*/}

          {/*{listRoom.map((room, i) => {*/}
          {/*return (*/}
          {/*this.renderRoomCard(room)*/}
          {/*);*/}
          {/*})}*/}

          {/*</Row>*/}
          {/*</Fade>*/}
          {/*</Container>*/}
      </div>
    )
  }
}

export default Dashboard;
