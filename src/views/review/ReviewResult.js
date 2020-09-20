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
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import SurveyForm from "../../components/Forms/SurveyForm.js"
import DemographicForm from "../../components/Forms/DemographicForm.js"

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Col
} from "reactstrap";

const ReviewResult = ({ setStep, step, surveyQuestion, eyeData, facialData }) => {
  const [ submitted, setSubmitted ] = useState(false)
  const [ surveyStep, setSurveyStep ] = useState(0)
  const [ age, setAge ] = useState()
  const [ gender, setGender ] = useState()
  const [ race, setRace ] = useState()
  const [ q1, setQ1 ] = useState()
  const [ q2, setQ2 ] = useState()
  const [ q3, setQ3 ] = useState()
  const [ q4, setQ4 ] = useState()

  const { studyid } = useParams();

  // upload all data collected from watching the video
  const processData = () => {
    if (surveyStep === 0) {
      setSurveyStep(surveyStep + 1)
      return 
    }

    if (eyeData == null || facialData == null) {
      return 
    }

    async function f() {
      let formattedEyeData= JSON.stringify({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        coordinates: eyeData
      })

      await sendData(formattedEyeData, facialData).then((reviewId) => {
        submitAnalyticsJob(reviewId);
      });
    }
    f();
    setSubmitted(true)
  }

  const sendData = async function(eyeData, facialData) {
    return await fetch(process.env.REACT_APP_AXON_DOMAIN + "/api/reviewer/finishReviewJob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        StudyID: studyid,
        SurveyResult: {
          Quality: q1,
          WouldBuy: q2,
          Memorable: q3,
          OpenEnded: q4,
        },
        Demographic: {
          Age: age,
          Gender: gender,
          Race: race,
        }
      })
    })
      .then(res => {
        return res.json();
      })
      .then(async function(result){
          // upload data to S3
          const eyeDataUrl = result.EyeDataUrl
          await uploadEyeToS3(eyeDataUrl, eyeData)
          const facialDataUrl = result.FacialDataUrl
          await uploadFacialToS3(facialDataUrl, facialData)
          return result.ReviewId
        },
        error => {
          console.log("Error: ", error);
        }
      );
  }

  const uploadFacialToS3 = async function(url, data) {
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "video/webm"
      },
      body: data
    })
  }

  const uploadEyeToS3 = async function(url, data) {
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    })
  }

  const submitAnalyticsJob = async function(reviewId) {
    await fetch(process.env.REACT_APP_AXON_DOMAIN + "/api/reviewer/submitAnalyticsJob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ReviewId: reviewId
      })
    })
      .then(res => {
        return res.json();
      })
  }

  // setter methods for form responses
  const setAgeForm = (age) => {
    setAge(parseInt(age.target.value))
  }
  const setGenderForm = (gender) => {
    setGender(gender.target.value)
  }
  const setRaceForm = (race) => {
    setRace(race.target.value)
  }
  const setQ1Form = (resp) => {
    setQ1(parseInt(resp.target.value))
  }
  const setQ2Form = (resp) => {
    setQ2(parseInt(resp.target.value))
  }
  const setQ3Form = (resp) => {
    setQ3(parseInt(resp.target.value))
  }
  const setQ4Form = (resp) => {
    setQ4(resp.target.value)
  }

    if (eyeData == null || facialData == null) {
      setStep(0)
      return
    }

    if (!submitted) {
      return (
        <>
          <Col lg="9" md="11">
            <Card className="bg-secondary shadow border-0 mt-3">
              <CardHeader className="bg-transparent">
                <div className="text-center">
                  <h2>Quick Survey</h2>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-4">
                <Form>
                  {(surveyStep === 0 && 
                    <DemographicForm 
                      setAge={ setAgeForm }
                      setGender={ setGenderForm }
                      setRace={ setRaceForm }
                    />) || 
                    <SurveyForm 
                      setQ1={ setQ1Form }
                      setQ2={ setQ2Form }
                      setQ3={ setQ3Form }
                      setQ4={ setQ4Form }
                      surveyQuestion={surveyQuestion}
                    />}
                  <div className="text-center">
                  {(surveyStep === 1 && 
                    <Button className="mt-4 mr-5" color="primary" type="button" onClick={ () => setSurveyStep(0) }>
                      Back
                    </Button>
                  )}
                    <Button className="mt-4" color="primary" type="button" onClick={ processData }>
                      { surveyStep < 1 ? "Next" : "Submit" }
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </>
      )
    } else {
      return (
        <>
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0 mt-3">
              <CardBody className="px-lg-5 py-lg-4">
                <div className="text-center mb-4">
                  <h2>Thank you for participating in this study!</h2>
                </div>
                <div className="text-center mb-4">
                  <p>Want to learn more about NeuroClarity?</p>
                </div>
                <div className="text-center">
                  <a href="https://neuroclarity.ai">
                    <Button color="primary" type="button">
                      Click here!
                    </Button>
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
        </>
      );
    }
}

export default ReviewResult;

