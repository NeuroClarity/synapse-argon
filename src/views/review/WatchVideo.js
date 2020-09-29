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
import React, { useState, useRef, useEffect } from "react";
// reactstrap components
import { Col } from "reactstrap";

export const COLLECTION_INTERVAL = 0.2 * 1000;

const WatchVideo = ({
  setStep,
  step,
  video,
  setUserFacialData,
  setUserEyeData
}) => {
  const [calibrated, setCalibrated] = useState(true);
  const [eyeData, setEyeData] = useState([]);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const videoRef = useRef();
  const webcamRef = useRef();
  const mediaRecorderRef = useRef();

  const onVideoStart = () => {
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.srcObject, {
      mimeType: "video/webm",
      bitsPerSecond: 5000000
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    // push data every second
    mediaRecorderRef.current.start(1000);
  };

  const onVideoEnd = () => {
    window.webgazer.end();

    mediaRecorderRef.current.stop();
    let blob = new Blob(recordedChunks, {
      type: "video/webm"
    });

    webcamRef.current.srcObject.getTracks().forEach(function(track) {
      track.stop();
    });

    setUserFacialData(blob);
    setUserEyeData(eyeData);
    setStep(step + 1);
  };

  const handleData = () => {
    if (window.webgazer == null || !window.webgazer.isReady()) {
      setCalibrated(false);
      return;
    }

    var prediction = window.webgazer.getCurrentPrediction();
    if (prediction == null) {
      addNullResult();
      return;
    }

    prediction.then(result => {
      if (result == null) {
        addNullResult();
        return;
      }

      if (videoRef == null || videoRef.current == null) {
        return;
      }
      eyeData.push({
        X: result.x,
        Y: result.y,
        Time: videoRef.current.currentTime
      });
    });
  };

  const addNullResult = () => {
    eyeData.push({ X: null, Y: null, Time: videoRef.current.currentTime });
  };

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks(prev => prev.concat(data));
    }
  };

  useEffect(() => {
    // access webcam
    navigator.mediaDevices
      .getUserMedia({ video: { frameRate: { ideal: 30, max: 30 } } })
      .then(stream => {
        webcamRef.current.srcObject = stream;
      })
      .catch(console.log);

    let interval = setInterval(handleData, COLLECTION_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  // eslint-disable-next-line 
  }, []);

  if (!calibrated) {
    setStep(0);
    return;
  }

  return (
    <>
      <Col lg="12" md="12">
        <video
          ref={webcamRef}
          audio="false"
          style={{ display: "none" }}
          onLoadedData={onVideoStart}
        />
        <video
          id="full-screenVideo"
          ref={videoRef}
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
          onEnded={onVideoEnd}
        >
          <source src={URL.createObjectURL(video)} />
        </video>
      </Col>
    </>
  );
};

export default WatchVideo;
