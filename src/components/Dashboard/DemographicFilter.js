import React, { useState } from "react";
import { Progress, Button, Card, CardHeader, Table, Row } from "reactstrap";
const DemographicFilter = ({ demographics }) => {
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
        <tbody>
          <tr>
            <th scope="row">18-20</th>
            <td>1,480</td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">60%</span>
                <div>
                  <Progress
                    max="100"
                    value="60"
                    barClassName="bg-gradient-success"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">21-25</th>
            <td>5,480</td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">20%</span>
                <div>
                  <Progress
                    max="100"
                    value="20"
                    barClassName="bg-gradient-info"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">26-30</th>
            <td>4,807</td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">10%</span>
                <div>
                  <Progress
                    max="100"
                    value="10"
                    barClassName="bg-gradient-warning"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">31-40</th>
            <td>3,678</td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">7%</span>
                <div>
                  <Progress
                    max="100"
                    value="7"
                    barClassName="bg-gradient-warning"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">50+</th>
            <td>2,645</td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">3%</span>
                <div>
                  <Progress
                    max="100"
                    value="3"
                    barClassName="bg-gradient-warning"
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default DemographicFilter;
