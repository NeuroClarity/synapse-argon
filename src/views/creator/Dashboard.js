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
import React, { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";
import { withRouter } from "react-router";

// core components

import DashboardHeader from "components/Headers/DashboardHeader.js";

// Constituent components.
import DashboardVideo from "../../components/Dashboard/DashboardVideo.js";
import DemographicFilter from "../../components/Dashboard/DemographicFilter.js";
import DashboardChart from "../../components/Dashboard/DashboardChart.js";
import SurveyResults from "../../components/Dashboard/SurveyResults.js";

// Api fetch utility
import { useApi } from "../../utils/request.js";

const Dashboard = () => {
  const [globalTime, setGlobalTime] = useState(0);
  const [studyID, setStudyID] = useState(
    window.location.pathname.split("/").pop()
  );
  const { user } = useAuth0();
  const opts = {
    method: "POST"
  };

  useEffect(() => {
    setStudyID(window.location.pathname.split("/").pop());
  }, []);

  const body = {
    CreatorId: user.sub,
    StudyId: studyID
  };

  const { loading, error, refresh, data } = useApi(
    "/api/creator/insights",
    opts,
    body
  );

  useEffect(() => {
    console.log("error: ", error);
    console.log("data: ", data);
  }, [data, error]);

  return (
    <>
      <DashboardHeader />
      {/* Page content */}
      <Container className="mt--8" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <DashboardVideo
              studyId={data ? data.StudyID : ""}
              name={data ? data.Name : ""}
              video={data ? data.Insights.VideoUrl : undefined}
              heatmap={data ? data.Insights.HeatmapUrl : undefined}
              globalTime={globalTime}
            />
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
    </>
  );
};

export default withRouter(Dashboard);
