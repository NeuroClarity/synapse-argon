import React from "react";

import { Container, Row, Col } from "reactstrap";

import { ABDashboardVideo } from "./components/ABDashboardVideo.js";
import { DashboardChart } from "./components/DashboardChart.js";
import DemographicFilter from "./components/DemographicFilter.js";
import SurveyResults from "./components/SurveyResults.js";

export const ABStudy = ({ data }) => {
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
            disabled={data ? data.Disabled : false}
          />
        </Col>
        <Col className="mb-5 mb-xl-0" xl="6">
          <ABDashboardVideo
            isA={false}
            studyId={data ? data.SecondStudyID : ""}
            name={data ? data.Name : ""}
            video={data ? data.SecondInsights.VideoUrl : undefined}
            heatmap={data ? data.SecondInsights.HeatmapUrl : undefined}
            globalTime={globalTime}
            disabled={data ? data.SecondDisabled : false}
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
            emotionResults={data && data.SecondInsights.EmotionResults}
            engagementResults={
              data && data.SecondInsights.EngagementResults.Result
            }
            setGlobalTime={setGlobalTime}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="mb-5 mb-xl-0" xl="6">
          <DemographicFilter
            demographics={data ? data.Insights.Demographics : undefined}
          />
        </Col>
        <Col className="mb-5 mb-xl-0" xl="6">
          <DemographicFilter
            demographics={data ? data.SecondInsights.Demographics : undefined}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="mb-5 mb-xl-0" xl="6">
          <SurveyResults
            desired={
              data && data.Demographics
                ? data.Demographics.Groups[0].Reviewers
                : undefined
            }
            surveyQuestion={data ? data.SurveyQuestion : undefined}
            surveyResults={data ? data.Insights.SurveyResults : undefined}
          />
        </Col>
        <Col className="mb-5 mb-xl-0" xl="6">
          <SurveyResults
            desired={
              data && data.Demographics
                ? data.Demographics.Groups[0].Reviewers
                : undefined
            }
            surveyQuestion={data ? data.SurveyQuestion : undefined}
            surveyResults={data ? data.Insights.SurveyResults : undefined}
          />
        </Col>
      </Row>
    </Container>
  );
};
