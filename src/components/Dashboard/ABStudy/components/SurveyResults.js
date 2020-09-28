import React, { useState, useEffect } from "react";
import { Carousel, Card, CardHeader, Table, Row } from "reactstrap";

//import SurveyCarousel from "./SurveyCarousel.js";

const questionMap = {
  // Map from quality -> would recommend is temp until db schema is updated
  Quality: "Would Recommend",
  WouldBuy: "Purchase Intent",
  Memorable: "Memorable"
};

const SurveyResults = ({ desired, surveyQuestion, surveyResults }) => {
  const [rowArray, setRowArray] = useState([]);
  const [openEnded, setOpenEnded] = useState();

  useEffect(() => {
    if (surveyResults !== undefined) {
      const newRowA = [];
      let reactKey = 0;
      for (var key in surveyResults) {
        if (key !== "OpenEnded") {
          const val = surveyResults[key];
          let num = val % 1 == 0 ? val : val.toFixed(2);
          newRowA.push(
            <React.Fragment key={reactKey}>
              <tr>
                <th scope="row">{questionMap[key]}</th>
                <td>{num} / 5</td>
              </tr>
            </React.Fragment>
          );
        } else if (surveyResults["OpenEnded"]) {
          const openEndedA = [];
          let i = 1;
          surveyResults["OpenEnded"].forEach(response => {
            openEndedA.push(
              <React.Fragment key={reactKey}>
                <tr>
                  <th scope="row">{i}</th>
                  <td>{response}</td>
                </tr>
              </React.Fragment>
            );
            i += 1;
            reactKey += 1;
          });
          setOpenEnded(openEndedA);
        }
        reactKey += 1;
      }
      setRowArray(newRowA);
    }
  }, [surveyResults]);

  return (
    <Card style={{ height: "100%" }} className="shadow">
      <CardHeader className="bg-transparent">
        <Row className="align-items-center">
          <div className="col">
            <h6 className="text-uppercase text-muted ls-1 mb-1">
              Across {desired} Reviewers
            </h6>
            <h2 className="mb-0">Survey Results</h2>
          </div>
        </Row>
      </CardHeader>
      <Table className="table-sm align-items-center table-flush" responsive>
        <tbody>{rowArray}</tbody>
      </Table>
      <CardHeader className="bg-transparent">
        <Row className="align-items-center">
          <div className="col">
            <h2 className="mb-0">Open Responses</h2>
            <small className="mb-0 text-muted">{surveyQuestion}</small>
          </div>
        </Row>
      </CardHeader>
      <Table
        borderless
        className="table-sm align-items-center table-flush"
        responsive
      >
        <tbody>{openEnded}</tbody>
      </Table>
    </Card>
  );
};

export default SurveyResults;
