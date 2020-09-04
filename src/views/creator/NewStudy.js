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
import React, { useState } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";

import Dropzone from "../../components/Forms/Dropzone.js";
import { useApi } from "../../utils/request.js";

const NewStudy = () => {
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blob, setBlob] = useState();
  const [studyName, setStudyName] = useState();
  const [description, setDescription] = useState();
  const [reviewerCount, setReviewerCount] = useState();
  const { user } = useAuth0();

  const opts = {
    method: "POST"
  };
  const body = {
    CreatorId: user.sub
  };
  const { refresh, data } = useApi("/api/creator/list", opts, body);

  const updateStudyName = e => {
    setStudyName(e.target.value);
  };
  const updateDescriptionForm = e => {
    setDescription(e.target.value);
  };
  const updateReviewerCountForm = e => {
    setReviewerCount(parseInt(e.target.value));
  };

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
          Filename: "video-content.mp4",
          DesiredReviewers: reviewerCount
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

    // Refresh w/in the study manager async.
    refresh();
    // Upload video content
    await fetch(study.UploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "video/mp4"
      },
      body: blob
    })
      .then(res => res.json())
      .then(
        result => {
          // setUploading(false);
          return result;
        },
        error => {
          // setUploading(false);
          console.log("Error: ", error);
        }
      );
  };

  return (
    <>
      {!uploaded ? (
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                Click to upload your video
              </div>
              <Dropzone setUploaded={setUploaded} setBlob={setBlob} />
            </CardBody>
          </Card>
        </Col>
      ) : (
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div class="embed-responsive embed-responsive-16by9">
                <video class="embed-responsive-item" width="100%" controls>
                  <source src={URL.createObjectURL(blob)} />
                </video>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Add some metadata about your new study.</small>
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
                      onChange={e => updateStudyName(e)}
                    />
                  </InputGroup>
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
                      onChange={e => updateDescriptionForm(e)}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Reviewer Count"
                      type="number"
                      step="1"
                      min={0}
                      max={20}
                      onChange={e => updateReviewerCountForm(e)}
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
                    >
                      Launch Study
                    </Button>
                  </Link>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      )}
    </>
  );
};

export default NewStudy;
