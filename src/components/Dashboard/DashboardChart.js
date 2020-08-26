import React, { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";

import { chartExample1 } from "variables/charts.js";
import { Line } from "react-chartjs-2";

import {
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  Row
} from "reactstrap";

const DashboardChart = ({ chartData }) => {
  return (
    <Card className="bg-gradient-default shadow">
      <CardHeader className="bg-transparent">
        <Row className="align-items-center">
          <div className="col-3">
            <h6 className="text-uppercase text-light ls-1 mb-1">
              Your summary
            </h6>
            <h3 className="text-white mb-0">Success Index</h3>
          </div>
          <div className="col-9">
            <Nav className="justify-content-end" pills>
              <NavItem>
                <NavLink
                  className={classnames("py-2 px-3", {
                    active: true
                  })}
                  href="#pablo"
                  onClick={e => this.toggleNavs(e, 1)}
                >
                  <span className="d-none d-md-block">Engagement</span>
                  <span className="d-md-none">E</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={"py-2 px-3"}
                  data-toggle="tab"
                  href="#pablo"
                  onClick={e => this.toggleNavs(e, 2)}
                >
                  <span className="d-none d-md-block">Memory</span>
                  <span className="d-md-none">R</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames("py-2 px-3", {
                    active: false
                  })}
                  data-toggle="tab"
                  href="#pablo"
                  onClick={e => this.toggleNavs(e, 2)}
                >
                  <span className="d-none d-md-block">Emotions</span>
                  <span className="d-md-none">Em</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames("py-2 px-3", {
                    active: false
                  })}
                  data-toggle="tab"
                  href="#pablo"
                  onClick={e => this.toggleNavs(e, 2)}
                >
                  <span className="d-none d-md-block">Attention</span>
                  <span className="d-md-none">Em</span>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Row>
      </CardHeader>
      <CardBody>
        {/* Chart */}
        <Line
          data={chartData.data1}
          options={chartData.options}
          getDatasetAtEvent={e => console.log(e)}
        />
      </CardBody>
    </Card>
  );
};

export default DashboardChart;
