import React, { useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";

const EyeCalibrate = ({ step, setStep }) => {
  const [xCoord, setXCoord] = useState(Math.floor(Math.random() * 90).toString() + "%")
  const [yCoord, setYCoord] = useState((Math.floor(Math.random() * 20) + 10).toString() + "%")
  const [ numClicks, setNumClicks ] = useState(0)
  const [modal, setModal] = useState(false);

  const TARGET_CLICKS = 20

  const newCoordinates = () => {
    if (TARGET_CLICKS - (numClicks + 1) === 0) {
      setModal(true);
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
        <Modal isOpen={modal}>
          <ModalBody>
            Click continue to view the video or image
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {
                  setStep(step + 1); 
                  setModal(false);
                }
              }
            >
              Continue
            </Button>
          </ModalFooter>
        </Modal>
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

