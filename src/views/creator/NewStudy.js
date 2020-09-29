import React, { useState } from "react";
// reactstrap components
import {
  Button,
  Container,
  Card,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";

import VideoUpload from "../../components/Forms/VideoUpload.js";
import ABUpload from "../../components/Forms/ABUpload.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import DashboardHeader from "../../components/Headers/DashboardHeader.js";

const NewStudy = () => {
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
      <AdminNavbar brandText={"Neuroclarity"} />
      <DashboardHeader />
      {/* Page content */}
      <Container className="mt--5" fluid>
        {studyType && studyType === "ab" ? (
          <Row>
            <ABUpload />
          </Row>
        ) : studyType ? (
          <Container className="mt--6" fluid>
            <Row className="justify-content-center">
              <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                <VideoUpload videoOnly={videoOnly} staticOnly={staticOnly} />
              </Col>
            </Row>
          </Container>
        ) : (
          <Container className="mt--6" fluid>
            <Row className="justify-content-center">
              <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                <Card body>
                  <CardTitle>Classic Study</CardTitle>
                  <CardText>Upload any single video</CardText>
                  <Button color="primary" onClick={handleClassicSelection}>
                    Create
                  </Button>
                </Card>
              </Col>
              <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                <Card body>
                  <CardTitle>A/B Study</CardTitle>
                  <CardText>You already know what this is</CardText>
                  <Button color="primary" onClick={handleABSelection}>
                    Create
                  </Button>
                </Card>
              </Col>
              <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                <Card body>
                  <CardTitle>Static Study</CardTitle>
                  <CardText>
                    Pictures and posters and billboards, oh my!
                  </CardText>
                  <Button color="primary" onClick={handleStaticSelection}>
                    Create
                  </Button>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </Container>
    </>
  );
};

export default NewStudy;
