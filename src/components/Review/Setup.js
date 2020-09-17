import React from "react";

import {
  Card,
  CardBody,
  Col
} from "reactstrap";

import FaceCalibrate from "../../components/Review/FaceCalibrate.js";

const Setup = ({ step }) => {
  const getContent = () => {
    let cnt
    switch (step) {
      case 1:
        cnt = <SetupContent 
                    img="/camera.png" 
                    text="Prepare your webcam"
                    subtext="We do NOT store any webcam image or sounds after analysis" 
                  />
        break
      case 2:
        cnt = <SetupContent 
                    img="/bulb.png" 
                    text="Keep your face in good lighting"
                    subtext="Please sit comfortably in a bright place" 
                  />
          break
      case 3:
        cnt = <SetupContent 
                    img="/face.png" 
                    text="Try to keep your head still"
                    subtext="Stay in front of the screen for the whole time" 
                  />
          break
      case 4:
        cnt = (
          <div>
            <div className="text-center mb-4">
              Is your face in the green square? 
            </div>
            <FaceCalibrate />
          </div>
        )
        break
      default:
        return
    }

    return cnt

  }

  return (
    <div>
      { getContent() }
    </div>
  );
};

export default Setup;

const SetupContent = ({ img, text, subtext }) => {
  return (
    <Col lg="12" md="12">
      <Card className="bg-secondary shadow border-0 mt-3">
        <CardBody className="px-lg-5 py-lg-4">
          <div className="text-center">
            <img src={ img } width="20%" />
          </div>
          <div className="text-center mt-4">
            <h3>{ text }</h3>
          </div>
          <div className="text-center">
            <p>{ subtext }</p>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};
