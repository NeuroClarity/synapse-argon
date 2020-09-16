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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

import AuthFooter from "../components/Footers/AuthFooter.js";

import NewReview from "../views/review/NewReview.js";
import SetupReview from "../views/review/SetupReview.js";
import CalibrateReview from "../views/review/ConfigureReview.js";
import WatchVideo from "../views/review/WatchVideo.js";
import ReviewResult from "../views/review/ReviewResult.js";

import { useApi } from "../utils/request.js";

const Review = () => {
  const [ step, setStep ] = useState(0)
  const [ webgazerLoaded, setWebgazerLoaded ] = useState(false)
  const [ video, setVideo ] = useState()
  const [ surveyQuestion, setSurveyQuestion ] = useState()
  const [ userFacialData, setUserFacialData ] = useState()
  const [ userEyeData, setUserEyeData ] = useState()
  const { studyid } = useParams();

  const opts = {
    method: "POST"
  };

  const body = {
    StudyID: studyid
  };

  const metadata = useApi(
    "/api/reviewer/reviewJobMetadata",
    opts,
    body
  );

  useEffect(() => {
    document.body.classList.add("bg-default");
    return () => { document.body.classList.remove("bg-default") }
  }, [])

  useEffect(() => {
    fetch(process.env.REACT_APP_AXON_DOMAIN + "/api/reviewer/reviewJob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        StudyId: studyid
      })
    })
    .then(res => {
      return res.json();
    })
    .then(
      async function(result) {
        let blob = await fetch(result.Content).then(r => r.blob());
        setVideo(blob)
        setSurveyQuestion(result.SurveyQuestion)
      },
      error => {
        console.log("Error: ", error);
      }
    );
  }, [])

  const getComponent = () => {
    switch (step) {
      case 0:
        return (
          <NewReview 
            setStep={setStep} 
            step={step} 
            refresh={metadata.refresh}
            loading={metadata.loading}
            error={metadata.error}
            data={metadata.data} 
          />
        );
      case 1:
        return (
          <SetupReview 
            setStep={setStep}
            step={step}
            webgazerLoaded={webgazerLoaded}
          />
        );
      case 2:
        return (
          <CalibrateReview 
            setStep={setStep}
            step={step}
          />
        );
      case 3:
        return (
          <WatchVideo 
            setStep={setStep} 
            step={step} 
            video={video}
            setUserEyeData={setUserEyeData}
            setUserFacialData={setUserFacialData}
          />
        )
      case 4:
        return (
          <ReviewResult 
            setStep={setStep} 
            step={step} 
            surveyQuestion={surveyQuestion}
            eyeData={userEyeData}
            facialData={userFacialData}
          />
        )
      default:
        return
    }
  }

  return (
    <>
      <div className="main-content">
        <div
          className="header bg-gradient-foo py-5 py-lg-6"
          style={{
            backgroundColor: "#38b6ff",
            backgroundImage: `url('/bg.png')`
          }}
        >
          <Container style={{ marginTop: "0vh" }}>
            <div className="header-body text-center mb-6">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <img
                    alt="..."
                    src={"/white_black_logo-removebg-preview.png"}
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            { getComponent() }
          </Row>
        </Container>
      </div>
      <AuthFooter />
    </>
  );
}

export default Review;
