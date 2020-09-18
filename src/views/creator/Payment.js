import React, { useState } from "react";
// reactstrap components
import { Button, Card, CardTitle, CardText, Row, Col } from "reactstrap";
import { StripeProvider, Elements } from 'react-stripe-elements';
import Form from '../../utils/paymentForm.js';

const Payment = () => {
  const [studyType, setStudyType] = useState();
  const [videoOnly, setVideoOnly] = useState(false);
  const [staticOnly, setStaticOnly] = useState(false);

  const handleABSelection = () => {
    setStudyType("ab");
  };

  const handleClassicSelection = () => {
    setVideoOnly(true);
    setStudyType("classic");
  };

  const handleStaticSelection = () => {
    setStaticOnly(true);
    setStudyType("static");
  };

  return (
    <>
      {(
        <Row>
          <Col sm="4" >
            <Card body >
              <CardTitle>Basic</CardTitle>
              <CardText>
								Max Reviwers: 3 <p></p>	
								Price: FREE
              </CardText>
              <Button color="primary" onClick={handleABSelection}>
								ALREADY ACTIVE 
              </Button>
            </Card>
          </Col>
          <Col sm="4">
            <Card body>
              <CardTitle>Standard</CardTitle>
              <CardText>
								Max Reviwers: 30 <p></p>
								Price: $99 /month
              </CardText>
							<StripeProvider apiKey="pk_test_51HNBDfDtGhM83VHcnDw4LXycTQSVtrbrKV1kspg9bgcBrnybeVrKLwaA2zHh5kM1r5zwpIxgISblRdgUt4LQJeO300ukMax6eT">
								<Elements>
									<Form amount="99"/>								
								</Elements>
							</StripeProvider>
            </Card>
          </Col>
          <Col sm="4">
            <Card body>
              <CardTitle>Enterprise</CardTitle>
              <CardText>
								Max Reviewers: 300 <p></p>
								Price: $499 / month
              </CardText>
							<StripeProvider apiKey="pk_test_51HNBDfDtGhM83VHcnDw4LXycTQSVtrbrKV1kspg9bgcBrnybeVrKLwaA2zHh5kM1r5zwpIxgISblRdgUt4LQJeO300ukMax6eT">
								<Elements>
									<Form amount="499"/>								
								</Elements>
							</StripeProvider>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Payment;
