import React, { useState } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Button, Card, CardTitle, CardText, Row, Col } from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";

import Dropzone from "../../components/Forms/Dropzone.js";
import VideoUpload from "../../components/Forms/VideoUpload.js";
import { useApi } from "../../utils/request.js";

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
      {studyType && studyType === "ab" ? (
        <Row>
          <VideoUpload />
          <VideoUpload />
        </Row>
      ) : studyType ? (
        <VideoUpload videoOnly={videoOnly} staticOnly={staticOnly} />
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
    </>
  );
};

export default NewStudy;
