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
  Button,
  Card,
  CardBody,
  Col
} from "reactstrap";

import Setup from "../../components/Review/Setup";

class SetupReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };
  }

  render() {
    if ((this.state.step) > 5) {
      return <Redirect to={'/review/calibrate/' + this.props.match.params.studyId} />
    }

    return (
      <>
        <Col lg="10" md="12">
          <Card className="bg-secondary shadow border-0 mt-3">
            <CardBody className="px-lg-5 py-lg-4">
              <div className="text-center mb-4">
                <h2>Configure Your Hardware</h2>
              </div>
              <Setup step={this.state.step} />
              <div className="text-center mt-3">
                <Button className="mr-4" color="primary" onClick={() => {
                    this.setState({ step: this.state.step > 1 ? this.state.step - 1 : 1 })
                }}>
                  Back
                </Button>
                <Button className="ml-4" color="primary" onClick={() => {
                  this.setState({ step: this.state.step + 1 })
                }}>
                  Next
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default SetupReview;

