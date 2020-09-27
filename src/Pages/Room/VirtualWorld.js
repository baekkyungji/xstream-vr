import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import VRSky from "../../Assets/vrsky.jpg";
import Floor from "../../Assets/floor.jpg";
import Video from "../../Assets/video-1.mp4";

class VirtualWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying : true
    };
  }

  getVideo = (id) => {
    //Soon it should streaming from Youtube Live
    return './../../Assets/Video/video-'+id+'.mp4'
  };

  componentDidMount() {

  }

  render() {
    console.log(this.state);
    const stopVideo = () => {
      this.setState({ isPlaying : false});
    };

    window.onpopstate = function(event) {

      // "event" object seems to contain value only when the back button is clicked
      // and if the pop state event fires due to clicks on a button
      // or a link it comes up as "undefined"
      window.location = '/';
      stopVideo();
      console.log('hjh');
    };

    return (
      <Scene>
        <a-assets>
          <img id="groundTexture" src={Floor}/>
          <img id="skyTexture" src={VRSky}/>
          <video id="video-src" src={Video}/>
        </a-assets>

        <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>
        <Entity primitive="a-light" type="ambient" color="#445451"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
        <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
        {/*<Entity particle-system={{preset: 'snow', particleCount: 2000}}/>*/}
        <Entity text={{value: 'Room' + ' - ' + this.props.match.params.id, align: 'center', width : 7}} position={{x: 0, y: 8, z: -8}}/>

        {/*<Entity id="box"*/}
                {/*geometry={{primitive: 'box'}}*/}
                {/*material={{color: this.state.color, opacity: 0.6}}*/}
                {/*animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}*/}
                {/*animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}*/}
                {/*position={{x: 0, y: 1, z: -3}}*/}
                {/*events={{click: this.changeColor.bind(this)}}>*/}
          {/*<Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}*/}
                  {/*geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}*/}
                  {/*material={{color: '#24CAFF'}}/>*/}
        {/*</Entity>*/}


        {/*{room.id == 1 && (*/}
          {/*<Entity*/}
            {/*primitive="a-video"*/}
            {/*src={video1}*/}
            {/*rotation="0 0 0"*/}
            {/*position={{x: 0, y: 4, z: -9}}*/}
            {/*height="10" width="15"/>*/}
        {/*)}*/}
        {this.state.isPlaying && (
          <Entity
            primitive="a-video"
            src={this.state.isPlaying ? Video : undefined}
            rotation="0 0 0"
            position={{x: 0, y: 4, z: -9}}
            height="10" width="15"/>
        )}


        {/*<a-video id="video-screen" src="#video-src" position="-8.5 3 10" width="16" height="9" rotation="0 -212 0" geometry="height:30;width:50"></a-video>*/}

        <Entity primitive="a-camera">
          <Entity primitive="a-cursor" animation__click={{
            property: 'scale',
            startEvents: 'click',
            from: '0.1 0.1 0.1',
            to: '1 1 1',
            dur: 150
          }}/>
        </Entity>
      </Scene>
    );
  }
}

export default VirtualWorld;
