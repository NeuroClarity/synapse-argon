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

// reactstrap components
import {
  Card,
  CardBody,
  Button,
  Col
} from "reactstrap";

class FaceCalibrate extends React.Component {
  constructor(props) {
    super(props)
    this.videoTag = React.createRef()
  }

  componentDidMount() {
      // getting access to webcam
     navigator.mediaDevices
          .getUserMedia({video: true})
          .then(stream => this.videoTag.current.srcObject = stream)
          .catch(console.log);
  }

  render() {
    return (
      <div className="row justify-content-center my-4">
        <video ref={this.videoTag} autoplay="true"/>
        <div
          style={{
            position: "absolute",
            height: "340px",
            width: "300px",
            top: "200px",
            left: "400px",
            bg: "rgba(255, 0, 0, 0.0)",
            border: "7px solid #33cc33"
          }}
        >
        </div>
      </div>
    );
  }
}

export default FaceCalibrate;

