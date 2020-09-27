import React from 'react'
import "./Loading.css";
import {Fade} from "react-reveal"
import Loader from "./../../Assets/loader.gif";

const Loading = () => {
  return (
    <Fade>
      <div id="loading" className="loading-container">
        <img src={Loader} style={{width: '220px'}}/>
      </div>
    </Fade>
  )
};

export default Loading
