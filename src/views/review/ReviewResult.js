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

import ReactStars from "react-rating-stars-component";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Col
} from "reactstrap";

class ReviewResult extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      submitted: false,
      eyeData: this.props.location.state ? this.props.location.state.eyeData : null,
      facialData: this.props.location.state ? this.props.location.state.facialData : null,
      q1value: 0,
      q2value: 0,
      q3value: 0,
      q4value: '',
    }
    
    this.processData = this.processData.bind(this)
    this.sendData = this.sendData.bind(this)
    this.uploadEyeToS3 = this.uploadEyeToS3.bind(this)
    this.uploadFacialToS3 = this.uploadFacialToS3.bind(this)
    this.submitAnalyticsJob = this.submitAnalyticsJob.bind(this)
  }

  // upload all data collected from watching the video
  processData() {
    if (this.state.eyeData == null || this.state.facialData == null) {
      return 
    }

    async function f() {
      let formattedEyeData = this.state.eyeData.map(point => point["X"] + " " + point["Y"]).join("\n");
      let reviewId;
      await this.sendData(formattedEyeData, this.state.facialData).then((id) => {
        reviewId = id
      });
      this.submitAnalyticsJob(reviewId);
    }
    f = f.bind(this)
    f();
    this.setState({ submitted: true })
  }

  async sendData(eyeData, facialData) {
    console.log("here")
    return await fetch(process.env.REACT_APP_AXON_DOMAIN + "/api/reviewer/finishReviewJob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        StudyID: this.props.match.params.studyId,
        SurveyResult: {
          Quality: this.state.q1value,
          WouldBuy: this.state.q2value,
          Memorable: this.state.q3value,
          OpenEnded: this.state.q4value,
        }
      })
    })
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          // upload data to S3
          const eyeDataUrl = result.EyeDataUrl
          console.log(eyeDataUrl)
          this.uploadEyeToS3(eyeDataUrl, eyeData)
          const facialDataUrl = result.FacialDataUrl
          console.log(facialDataUrl)
          this.uploadFacialToS3(facialDataUrl, facialData)
          return result.ReviewId
        },
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
        "Content-Type": "text/csv"
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
                <Form role="form">
                  <FormGroup>
                    <div>
                      <p>Please rate the overall quality of the video</p>
                    </div>
                    <ReactStars
                      count={5}
                      size={30}
                      value={this.state.q1value}
                      onChange={(newValue) => {
                        this.setState({ q1value: newValue })
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <div>
                      <p>After watching this, how likely you are to try this product?</p>
                    </div>
                    <ReactStars
                      count={5}
                      size={30}
                      value={this.state.q2value}
                      onChange={(newValue) => {
                        this.setState({ q2value: newValue })
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <div>
                      <p>How memorable was this ad to you?</p>
                    </div>
                    <ReactStars
                      count={5}
                      size={30}
                      value={this.state.q3value}
                      onChange={(newValue) => {
                        this.setState({ q3value: newValue })
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <div>
                      <p>Anything else you’d like to add?</p>
                    </div>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input 
                        type="textarea" 
                        value={this.state.q4value} 
                        onChange={(event) => {
                          console.log(event)
                          this.setState({ q4value: event.target.value })
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="mt-4" color="primary" type="button" onClick={ this.processData }>
                      Submit
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

