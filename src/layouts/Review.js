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

import ProgressBar from "../components/Review/ProgressBar.js";

import { useApi } from "../utils/request.js";

const Review = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [metadata, setMetadata] = useState();
  const [step, setStep] = useState(0);
  const [webgazerLoaded, setWebgazerLoaded] = useState(false);
  const [video, setVideo] = useState();
  const [surveyQuestion, setSurveyQuestion] = useState();
  const [userFacialData, setUserFacialData] = useState();
  const [userEyeData, setUserEyeData] = useState();
  const { studyid } = useParams();

  useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);

  useEffect(() => {
    fetch(
      process.env.REACT_APP_AXON_DOMAIN + "/api/reviewer/reviewJobMetadata",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          StudyID: studyid
        })
      }
    )
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          setMetadata(result);
          setLoading(false);
        },
        error => {
          setError(true);
          setLoading(false);
          console.log("Error: ", error);
        }
      );
  }, [studyid]);

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
          setVideo(blob);
          setSurveyQuestion(result.SurveyQuestion);
        },
        error => {
          console.log("Error: ", error);
        }
      );
  }, [studyid]);

  const getComponent = () => {
    switch (step) {
      case 0:
        return (
          <NewReview
            setStep={setStep}
            step={step}
            loading={loading}
            error={error}
            data={metadata}
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
        return <CalibrateReview setStep={setStep} step={step} />;
      case 3:
        return (
          <WatchVideo
            setStep={setStep}
            step={step}
            video={video}
            setUserEyeData={setUserEyeData}
            setUserFacialData={setUserFacialData}
          />
        );
      case 4:
        return (
          <ReviewResult
            setStep={setStep}
            step={step}
            surveyQuestion={surveyQuestion}
            eyeData={userEyeData}
            facialData={userFacialData}
          />
        );
      default:
        return;
    }
  };

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
          <Row className="justify-content-center">{getComponent()}</Row>
          <Row className="justify-content-center">
            <ProgressBar step={step} />
          </Row>
        </Container>
      </div>
      <AuthFooter />
    </>
  );
};

export default Review;
