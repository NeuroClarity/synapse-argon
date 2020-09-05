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

import { Spinner, Button } from "reactstrap";

class FaceCalibrate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }

    this.videoTag = React.createRef()

  }

  componentDidMount() {
    // getting access to webcam
   navigator.mediaDevices
      .getUserMedia({video: true})
      .then(stream => {
        this.videoTag.current.srcObject = stream
      })
      .catch(console.log);

    // load wegazer script
    const script = document.createElement('script');
    script.src = "/scripts/webgazer.js";
    script.async = true;
    script.addEventListener('load', function () {
      window.saveDataAcrossSessions = true
      window.webgazer.showVideo(false)
      window.webgazer.showFaceOverlay(false)
      window.webgazer.showFaceFeedbackBox(false)
      window.webgazer.showPredictionPoints(false)
      window.webgazer.begin();
      document.addEventListener('webgazerLoaded', function(e) {
        this.setState({ loaded: true })
      }.bind(this));
    }.bind(this))

    document.body.appendChild(script);
  }

  componentWillUnmount() {
    this.videoTag.current.srcObject.getTracks().forEach(function(track) {
      track.stop();
    });
  }

  render() {
      return (
        <div>
          <div className="text-center my-4" 
              style={{
                display: !this.state.loaded ? 'block' : 'none',
              }}
          >
            <Spinner 
              animation="border" 
              size="xl" 
              variant="primary" 
              style={{
              }}
            />
          </div>
          <div className="row justify-content-center my-4">
            <video 
              ref={this.videoTag} 
              autoPlay={true} 
              style={{
                display: this.state.loaded ? 'block' : 'none',
                width: "500"
              }}
            />
            <div
              style={{
                position: "absolute",
                display: this.state.loaded ? 'block' : 'none',
                height: "340px",
                width: "300px",
                top: "200px",
                left: "300px",
                bg: "rgba(255, 0, 0, 0.0)",
                border: "7px solid #33cc33",
               zIndex: "100"
              }}
            >
            </div>
          </div>
        </div>
      );
    }
  }

export default FaceCalibrate;

