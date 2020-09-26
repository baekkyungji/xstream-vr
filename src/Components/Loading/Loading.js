import React from 'react'
import "./Loading.css";
import {Fade} from "react-reveal"

const Loading = () => {
  return (
    <Fade>
      <div id="loading" className="loading-container">
        <img src="Assets/loader.gif" style={{width: '220px'}}/>
      </div>
    </Fade>
  )
};

export default Loading
