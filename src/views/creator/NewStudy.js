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
          <Col sm="6">
            <VideoUpload videoOnly={videoOnly} staticOnly={staticOnly} />
          </Col>
        ) : (
          <Row>
            <Col sm="4">
              <Card body>
                <CardTitle>AB Study</CardTitle>
                <CardText>
                  See clear differences between two similar pieces of content.
                </CardText>
                <Button color="primary" onClick={handleABSelection}>
                  Create
                </Button>
              </Card>
            </Col>
            <Col sm="4">
              <Card body>
                <CardTitle>Classic Study</CardTitle>
                <CardText>
                  Actionable insights on standard video content.
                </CardText>
                <Button color="primary" onClick={handleClassicSelection}>
                  Create
                </Button>
              </Card>
            </Col>
            <Col sm="4">
              <Card body>
                <CardTitle>Static Study</CardTitle>
                <CardText>
                  Analyze static picture, poster, or billboard material.
                </CardText>
                <Button color="primary" onClick={handleStaticSelection}>
                  Create
                </Button>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default NewStudy;
