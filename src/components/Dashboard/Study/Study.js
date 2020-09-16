import React from "react";

import { Spinner, Container, Row, Col } from "reactstrap";

import DashboardVideo from "./components/DashboardVideo.js";
import DemographicFilter from "./components/DemographicFilter.js";
import DashboardChart from "./components/DashboardChart.js";
import SurveyResults from "./components/SurveyResults.js";

export const Study = ({ data, loading }) => {
  const [globalTime, setGlobalTime] = React.useState(0);
  return (
    <Container className="mt--8" fluid>
      <Row>
        <>
          <Col className="mb-5 mb-xl-0" xl="8">
            {loading ? (
              <Spinner
                style={{ width: "3rem", height: "3rem" }}
                color="primary"
                type="grow"
              />
            ) : (
              <DashboardVideo
                studyId={data ? data.StudyID : ""}
                name={data ? data.Name : ""}
                video={data ? data.Insights.VideoUrl : undefined}
                heatmap={data ? data.Insights.HeatmapUrl : undefined}
                globalTime={globalTime}
              />
            )}
          </Col>
          <Col xl="4">
            <SurveyResults
              desired={
                data && data.Demographics
                  ? data.Demographics.Groups[0].Reviewers
                  : undefined
              }
              surveyResults={data ? data.Insights.SurveyResults : undefined}
            />
          </Col>
        </>
      </Row>
      <Row className="mt-5">
        <Col className="mb-5 mb-xl-0" xl="8">
          <DashboardChart
            emotionResults={data && data.Insights.EmotionResults}
            engagementResults={data && data.Insights.EngagementResults.Result}
            setGlobalTime={setGlobalTime}
          />
        </Col>
        <Col xl="4">
          <DemographicFilter
            demographics={data ? data.Insights.Demographics : undefined}
          />
        </Col>
      </Row>
    </Container>
  );
};
