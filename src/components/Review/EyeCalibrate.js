import React from "react";
import { Redirect } from "react-router-dom";

import {
  Button
} from "reactstrap";

class EyeCalibrate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      xCoord: Math.floor(Math.random() * 90).toString() + "%",
      yCoord: (Math.floor(Math.random() * 20) + 10).toString() + "%",
      numClicks: 0
    }

    this.TARGET_CLICKS = 15
    this.newCoordinates = this.newCoordinates.bind(this)
  }

  newCoordinates() {
    this.setState({ 
      xCoord: Math.floor(Math.random() * 85).toString() + "%",
      yCoord: Math.floor(Math.random() * 80 + 10).toString() + "%",
      numClicks: this.state.numClicks + 1
    })
  }

  render() {
    if (this.TARGET_CLICKS - this.state.numClicks === 0) {
      return <Redirect to={"/review/watch/" + this.props.match.params.studyId} />
    }

    return (
      <div>
        <div className="text-center mt-0 float-right mr-3 mt-3" >
          <h2>{ this.TARGET_CLICKS - this.state.numClicks }</h2>
        </div>
        <div
          style={{
            minHeight: "75vh",
          }}
        >
            <Button 
              type="button"
              onClick={ this.newCoordinates } 
              style={{
                position: "absolute",
                display: "inline-block",
                top: this.state.xCoord,
                left: this.state.yCoord,
                height: "50px",
                width: "50px",
                borderRadius: "100%",
                background: "#800000",
                zIndex: "1000"
              }}
            >
            </Button>
        </div>
      </div>
    );
  }
};

export default EyeCalibrate;

