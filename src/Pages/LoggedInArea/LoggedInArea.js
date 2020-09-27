import React, {Component} from "react";
import {Route, withRouter, Switch} from "react-router-dom"

import {Button, Modal, Input} from "antd";
import Dashboard from "../Dashboard/Dashboard";

class LoggedInArea extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }

  componentWillMount() {

  }


  render() {
    return (
      <Switch>
        <Route exact path="/dashboard"
               render={props => (
                 <Dashboard/>
               )}/>
      </Switch>

    )
  }
}

export default LoggedInArea;
