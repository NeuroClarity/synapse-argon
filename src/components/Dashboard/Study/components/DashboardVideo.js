import React, { useState, useEffect, useLayoutEffect } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import { useClipboard } from "use-clipboard-copy";

const DashboardVideo = ({
  studyId,
  name,
  video,
  heatmap,
  globalTime,
  disabled
}) => {
  const [localTime, setLocalTime] = useState(0);
  const [videoPlayer, setVideoPlayer] = useState();
  const [heatmapToggle, setHeatmapToggle] = useState(false);
  const [counter, setCounter] = useState();
  const [link, setLink] = useState();
  const clipboard = useClipboard();

  useEffect(() => {
    const video = document.getElementById("video");
    if (video) {
      video.currentTime = globalTime;
    }
    // eslint-disable-next-line
  }, [globalTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLocalTime(videoPlayer.currentTime);
      setCounter(counter => counter + 1);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    let video = document.getElementById("video");
    setVideoPlayer(video);
    let cachedTime = localTime;
    video.preload = "metadata";

    video.onloadedmetadata = function() {
      window.URL.revokeObjectURL(video.src);
      video.currentTime = cachedTime;
    };
    //eslint-disable-next-line
  }, [heatmapToggle]);

  const copyLink = React.useCallback(
    event => {
      clipboard.copy(link);
    },
    [clipboard, link]
  );

  useEffect(() => {
    setLink(window.location.origin + "/review/" + studyId);
  }, [studyId]);

  return (
    <Card className="shadow">
      <CardHeader className="mb--4 border-0">
        <Row className="align-items-center">
          <div className="col">
            <h3 className="mb-0">{name}</h3>
          </div>
          <Row>
            <h3 style={{ marginRight: "18px" }} className="mb-0">
              {disabled
                ? "You are out of reviewers..."
                : "Share your video with reviewers..."}
            </h3>
            {disabled ? (
              <>
                <h6
                  style={{ marginTop: "5px" }}
                  className="text-uppercase text-muted ls-1 mb-1"
                >
                  Upgrade
                </h6>
                <div style={{ marginTop: "-5px" }} className="avatar-group col">
                  <a
                    className="avatar avatar-sm"
                    href={
                      window.location.pathname.split("/")[0] + "/admin/profile"
                    }
                    id="tooltip742438047"
                    onClick={e => copyLink(e)}
                  >
                    <i className={"ni ni-key-25"} />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip742438047">
                    Upgrade your subscription to process more reviewers
                  </UncontrolledTooltip>
                </div>
              </>
            ) : (
              <>
                <h6
                  style={{ marginTop: "5px" }}
                  className="text-uppercase text-muted ls-1 mb-1"
                >
                  Copy Link
                </h6>
                <div style={{ marginTop: "-5px" }} className="avatar-group col">
                  <a
                    className="avatar avatar-sm"
                    href="#"
                    id="tooltip742438047"
                    onClick={e => copyLink(e)}
                  >
                    <i className={"ni ni-single-copy-04"} />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip742438047">
                    Click to copy your reviewer link
                  </UncontrolledTooltip>
                </div>
              </>
            )}
            <div style={{ marginRight: "12px" }} className="col">
              <Button
                color="primary"
                href="#pablo"
                onClick={e => setHeatmapToggle(!heatmapToggle)}
                size="sm"
                disabled={!heatmap}
              >
                Toggle Heatmap
              </Button>
            </div>
          </Row>
        </Row>
      </CardHeader>
      <CardBody>
        <div className="embed-responsive embed-responsive-16by9">
          <video
            id="video"
            key={heatmapToggle ? heatmap : video}
            className="embed-responsive-item"
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
