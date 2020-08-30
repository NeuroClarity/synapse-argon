import React, { useState, useEffect } from "react";
import { Progress, Button, Card, CardHeader, Table, Row } from "reactstrap";
const DemographicFilter = ({ demographics }) => {
  const [rowArray, setRowArray] = useState();
  useEffect(() => {
    if (demographics !== undefined) {
      const newRowA = [];
      const allReviewers = demographics.Groups[0].Reviewers;
      demographics.Groups.forEach((item, i) => {
        const percent = Math.trunc((item.Reviewers / allReviewers) * 100);
        console.log("percent: ", percent);
        newRowA.push(
          <tr>
            <th scope="row">{item.Label}</th>
            <td>{item.Reviewers}</td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">{percent}%</span>
                <div>
                  <Progress
                    max="100"
                    value={percent.toString()}
                    barClassName="bg-gradient-success"
                  />
                </div>
              </div>
            </td>
          </tr>
        );
      });
      setRowArray(newRowA);
    }
  }, [demographics]);
  return (
    <Card style={{ height: "100%" }} className="shadow">
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <div className="col">
            <h3 className="mb-0">Demographic Filter</h3>
          </div>
          <div className="col text-right">
            <Button
              color="primary"
              href="#pablo"
              onClick={e => e.preventDefault()}
              size="sm"
            >
              Change Type
            </Button>
          </div>
        </Row>
      </CardHeader>
      <Table className="table-sm align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Group</th>
            <th scope="col">Reviewers</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>{rowArray}</tbody>
      </Table>
    </Card>
  );
};

export default DemographicFilter;
