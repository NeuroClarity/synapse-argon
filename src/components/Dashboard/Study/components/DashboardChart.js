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
import { chartOptions, parseOptions } from "../../../../utils/chart.js";
import { withRouter } from "react-router";

const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

const DashboardChart = ({
  emotionResults,
  engagementResults,
  setGlobalTime
}) => {
  useConstructor(() => {
    parseOptions(Chart, chartOptions());
  });
  const [emotionChartData, setEmotionChartData] = useState({});
  const [engagementChartData, setEngagementChartData] = useState({});
  const [filteredEmotionChart, setFilteredEmotionChart] = useState({});
  const [emotionButtons, setEmotionButtons] = useState();
  const [activeEmotion, setActiveEmotion] = useState("Angry");
  const [activeInsight, setActiveInsight] = useState("Emotion");
  const [activeChartData, setActiveChartData] = useState({});

  useEffect(() => {
    setActiveChartData(
      activeInsight === "Emotion" ? filteredEmotionChart : engagementChartData
    );
  }, [activeInsight, filteredEmotionChart, engagementChartData]);

  // Massage raw data into chart.js amenable format.
  useEffect(() => {
    if (emotionResults) {
      parseEmotionData(emotionResults);
      createEmotionButtons(emotionResults);
      // Display data on initial render.
    }
    // eslint-disable-next-line
  }, [emotionResults]);

  // Massage raw data into chart.js amenable format.
  useEffect(() => {
    if (engagementResults) {
      parseEngagementData(engagementResults);
    }
    // eslint-disable-next-line
  }, [engagementResults]);

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

  const parseEngagementData = engagementData => {
    const engagementChartData = {};

    // Create skeleton datasets.
    engagementChartData.datasets = [{ label: "Engagement", data: [] }];

    // Labels.
    const labels = [...Array(engagementData.length).keys()];
    labels.forEach(num => num.toString());
    emotionChartData.labels = labels;

    // Populate skeleton datasets.
    engagementData.forEach(value => {
      engagementChartData.datasets[0].data.push(value);
    });

    setEngagementChartData(engagementChartData);
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
  };

  const createEmotionButtons = emotionData => {
    const emotionButtons = [];
    for (const label in emotionData[0]) {
      emotionButtons.push(
        <NavLink
          className={classnames("py-2 px-3", {
            active: true
          })}
          key={label}
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

  const updateTimeFromChart = elementA => {
    if (elementA[0] && elementA[0]._index) {
      setGlobalTime(elementA[0]._index);
    }
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
          data={activeChartData}
          getElementAtEvent={e => updateTimeFromChart(e)}
        />
      </CardBody>
    </Card>
  );
};

export default withRouter(DashboardChart);
