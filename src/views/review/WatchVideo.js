/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link, Redirect } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Col
} from "reactstrap";

class WatchVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      completed: false
    };

    this.onVideoEnd = this.onVideoEnd.bind(this)
    this.videoRef = React.createRef();
  }

  onVideoEnd() {
    this.setState({ completed: true })
  }

  render() {
    if (this.state.completed) {
      return <Redirect to='/review/result' />
    }

    return (
      <>
        <Col lg="12" md="12">
          <video
            id="full-screenVideo"
            ref={this.videoRef}
            controls
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              zIndex: "100",
              backgroundSize: "cover",
              backgroundColor: "black"
            }}
            autoPlay={true}
            onLoadStart={() => {
              // TODO: Automatic full screen is hanging for some reason
              //var el = document.getElementById("full-screenVideo");
              //let result
              //if (el.requestFullscreen) {
                //result = el.requestFullscreen();
              //} else if (el.msRequestFullscreen) {
                //result = el.msRequestFullscreen();
              //} else if (el.mozRequestFullScreen) {
                //result = el.mozRequestFullScreen();
              //} else if (el.webkitRequestFullscreen) {
                //result = el.webkitRequestFullscreen();
              //}

              //result.then((res) => {
                //console.log(res)
              //}).catch((err) => {
                //console.log("Unable to enter full screen")
              //})

            }}
            onEnded={ this.onVideoEnd }
          >
              <source src={ "https://nc-client-video-content.s3-us-west-1.amazonaws.com/0ed387ea-89e5-444f-8b0a-3c81953e3bb0/demo.mp4" } type="video/mp4"/>
          </video>
        </Col>
      </>
    );
  }
}

export default WatchVideo;

