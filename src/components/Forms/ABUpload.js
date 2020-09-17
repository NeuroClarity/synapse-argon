import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import { useApi } from "../../utils/request.js";
import ABVideoForm from "./ABVideoForm.js";

import {
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Button,
  Card,
  CardBody
} from "reactstrap";

const VideoUpload = ({ videoOnly, staticOnly }) => {
  const [studyName, setStudyName] = useState();
  const [description, setDescription] = useState();
  const [contentType, setContentType] = useState();

  const [uploadedA, setUploadedA] = useState();
  const [uploadedB, setUploadedB] = useState();
  const [bothUploaded, setBothUploaded] = useState(false);
  const [blobA, setBlobA] = useState();
  const [blobB, setBlobB] = useState();
  const [reviewerCountA, setReviewerCountA] = useState();
  const [reviewerCountB, setReviewerCountB] = useState();
  const { user } = useAuth0();

  React.useEffect(() => {
    if (
      uploadedA &&
      uploadedB &&
      studyName &&
      reviewerCountA &&
      reviewerCountB
    ) {
      setBothUploaded(true);
    }
  }, [reviewerCountA, reviewerCountB, studyName, uploadedA, uploadedB]);

  React.useEffect(() => {
    console.log("REVIEWER COUNT: ", reviewerCountA);
  }, [reviewerCountA]);

  const opts = {
    method: "POST"
  };
  const body = {
    CreatorId: user.sub
  };

  // This is just so we can asynchronously rerender our study manager after we
  // upload.
  const { refresh } = useApi("/api/creator/list", opts, body);

  const requestNewStudy = async () => {
    // validate form
    console.log("user: ", user);
    // Get our upload URL
    const study = await fetch(
      process.env.REACT_APP_AXON_DOMAIN + "/api/creator/study",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          CreatorId: user.sub,
          Name: studyName,
          Description: description,
          DesiredReviewers: parseInt(reviewerCountA),
          ContentType: contentType,
          IsAB: true,
          Filename: "video-content.mp4",
          secondFilename: "second-video-content.mp4"
        })
      }
    )
      .then(res => res.json())
      .then(
        study => {
          console.log("study: ", study);
          return study;
        },
        error => {
          console.log("Error: ", error);
        }
      );

    // Upload video content
    await fetch(study.UploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": contentType === "Static" ? "image/jpeg" : "video/mp4"
      },
      body: blobA
    })
      .then(res => res.json())
      .then(
        result => {
          // setUploading(false);
          return result;
        },
        error => {
          // setUploading(false);
          console.log("Error on upload A: ", error);
        }
      );

    if (study.SecondUploadUrl) {
      await fetch(study.SecondUploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": contentType === "Static" ? "image/jpeg" : "video/mp4"
        },
        body: blobB
      })
        .then(res => res.json())
        .then(
          result => {
            // setUploading(false);
            return result;
          },
          error => {
            // setUploading(false);
            console.log("Error on upload B: ", error);
          }
        );
    }

    if (contentType === "Static") {
      // Make request to neuron to upload content
      await fetch(process.env.REACT_APP_AXON_DOMAIN + "/api/creator/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          StudyID: study.StudyID
        })
      })
        .then(res => res.json())
        .then(
          resp => {
            console.log("Success: ", resp.Success);
            return study;
          },
          error => {
            console.log("Error: ", error);
          }
        );
    }

    if (contentType === "Static") {
      // Make request to neuron to upload content
      await fetch(process.env.REACT_APP_AXON_DOMAIN + "/api/creator/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          StudyID: study.SecondStudyID
        })
      })
        .then(res => res.json())
        .then(
          resp => {
            console.log("Success: ", resp.Success);
            return study;
          },
          error => {
            console.log("Error: ", error);
          }
        );
    }

    // Refresh w/in the study manager async.
    refresh();
  };

  return (
    <>
      <Col sm="4">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Configure your AB study.</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-collection" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Study Name"
                    type="text"
                    onChange={e => setStudyName(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Input
                  type="select"
                  onChange={e => setContentType(e.target.value)}
                >
                  <option disabled selected value>
                    Content Type
                  </option>
                  {videoOnly ? (
                    <option>Video</option>
                  ) : staticOnly ? (
                    <option>Static</option>
                  ) : (
                    <>
                      <option>Video</option>
                      <option>Static</option>
                    </>
                  )}
                </Input>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-ungroup" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Brief Description"
                    type="text"
                    onChange={e => setDescription(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Link to="/admin/studies">
                  <Button
                    onClick={requestNewStudy}
                    className="mt-4"
                    color="primary"
                    type="button"
                    disabled={!bothUploaded}
                  >
                    Launch Study
                  </Button>
                </Link>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
      <Col sm="4">
        <ABVideoForm
          uploaded={uploadedA}
          setUploaded={setUploadedA}
          blob={blobA}
          setBlob={setBlobA}
          setReviewerCount={setReviewerCountA}
          isA={true}
        />
      </Col>
      <Col sm="4">
        <ABVideoForm
          uploaded={uploadedB}
          setUploaded={setUploadedB}
          blob={blobB}
          setBlob={setBlobB}
          setReviewerCount={setReviewerCountB}
          isA={false}
        />
      </Col>
    </>
  );
};

export default VideoUpload;
