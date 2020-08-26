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
  Col
} from "reactstrap";

class ReviewResult extends React.Component {
  render() {
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

