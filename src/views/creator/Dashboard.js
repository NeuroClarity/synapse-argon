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

// core components

import DashboardHeader from "components/Headers/DashboardHeader.js";

// Constituent components.
import DashboardVideo from "../../components/Dashboard/DashboardVideo.js";
import DemographicFilter from "../../components/Dashboard/DemographicFilter.js";
import DashboardChart from "../../components/Dashboard/DashboardChart.js";
import SurveyResults from "../../components/Dashboard/SurveyResults.js";

// Api fetch utility
import { useApi } from "../../utils/request.js";

var colors = {
  gray: {
    100: "#f6f9fc",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#8898aa",
    700: "#525f7f",
    800: "#32325d",
    900: "#212529"
  },
  theme: {
    default: "#172b4d",
    primary: "#5e72e4",
    secondary: "#f4f5f7",
    info: "#11cdef",
    success: "#2dce89",
    danger: "#f5365c",
    warning: "#fb6340"
  },
  black: "#12263F",
  white: "#FFFFFF",
  transparent: "transparent"
};

const chartExample1 = {
  options: {
    scales: {
      yAxes: [
        {
          gridLines: {
            color: colors.gray[900],
            zeroLineColor: colors.gray[900]
          },
          ticks: {
            callback: function(value) {
              if (!(value % 10)) {
                return value;
              }
            }
          }
        }
      ]
    },
    tooltips: {
      callbacks: {
        label: function(item, data) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";

          if (data.datasets.length > 1) {
            content += label;
          }

          content += "$" + yLabel + "k";
          return content;
        }
      }
    }
  },
  data1: canvas => {
    return {
      labels: [
        "00:00",
        "00:05",
        "00:10",
        "00:15",
        "00:20",
        "00:25",
        "00:30",
        "00:35",
        "00:40",
        "00:45",
        "00:50",
        "00:55",
        "00:60"
      ],
      datasets: [
        {
          label: "Performance",
          data: [
            0,
            10,
            10,
            50,
            15,
            40,
            20,
            60,
            60,
            0,
            10,
            10,
            50,
            15,
            40,
            20,
            60,
            60
          ]
        }
      ]
    };
  },
  data2: canvas => {
    return {
      labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Performance",
          data: [0, 20, 5, 25, 10, 30, 15, 40, 40]
        }
      ]
    };
  }
};

const Dashboard = () => {
  const opts = {};
  const { loading, error, refresh, data } = useApi("/api/creator/study", opts);

  const fakeData = {
    heatmap:
      "https://nc-client-video-content.s3-us-west-1.amazonaws.com/0ed387ea-89e5-444f-8b0a-3c81953e3bb0/demo.mp4",
    chartData: chartExample1,
    demographics: {},
    surveyResults: {}
  };
  return (
    <>
      <DashboardHeader />
      {/* Page content */}
      <Container className="mt--8" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <DashboardVideo heatmap={fakeData.heatmap} />
          </Col>
          <Col xl="4">
            <DemographicFilter demographics={fakeData.demographics} />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <DashboardChart chartData={fakeData.chartData} />
          </Col>
          <Col xl="4">
            <SurveyResults surveyResults={fakeData.surveyResults} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
