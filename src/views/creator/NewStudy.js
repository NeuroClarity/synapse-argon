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
  Row,
  Col
} from "reactstrap";

import Dropzone from "../../components/Forms/Dropzone.js";

const NewStudy = () => {
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blobUrl, setBlobUrl] = useState();
  const [studyName, setStudyName] = useState();
  const [description, setDescription] = useState();
  const [reviewerCount, setReviewerCount] = useState();

  const updateStudyName = e => {
    setStudyName(e.target.value);
  };
  const updateDescriptionForm = e => {
    setDescription(e.target.value);
  };
  const updateReviewerCountForm = e => {
    setReviewerCount(e.target.value);
  };

  const requestNewStudy = () => {
    // validate form
    // api request
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
              <Dropzone setUploaded={setUploaded} setBlobUrl={setBlobUrl} />
            </CardBody>
          </Card>
        </Col>
      ) : (
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div class="embed-responsive embed-responsive-16by9">
                <video class="embed-responsive-item" width="100%" controls>
                  <source src={blobUrl} />
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
