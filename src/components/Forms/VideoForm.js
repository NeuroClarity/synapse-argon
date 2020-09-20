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
  updateSurveyQuestionForm,
  requestNewStudy,
  videoOnly,
  staticOnly
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
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div class="embed-responsive embed-responsive-16by9">
              {(contentType === "Static" && (
                <img
                  class="embed-responsive-item"
                  width="100%"
                  src={URL.createObjectURL(blob)}
                />
              )) || (
                <video class="embed-responsive-item" width="100%" controls>
                  <source src={URL.createObjectURL(blob)} />
                </video>
              )}
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
                <Input type="select" onChange={e => updateContentType(e)}>
                  <option disabled selected value>
                    {" "}
                    Study Type
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
              <FormGroup>
                <div className="mb-1">
                  <small>(Optional) Add a custom survey question: </small>
                </div>
                <InputGroup className="input-group-alternative mb-3">
                  <Input 
                    type="textarea" 
                    onChange={e => updateSurveyQuestionForm(e)}
                  />
                </InputGroup>
              </FormGroup>
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
      )}
    </>
  );
};

export default VideoForm;
