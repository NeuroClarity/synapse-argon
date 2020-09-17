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

const ABVideoForm = ({ uploaded, setUploaded, contentType, blob, setBlob, setReviewerCount, isA }) => {
  return (
    <>
      {!uploaded ? (
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              Click to upload {isA ? "A" : "B"} <br />
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
          <CardBody style={{ marginTop: "-50px" }} className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>
                Choose your reviewer count for study {isA ? "A" : "B"}
              </small>
            </div>
            <Form role="form">
              <FormGroup></FormGroup>
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
                    onChange={e => setReviewerCount(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default ABVideoForm;
