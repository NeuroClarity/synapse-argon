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
  InputGroup
} from "reactstrap";

import Dropzone from "./Dropzone.js";

const VideoForm = ({
  contentType,
  blob,
  setBlob,
  updateStudyName,
  updateDescriptionForm,
  updateReviewerCountForm,
  updateContentType,
  requestNewStudy,
  videoOnly,
  staticOnly,
  validated
}) => {
  const [uploaded, setUploaded] = useState();
  return (
    <>
      {!uploaded ? (
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              Click to upload your content <br />
              <div className="small text-center text-muted mt-1">
                Supported Types: (.mp4, .jpg)
              </div>
            </div>
            <Dropzone setUploaded={setUploaded} setBlob={setBlob} />
          </CardBody>
        </Card>
      ) : (
        <Card className="card-profile shadow">
          <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
            <div class="embed-responsive embed-responsive-16by9">
              {staticOnly ? (
                <div class="embed-responsive-item">
                  <img src={URL.createObjectURL(blob)} alt="" />
                </div>
              ) : (
                <video class="embed-responsive-item" width="100%" controls>
                  <source src={URL.createObjectURL(blob)} />
                </video>
              )}
            </div>
          </CardHeader>
          <CardBody className="pt-0 pt-md-4">
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
              {!videoOnly && !staticOnly ? (
                <FormGroup>
                  <Input type="select" onChange={e => updateContentType(e)}>
                    <option disabled selected value>
                      Study Type
                    </option>
                    <option>Video</option>
                    <option>Static</option>
                  </Input>
                </FormGroup>
              ) : (
                <></>
              )}
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
                    disabled={!validated}
                  >
                    Launch Study
                  </Button>
                </Link>
              </div>
            </Form>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default VideoForm;
