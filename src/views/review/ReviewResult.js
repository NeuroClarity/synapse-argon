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

import SurveyForm from "../../components/Forms/SurveyForm.js"
import DemographicForm from "../../components/Forms/DemographicForm.js"

import { COLLECTION_INTERVAL } from "./WatchVideo.js";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Col
} from "reactstrap";

class ReviewResult extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      submitted: false,
      eyeData: this.props.location.state ? this.props.location.state.eyeData : null,
      facialData: this.props.location.state ? this.props.location.state.facialData : null,
      surveyStep: 0,
      age: 0,
      gender: null,
      race: null,
      surveyq1: null,
      surveyq2: null,
      surveyq3: null,
      surveyq4: null,
    }
    
    this.processData = this.processData.bind(this)
    this.sendData = this.sendData.bind(this)
    this.uploadEyeToS3 = this.uploadEyeToS3.bind(this)
    this.uploadFacialToS3 = this.uploadFacialToS3.bind(this)
    this.submitAnalyticsJob = this.submitAnalyticsJob.bind(this)

    // bind setter methods
    this.setAge = this.setAge.bind(this)
    this.setGender = this.setGender.bind(this)
    this.setRace = this.setRace.bind(this)
    this.setQ1 = this.setQ1.bind(this)
    this.setQ2 = this.setQ2.bind(this)
    this.setQ3 = this.setQ3.bind(this)
    this.setQ4 = this.setQ4.bind(this)
  }

  // upload all data collected from watching the video
  processData() {
    if (this.state.surveyStep === 0) {
      this.setState({
        surveyStep: this.state.surveyStep + 1
      })
      return 
    }

    if (this.state.eyeData == null || this.state.facialData == null) {
      return 
    }

    async function f() {
      let formattedEyeData= JSON.stringify({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        collectionInterval: COLLECTION_INTERVAL,
        coordinates: this.state.eyeData
      })

      await this.sendData(formattedEyeData, this.state.facialData).then((reviewId) => {
        this.submitAnalyticsJob(reviewId);
      });
    }
    f = f.bind(this)
    f();
    this.setState({ submitted: true })
  }

  async sendData(eyeData, facialData) {
    return await fetch(process.env.REACT_APP_AXON_DOMAIN + "/api/reviewer/finishReviewJob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        StudyID: this.props.match.params.studyId,
        SurveyResult: {
          Quality: this.state.surveyq1,
          WouldBuy: this.state.surveyq2,
          Memorable: this.state.surveyq3,
          OpenEnded: this.state.surveyq4,
        },
        Demographic: {
          Age: this.state.age,
          Gender: this.state.gender,
          Race: this.state.race,
        }
      })
    })
      .then(res => {
        return res.json();
      })
      .then(async function(result){
          // upload data to S3
          const eyeDataUrl = result.EyeDataUrl
          console.log(eyeDataUrl)
          await this.uploadEyeToS3(eyeDataUrl, eyeData)
          const facialDataUrl = result.FacialDataUrl
          console.log(facialDataUrl)
          await this.uploadFacialToS3(facialDataUrl, facialData)
          return result.ReviewId
        }.bind(this),
        error => {
          console.log("Error: ", error);
        }
      );
  }

  async uploadFacialToS3(url, data) {
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "video/webm"
      },
      body: data
    })
  }

  async uploadEyeToS3(url, data) {
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    })
  }

  async submitAnalyticsJob(reviewId) {
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
  setAge(age) {
    this.setState({ age: parseInt(age.target.value) })
  }
  setGender(gender) {
    this.setState({ gender: gender.target.value })
  }
  setRace(race) {
    this.setState({ race: race.target.value })
  }
  setQ1(resp) {
    this.setState({ surveyq1: resp })
  }
  setQ2(resp) {
    this.setState({ surveyq2: resp })
  }
  setQ3(resp) {
    this.setState({ surveyq3: resp })
  }
  setQ4(resp) {
    this.setState({ surveyq4: resp.target.value })
  }

  render() {
    if (this.state.eyeData == null || this.state.facialData == null) {
      return <Redirect to={"/review/new/" + this.props.match.params.studyId} />
    }

    if (!this.state.submitted) {
      return (
        <>
          <Col lg="7" md="9">
            <Card className="bg-secondary shadow border-0 mt-3">
              <CardHeader className="bg-transparent">
                <div className="text-center">
                  <h2>Quick Survey</h2>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-4">
                <Form>
                  {(this.state.surveyStep === 0 && 
                    <DemographicForm 
                      setAge={ this.setAge }
                      setGender={ this.setGender }
                      setRace={ this.setRace }
                    />) || 
                    <SurveyForm 
                      setQ1={ this.setQ1 }
                      setQ2={ this.setQ2 }
                      setQ3={ this.setQ3 }
                      setQ4={ this.setQ4 }
                    />}
                  <div className="text-center">
                    <Button className="mt-4" color="primary" type="button" onClick={ this.processData }>
                      {this.state.surveyStep < 1 ? "Next" : "Submit" }
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
}

export default ReviewResult;

