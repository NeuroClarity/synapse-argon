
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
import { Redirect } from "react-router-dom";

import FaceCalibrate from "../../components/Review/FaceCalibrate.js";
import EyeCalibrate from "../../components/Review/EyeCalibrate.js";

// reactstrap components
import {
  Card,
  CardBody,
  Button,
  Col
} from "reactstrap";

class CalibrateReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = { step: 1, isCalibrated: false }
  }

  render() {
    if (this.state.step == 1) {
      return (
        <>
          <Col lg="12" md="12" height="100vh">
            <Card className="bg-secondary shadow border-0 mt-3">
              <CardBody className="px-lg-5 py-lg-4">
                <div className="text-center mb-4 font-weight-bold">
                  <h2>Time to Calibrate!</h2>
                </div>
                <div className="text-center mb-4">
                  Is your face in the green square? 
                </div>
                <FaceCalibrate />
                <div className="text-center">
                  <Button color="primary" type="button" onClick={() => this.setState({ step: this.state.step + 1 })}>
                    Next
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </>
      );
    } else if (this.state.step == 2) {
      return (
        <>
          <Col md="12" style={{
            position: "absolute",
            top: "5%",
            left: "2.5%",
            width: "95%",
            zIndex: "100"
          }}>
            <Card className="bg-secondary shadow border-0 mt-3">
              <CardBody className="px-lg-5 py-lg-4">
                <div className="text-center mb-4 font-weight-bold">
                  <h2>Time to Calibrate!</h2>
                </div>
                <div className="text-center mb-4">
                  Click the button! Make sure you are facing the webcam.
                </div>
                <EyeCalibrate />
              </CardBody>
            </Card>
          </Col>
        </>
      );
    } else {
      return <Redirect to='/review/watch' />
    }
  }
}

export default CalibrateReview;

