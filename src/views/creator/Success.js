import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import DashboardHeader from "components/Headers/DashboardHeader.js";

// Api fetch utility
import { useApi } from "../../utils/request.js";
import { useAuth0 } from "@auth0/auth0-react";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51HUQ3PDS7JGrvRSDbGdWsvGUZujialoKNXpQX6U7sRJNoJU23qmYsamTg3V6btbBljI1McdpqBcznfR9puQfTLRX00OTl3Bnol"
);

const Success = () => {
  return (
    <>
      <DashboardHeader />
      {/* Page content */}
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <CardBody className="pt-0 pt-md-4">
                <div className="text-center">
                  <h1>Thanks for your order!</h1>
                  <p>
                    We appreciate your business! If you have any questions,
                    please email
                    <a href="mailto:kyle@neuroclarity.ai">
                      kyle@neuroclarity.ai
                    </a>
                    . It may take a few minutes for your subscription updates to
                    process.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Success;
