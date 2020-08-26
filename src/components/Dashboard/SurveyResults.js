import React, { useState } from "react";
import { Card, CardHeader, Table, Row } from "reactstrap";

const SurveyResults = ({ SurveyResults: surveyResults }) => {
  return (
    <Card style={{ height: "100%" }} className="shadow">
      <CardHeader className="bg-transparent">
        <Row className="align-items-center">
          <div className="col">
            <h6 className="text-uppercase text-muted ls-1 mb-1">
              Across 32,000 Reviewers
            </h6>
            <h2 className="mb-0">Survey Results</h2>
          </div>
        </Row>
      </CardHeader>
      <Table className="table-sm align-items-center table-flush" responsive>
        <tbody>
          <tr>
            <th scope="row">Quality</th>
            <td>4.2 / 5</td>
          </tr>
          <tr>
            <th scope="row">Enjoyment</th>
            <td>2.9 / 5</td>
          </tr>
          <tr>
            <th scope="row">Would Buy</th>
            <td>3.8 / 5</td>
          </tr>
          <tr>
            <th scope="row">Recommend</th>
            <td>4.7 / 5</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default SurveyResults;
