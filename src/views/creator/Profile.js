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
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import DashboardHeader from "components/Headers/DashboardHeader.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";

// Api fetch utility
import { useApi } from "../../utils/request.js";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();
  const [totalStudies, setTotalStudies] = useState();
  const [totalReviews, setTotalReviews] = useState();
  const [desiredReviews, setDesiredReviews] = useState();

  const opts = {
    method: "POST"
  };

  const body = {
    CreatorId: user.sub
  };

  const { data: profileData } = useApi("/api/creator/profile", opts, body);

  const { data: listData } = useApi("/api/creator/list", opts, body);

  useEffect(() => {
    console.log("profileData: ", profileData);
  }, [profileData]);

  useEffect(() => {
    if (listData) {
      setTotalStudies(listData.Studies.length);
      let totalReviews = 0;
      let desiredReviews = 0;
      listData.Studies.forEach(study => {
        totalReviews += study.CompletedReviews;
        desiredReviews += study.DesiredReviewers;
      });
      setTotalReviews(totalReviews);
      setDesiredReviews(desiredReviews);
    }
    console.log("listData: ", listData);
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
                        src={"/vanderbilt.png"}
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
