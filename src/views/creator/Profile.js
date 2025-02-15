import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Spinner,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
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
  "pk_live_51HPz7AD4ZrLJJTQPESO0ncsXagpfWVXmt5BdPEIcmlAuXNGFUI9zUBDeFnbRUIzOUFmi7aY3lrUWDAxBy70O8ZB100CfVkWZZO"
);

const Profile = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [totalStudies, setTotalStudies] = useState();
  const [totalReviews, setTotalReviews] = useState();
  const [desiredReviews, setDesiredReviews] = useState();
  const [accessToken, setAccessToken] = useState();
  const [cancelModal, setCancelModal] = useState(false);
  const [tier, setTier] = useState();

  const cancelSubsciption = () => {
    fetch(process.env.REACT_APP_AXON_DOMAIN + "/api/creator/cancel", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        CreatorId: user.sub
      })
    })
      .then(res => {
        return res.json();
      })
      .then(
        () => {
          refresh();
        },
        () => {
          alert(
            "Failed to cancel subscription. Please email us at andere@berkeley.edu if this error persists."
          );
        }
      );
      setCancelModal(false);

  }

  const stripeClick = async tier => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch(
      process.env.REACT_APP_AXON_DOMAIN +
        "/api/creator/create-checkout-session",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          CreatorId: user.sub,
          Tier: tier
        })
      }
    );

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

  const { refresh, data: profileData } = useApi(
    "/api/creator/profile",
    opts,
    body,
    accessToken
  );

  useEffect(() => {
    console.log("profile: ", profileData);
    if (profileData) {
      setTier(profileData.Tier);
    }
  }, [profileData]);

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
      <div
        style={{
          backgroundColor: "#38b6ff",
          backgroundImage: `url('/bg.png')`
        }}
        className="header pb-9 pt-md-6"
      >
        <Modal isOpen={cancelModal}>
          <ModalBody>
            Are you sure you want to cancel your subscription?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={cancelSubsciption}>
              Confirm
            </Button>
            <Button
              color="secondary"
              onClick={() => setCancelModal(!cancelModal)}
            >
              Nope
            </Button>
          </ModalFooter>
        </Modal>
        <Row>
          {!profileData ? (
            <Col
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center"
              }}
              sm="12"
              md={{ size: 6, offset: 3 }}
            >
              <Spinner
                style={{ width: "10rem", height: "10rem" }}
                color="primary"
                type="grow"
              />
            </Col>
          ) : (
            <>
              <Col lg="6" xl="4">
                <Card className="card-stats ml-4 mt-4 mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Basic
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          $0 /month
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          <i className="ni ni-check-bold" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">
                        <i className="ni ni-circle-08" /> 3 reviewers per study
                      </span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Standard
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          $99 /month
                        </span>
                      </div>
                      <Col className="col-auto">
                        {tier !== "Standard" ? (
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <a
                              href={"#"}
                              onClick={() => {
                                stripeClick("Standard");
                              }}
                            >
                              <i className="ni ni-key-25" />
                            </a>
                          </div>
                        ) : (
                          <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                            <i className="ni ni-check-bold" />
                          </div>
                        )}
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">
                        <i className="ni ni-circle-08" /> 30 reviewers per study
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mr-4 mt-4 mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Enterprise
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          $499 /month
                        </span>
                      </div>
                      <Col className="col-auto">
                        {tier !== "Enterprise" ? (
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <a
                              href={"#"}
                              onClick={() => {
                                stripeClick("Enterprise");
                              }}
                            >
                              <i className="ni ni-key-25" />
                            </a>
                          </div>
                        ) : (
                          <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                            <i className="ni ni-check-bold" />
                          </div>
                        )}
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">
                        <i className="ni ni-circle-08" /> 300 reviewers per
                        study
                      </span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </>
          )}
        </Row>
      </div>
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
                <div className="d-flex justify-content-between"></div>
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
                  <p>You are currently using the {tier} plan.</p>
                  <a 
                    href="#pablo" 
                    onClick={
                      tier !== "Basic" 
                      ? () => setCancelModal(true) 
                      : () => stripeClick("Standard") 
                    }
                  >
                    {tier !== "Basic" ? "Cancel Subscription" : "Upgrade"}
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
