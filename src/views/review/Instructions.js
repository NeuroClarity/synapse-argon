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
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Col,
} from "reactstrap";

class ReviewInstructions extends React.Component {
  render() {
    return (
      <>
        <Col lg="8" md="8">
          <Card className="bg-secondary shadow border-0 mt-3">
            <CardBody className="px-lg-5 py-lg-4">
              <div className="text-center mb-4 font-weight-bold">
                <h2>How this works</h2>
              </div>
              <div className="mb-4">
                Four quick and easy steps:
              </div>
              <ol>
                <div className="mb-2">
                  <li>You will be asked to perform some basic calibration through your webcam.</li>
                </div>
                <div className="mb-2">
                  <li>While you are watching, we will be collecting data to help the content creator improve their video</li>
                </div>
                <div className="mb-2">
                  <li>Once you are done, you will be asked some quick survey questions about the video.</li>
                </div>
                <div className="mb-4">
                  <li>We will analyze the results and provide the data to the creator of the video.</li>
                </div>
              <div className="text-center mb-4 text-muted">
                Note: Your privacy is very important to us. All of your data is secure and anonymous and no data will be stored or sold after analysis. 
              </div>
              </ol>
              <div className="text-center">
                <a target="_blank" href="https://neuroclarity.ai">
                  <Button className="mr-5" color="primary" type="button">
                    More Questions?
                  </Button>
                </a>
                <Link to={"/review/setup/" + this.props.match.params.studyId}>
                  <Button className="ml-5" color="primary" type="button">
                    Get Started
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default ReviewInstructions;

