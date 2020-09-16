import React, { useState } from "react";

import {
  Button
} from "reactstrap";

const EyeCalibrate = ({ step, setStep }) => {
  const [xCoord, setXCoord] = useState(Math.floor(Math.random() * 90).toString() + "%")
  const [yCoord, setYCoord] = useState((Math.floor(Math.random() * 20) + 10).toString() + "%")
  const [ numClicks, setNumClicks ] = useState(0)

  const TARGET_CLICKS = 20

  const newCoordinates = () => {
    if (TARGET_CLICKS - (numClicks + 1) === 0) {
      setStep(step + 1)
      return
    }

    setXCoord(Math.floor(Math.random() * 85).toString() + "%")
    setYCoord(Math.floor(Math.random() * 80 + 10).toString() + "%")
    setNumClicks(numClicks + 1)
  }


  return (
    <div>
      <div
        style={{
          minHeight: "75vh",
        }}
      >
          <Button 
            type="button"
            onClick={ newCoordinates } 
            className="text-center"
            style={{
              margin: "0",
              padding: "0",
              fontSize: "16px",
              color: "white",
              position: "absolute",
              display: "inline-block",
              top: xCoord,
              left: yCoord,
              height: "50px",
              width: "50px",
              borderRadius: "100%",
              background: "rgb(56, 182, 255)",
              zIndex: "1000",
            }}
          >
            { TARGET_CLICKS - numClicks }
          </Button>
      </div>
    </div>
  );
};

export default EyeCalibrate;

