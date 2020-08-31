import React, { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";

import {
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  Row
} from "reactstrap";

// javascipt plugin for creating charts
import Chart from "chart.js";
import { Line } from "react-chartjs-2";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1
} from "../../utils/chart.js";

const DashboardChart = ({ emotionResults }) => {
  const [emotionChartData, setEmotionChartData] = useState({});
  const [filteredEmotionChart, setFilteredEmotionChart] = useState();
  const [emotionButtons, setEmotionButtons] = useState();
  const [activeEmotion, setActiveEmotion] = useState("Angry");
  const [activeInsight, setActiveInsight] = useState();

  useEffect(() => {
    console.log("activeEmotion: ", activeEmotion);
  }, [activeEmotion]);

  // Set global defaults on wrapped chart.js object.
  useEffect(() => {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  });

  // Massage raw data into chart.js amenable format.
  useEffect(() => {
    if (emotionResults) {
      parseEmotionData(emotionResults);
      createEmotionButtons(emotionResults);
      // Display data on initial render.
    }
    // eslint-disable-next-line
  }, [emotionResults]);

  useEffect(() => {
    if (emotionResults) {
      parseEmotionChart(activeEmotion, emotionChartData);
    }
    // eslint-disable-next-line
  }, [activeEmotion]);

  const parseEmotionData = emotionData => {
    const emotionChartData = {};

    // Create skeleton datasets.
    emotionChartData.datasets = [];
    for (const item in emotionData[0]) {
      emotionChartData.datasets.push({ label: item, data: [] });
    }

    // Labels.
    const labels = [...Array(emotionData.length).keys()];
    labels.forEach(num => num.toString());
    emotionChartData.labels = labels;

    // Populate skeleton datasets.
    emotionData.forEach(emotions => {
      emotionChartData.datasets.forEach(dataset => {
        const emotionVal = emotions[dataset.label];
        dataset.data.push(emotionVal);
      });
    });

    parseEmotionChart(activeEmotion, emotionChartData);
    setEmotionChartData(emotionChartData);
  };

  const parseEmotionChart = (activeEmotion, emotionChartData) => {
    const filteredEmotionChart = {
      labels: emotionChartData.labels,
      datasets: []
    };
    emotionChartData.datasets.forEach(dataset => {
      if (dataset.label === activeEmotion) {
        filteredEmotionChart.datasets.push({
          label: dataset.label,
          data: dataset.data
        });
        setFilteredEmotionChart(filteredEmotionChart);
      }
    });
    console.log("FILTERED: ", filteredEmotionChart);
  };

  const createEmotionButtons = emotionData => {
    const emotionButtons = [];
    for (const label in emotionData[0]) {
      emotionButtons.push(
        <NavLink
          className={classnames("py-2 px-3", {
            active: true
          })}
          style={{ backgroundColor: "#38b6ff" }}
          onClick={e => setActiveEmotion(label)}
        >
          <span className="d-none d-md-block">{label}</span>
          <span className="d-md-none">{label.slice(0, 1)}</span>
        </NavLink>
      );
    }
    setEmotionButtons(emotionButtons);
  };

  return (
    <Card className="bg-gradient-default shadow">
      <CardHeader className="bg-transparent">
        <Row className="align-items-center">
          <div className="col-3">
            <h6 className="text-uppercase text-light ls-1 mb-1">
              Your summary
            </h6>
            <h3 className="text-white mb-0">{activeEmotion}</h3>
          </div>
          <div className="col-9">
            <Nav className="justify-content-end" pills>
              {activeInsight === "Emotion" ? (
                emotionButtons
              ) : (
                <NavItem>
                  <NavLink
                    className={classnames("py-2 px-3", { active: true })}
                    onClick={e => setActiveInsight("Emotion")}
                  >
                    <span className="d-none d-md-block">Emotion</span>
                    <span className="d-md-none">Em</span>
                  </NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink
                  className={
                    activeInsight === "Emotion"
                      ? classnames("py-2 px-3", { active: true })
                      : "py-2 px-3"
                  }
                  data-toggle="tab"
                  onClick={e => setActiveInsight("Engagement")}
                >
                  <span className="d-none d-md-block">Engagement</span>
                  <span className="d-md-none">En</span>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Row>
      </CardHeader>
      <CardBody>
        {/* Chart */}
        <Line
          data={filteredEmotionChart}
          options={chartExample1.options}
          getDatasetAtEvent={e => console.log(e)}
        />
      </CardBody>
    </Card>
  );
};

export default DashboardChart;
