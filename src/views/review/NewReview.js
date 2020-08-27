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

class NewReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_AXON_DOMAIN + "/api/reviewer/reviewJobMetadata", {
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
        this.setState({ data: result })
      },
      error => {
        console.log("Error: ", error);
      }
    );
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0 mt-3">
            <CardBody className="px-lg-5 py-lg-4">
              <div className="text-center mb-4">
                { data ? data.Name : 'A user' } has invited you to give biometric feedback on a video.
              </div>
              <div className="text-center mb-4 font-weight-bold">
                { data ? data.Description : '' }
              </div>
              <div className="text-center">
                <Link to={"/review/overview/" + this.props.match.params.studyId}>
                  <Button className="mr-3" color="primary" type="button">
                    First time
                  </Button>
                </Link>
                <Link to={"/review/setup/" + this.props.match.params.studyId}>
                  <Button className="ml-3" color="primary" type="button">
                    Done it before
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

export default NewReview;

