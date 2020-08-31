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
// reactstrap components
import {
  Col
} from "reactstrap";

export const COLLECTION_INTERVAL = 0.1 * 1000;

class WatchVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      calibrated: true,
      completed: false,
      eyeData: [],
      recordedChunks: [],
      facialData: null,
      videoUrl: null
    };

    this.onVideoEnd = this.onVideoEnd.bind(this)
    this.onVideoStart = this.onVideoStart.bind(this)
    this.handleData = this.handleData.bind(this)
    this.handleDataAvailable = this.handleDataAvailable.bind(this)
    this.addNullResult = this.addNullResult.bind(this)
    this.getVideoUrl = this.getVideoUrl.bind(this)

    this.videoRef = React.createRef();
    this.webcamRef = React.createRef();
    this.mediaRecorderRef = React.createRef();
  }

  onVideoStart() {
    this.mediaRecorderRef.current = new MediaRecorder(this.webcamRef.current.srcObject, {
      mimeType: "video/webm",
      bitsPerSecond: 5000000,
    });
    this.mediaRecorderRef.current.addEventListener(
      "dataavailable",
      this.handleDataAvailable
    );
    // push data every second
    this.mediaRecorderRef.current.start(1000);
    console.log("Started Recording")
  }

  onVideoEnd() {
    window.webgazer.end();

    this.mediaRecorderRef.current.stop();
    let blob = new Blob(this.state.recordedChunks, {
      type: "video/webm"
    });

    this.webcamRef.current.srcObject.getTracks().forEach(function(track) {
      track.stop();
    });

    this.setState({ 
      completed: true, 
      facialData: blob 
    })
  }

  handleData() {
    if (window.webgazer == null || !window.webgazer.isReady()) {
      console.log("not ready")
      this.setState({ calibrated: false })
      return
    }


    var prediction = window.webgazer.getCurrentPrediction();
    if (prediction == null) {
      this.addNullResult();
      return;
    }

    prediction.then((result) => {
      if (result == null) {
        this.addNullResult();
        return;
      }
      this.setState({
        eyeData: [...this.state.eyeData, {"X": result.x, "Y": result.y}]
      })
    })
  }

  addNullResult() {
    this.setState({
      eyeData: [...this.state.eyeData, {"X": null, "Y": null}]
    })
  }

  handleDataAvailable({ data }) {
    if (data.size > 0) {
      this.setState({
        recordedChunks: this.state.recordedChunks.concat(data)
      });
    }
  }

  getVideoUrl() {
    fetch(process.env.REACT_APP_AXON_DOMAIN + "/api/reviewer/reviewJob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        StudyId: this.props.match.params.studyId
      })
    })
    .then(res => {
      return res.json();
    })
    .then(
      result => {
        this.setState({ videoUrl: result.Content });
      },
      error => {
        console.log("Error: ", error);
      }
    );
  }

  componentWillMount() {
    // access webcam
    navigator.mediaDevices
        .getUserMedia({video: true})
        .then(stream => {
          this.webcamRef.current.srcObject = stream
        })
        .catch(console.log);
  }

  componentDidMount() {
    this.getVideoUrl()

    this.interval = setInterval(this.handleData, COLLECTION_INTERVAL)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    if (this.state.completed) {
      return <Redirect to={{
        pathname: '/review/result/' + this.props.match.params.studyId,
          state: {
            eyeData: this.state.eyeData,
            facialData: this.state.facialData
          }
      }} />
    } else if (!this.state.calibrated) {
      console.log("webgazer not calibrated")
      return <Redirect to={'/review/calibrate/' + this.props.match.params.studyId} />
    }

    return (
      <>
        <Col lg="12" md="12">
          <video ref={ this.webcamRef } audio="false" style={{ display: 'none' }} onLoadedData={ this.onVideoStart } />
          <video
            id="full-screenVideo"
            ref={ this.videoRef }
            key={ this.state.videoUrl }
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
            onEnded={ this.onVideoEnd }
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
          >
              <source src={ this.state.videoUrl } type="video/mp4"/>
          </video>
        </Col>
      </>
    );
  }
}

export default WatchVideo;

