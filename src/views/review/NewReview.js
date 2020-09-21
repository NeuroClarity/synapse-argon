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
import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Spinner,
  Button,
  Card,
  CardBody,
  Col
} from "reactstrap";

const NewReview = ({ step, setStep, loading, error, data }) => {
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0 mt-3">
          <CardBody className="px-lg-5 py-lg-4">
            <div className="text-center">
              { loading ? (
                  <Spinner 
                    animation="border" 
                    size="xl" 
                    variant="primary" 
                    className="mt-4 mb-4"
                  />
                ) : ( !error ? (
                  <div>
                    <div className="text-center mb-4">
                      { (data.CreatorName ? data.CreatorName : "A creator") + " has invited you to review a video." }
                    </div>
                    <div className="mb-4 font-weight-bold">
                      { data.StudyName ? data.StudyName : "" }
                    </div>
                    <div className="text-center">
                      <Button color="primary" type="button" 
                        onClick={ () => { setStep(step + 1) } }
                      >
                        Get Started
                      </Button>
                    </div>
                  </div>
                  ) : (
                    <div>
                      Thanks for visiting the neuroclarity.ai video reviewer page. It looks like the link you provided has a typo or is invalid.
                    </div>
                  )
                )
              }
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default NewReview;

