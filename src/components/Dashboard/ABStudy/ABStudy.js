import React from "react";

import { Spinner, Container, Row, Col } from "reactstrap";

import { ABDashboardVideo } from "./components/ABDashboardVideo.js";
import { DashboardChart } from "./components/DashboardChart.js";

export const ABStudy = ({ data, loading }) => {
  const [globalTime, setGlobalTime] = React.useState(0);
  return (
    <Container className="mt--8" fluid>
      <Row>
        <Col className="mb-5 mb-xl-0" xl="6">
          <ABDashboardVideo
            isA={true}
            studyId={data ? data.StudyID : ""}
            name={data ? data.Name : ""}
            video={data ? data.Insights.VideoUrl : undefined}
            heatmap={data ? data.Insights.HeatmapUrl : undefined}
            globalTime={globalTime}
          />
        </Col>
        <Col className="mb-5 mb-xl-0" xl="6">
          <ABDashboardVideo
            isA={false}
            studyId={data ? data.StudyID : ""}
            name={data ? data.Name : ""}
            video={data ? data.Insights.VideoUrl : undefined}
            heatmap={data ? data.Insights.HeatmapUrl : undefined}
            globalTime={globalTime}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="mb-5 mb-xl-0" xl="6">
          <DashboardChart
            emotionResults={data && data.Insights.EmotionResults}
            engagementResults={data && data.Insights.EngagementResults.Result}
            setGlobalTime={setGlobalTime}
          />
        </Col>
        <Col className="mb-5 mb-xl-0" xl="6">
          <DashboardChart
            emotionResults={data && data.Insights.EmotionResults}
            engagementResults={data && data.Insights.EngagementResults.Result}
            setGlobalTime={setGlobalTime}
          />
        </Col>
      </Row>
    </Container>
  );
};
