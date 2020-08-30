import React, { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  UncontrolledTooltip
} from "reactstrap";

const DashboardVideo = ({ video, heatmap }) => {
  const [heatmapToggle, setHeatmapToggle] = useState(false);

  useEffect(() => {
    console.log("video: ", video);
  }, [video]);

  useEffect(() => {
    console.log("toggle: ", heatmapToggle);
  }, [heatmapToggle]);

  return (
    <Card className="shadow">
      <CardHeader className="mb--4 border-0">
        <Row className="align-items-center">
          <div className="col">
            <h3 className="mb-0">Extra Gum A</h3>
          </div>
          <Row>
            <h6
              style={{ marginTop: "5px" }}
              className="text-uppercase text-muted ls-1 mb-1"
            >
              Copy Link
            </h6>
            <div style={{ marginTop: "-5px" }} className="avatar-group col">
              <a
                className="avatar avatar-sm"
                href="#pablo"
                id="tooltip742438047"
                onClick={e => e.preventDefault()}
              >
                <i className={"ni ni-single-copy-04"} />
              </a>
              <UncontrolledTooltip delay={0} target="tooltip742438047">
                Click to copy your reviewer link
              </UncontrolledTooltip>
            </div>
            <div style={{ marginRight: "12px" }} className="col">
              <Button
                color="primary"
                href="#pablo"
                onClick={e => setHeatmapToggle(!heatmapToggle)}
                size="sm"
              >
                Toggle Heatmap
              </Button>
            </div>
          </Row>
        </Row>
      </CardHeader>
      <CardBody>
        <div class="embed-responsive embed-responsive-16by9">
          <video
            key={heatmapToggle ? heatmap : video}
            class="embed-responsive-item"
            width="100%"
            controls
          >
            <source src={heatmapToggle ? heatmap : video} />
          </video>
        </div>
      </CardBody>
    </Card>
  );
};

export default DashboardVideo;
