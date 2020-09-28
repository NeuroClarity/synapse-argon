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
"pk_test_51HVnxVGiBsqPJo7o92hW7puu4vzNzS6U1nhavXQdgniCpr8dvywsWgUGbl2Awx4tQrkC4pHhZOlEdyq3QBQbixis00svnlsyLg"
);

const Profile = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [totalStudies, setTotalStudies] = useState();
  const [totalReviews, setTotalReviews] = useState();
  const [desiredReviews, setDesiredReviews] = useState();
  const [accessToken, setAccessToken] = useState();

  const stripeClick = async event => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch(process.env.REACT_APP_AXON_DOMAIN + "/api/creator/create-checkout-session", {
      method: "POST",
			headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"CreatorId": user.sub,
			})
    });

    const session = await response.json();
		console.log("SESSION: ", session);

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.SessionID
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  React.useEffect(() => {
    async function asyncWrapper() {
      const token = await getAccessTokenSilently();
      console.log("token: ", token);
      setAccessToken(token);
    }
    asyncWrapper();
  }, [getAccessTokenSilently]);

  const opts = {
    method: "POST"
  };

  const body = {
    CreatorId: user.sub
  };

  const { data: profileData } = useApi(
    "/api/creator/profile",
    opts,
    body,
    accessToken
  );

  const { data: listData } = useApi(
    "/api/creator/list",
    opts,
    body,
    accessToken
  );

  useEffect(() => {
    if (listData && listData.Studies) {
      setTotalStudies(listData.Studies.length);
      let totalReviews = 0;
      let desiredReviews = 0;
      listData.Studies.forEach(study => {
        totalReviews += study.CompletedReviews;
        desiredReviews += study.DesiredReviewers;
      });
      setTotalReviews(totalReviews);
      setDesiredReviews(desiredReviews);
    } else {
      setTotalStudies(0);
      setTotalReviews(0);
      setDesiredReviews(0);
    }
  }, [listData]);

  return (
    <>
      <DashboardHeader />
      {/* Page content */}
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={"/default_profile.jpeg"}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="sm"
                  >
                    Edit Picture
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">{totalStudies}</span>
                        <span className="description">Studies</span>
                      </div>
                      <div>
                        <span className="heading">{totalReviews}</span>
                        <span className="description">Completed Reviews</span>
                      </div>
                      <div>
                        <span className="heading">{desiredReviews}</span>
                        <span className="description">
                          Total Requested Reviewers
                        </span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {profileData
                      ? profileData.FirstName + " " + profileData.LastName
                      : ""}
                  </h3>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {profileData ? profileData.Email : ""}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {profileData ? profileData.Company : ""}
                  </div>
                  <hr className="my-4" />
                  <p>You are currently using the basic plan.</p>
                  <a href="#pablo" onClick={stripeClick}>
                    Upgrade Plan
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
