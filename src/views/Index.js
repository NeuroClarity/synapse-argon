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
import { Line, Bar } from "react-chartjs-2";
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
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import DashboardHeader from "components/Headers/DashboardHeader.js";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      heatmap:
        "https://nc-client-video-content.s3-us-west-1.amazonaws.com/0ed387ea-89e5-444f-8b0a-3c81953e3bb0/demo.mp4"
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  toggleHeatmap = e => {
    if (
      this.state.heatmap ==
      "https://nc-client-video-content.s3-us-west-1.amazonaws.com/0ed387ea-89e5-444f-8b0a-3c81953e3bb0/demo.mp4"
    ) {
      console.log(this.state);
      this.setState({
        heatmap:
          "https://nc-review-results.s3-us-west-1.amazonaws.com/demo/extra-heatmap.mp4"
      });
    } else {
      console.log(this.state);
      this.setState({
        heatmap:
          "https://nc-client-video-content.s3-us-west-1.amazonaws.com/0ed387ea-89e5-444f-8b0a-3c81953e3bb0/demo.mp4"
      });
    }
  };
  render() {
    return (
      <>
        <DashboardHeader />
        {/* Page content */}
        <Container className="mt--5" fluid>
          {" "}
          <Row>
            <Col className="mb-5 mb-xl-0" xl="6">
              <Card className="shadow">
                <CardHeader className="mb--4 border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Extra Gum A</h3>
                    </div>
                    <Row>
                      <div
                        style={{ marginTop: "-5px" }}
                        className="avatar-group col"
                      >
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip742438047"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"ni ni-single-copy-04"} />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip742438047"
                        >
                          Click to copy your reviewer link
                        </UncontrolledTooltip>
                      </div>
                      <div style={{ marginRight: "12px" }} className="col">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={e => this.toggleHeatmap(e)}
                          size="sm"
                        >
                          Toggle Heatmap
                        </Button>
                      </div>
                    </Row>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div class="embed-responsive embed-responsive-16by9">
                    <video
                      key={this.state.heatmap}
                      class="embed-responsive-item"
                      width="100%"
                      controls
                    >
                      <source src={this.state.heatmap} />
                    </video>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="6">
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
                <Table
                  className="table-sm align-items-center table-flush"
                  responsive
                >
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
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="9">
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
                              active: this.state.activeNav === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">
                              Engagement
                            </span>
                            <span className="d-md-none">E</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 2
                            })}
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
                              active: this.state.activeNav === 2
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
                              active: this.state.activeNav === 2
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
                    data={chartExample1[this.state.chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={e => console.log(e)}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col xl="3">
              <Card className="shadow">
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
                <Table
                  className="table-sm align-items-center table-flush"
                  responsive
                >
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
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
