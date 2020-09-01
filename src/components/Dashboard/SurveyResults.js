import React, { useState, useEffect } from "react";
import { Carousel, Card, CardHeader, Table, Row } from "reactstrap";

//import SurveyCarousel from "./SurveyCarousel.js";

const SurveyResults = ({ desired, surveyResults }) => {
  const [rowArray, setRowArray] = useState([]);
  const [openEnded, setOpenEnded] = useState();

  useEffect(() => {
    if (surveyResults !== undefined) {
      const newRowA = [];
      for (var key in surveyResults) {
        if (key !== "OpenEnded") {
          const val = surveyResults[key];
          let num = val % 1 == 0 ? val : val.toFixed(2);
          newRowA.push(
            <tr>
              <th scope="row">{key}</th>
              <td>{num} / 5</td>
            </tr>
          );
        } else if (surveyResults["OpenEnded"]) {
          const openEndedA = [];
          let i = 1;
          surveyResults["OpenEnded"].forEach(response => {
            openEndedA.push(
              <tr>
                <th scope="row">{i}</th>
                <td>{response}</td>
              </tr>
            );
            i += 1;
          });
          setOpenEnded(openEndedA);
        }
      }
      setRowArray(newRowA);
    }
  }, [surveyResults]);

  useEffect(() => {
    console.log("surveyResults: ", surveyResults);
  }, [surveyResults]);

  useEffect(() => {
    console.log("rowArray: ", rowArray);
  }, [rowArray]);

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
