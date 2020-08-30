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
import React, { useEffect } from "react";

import { withRouter } from "react-router";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";

// core components
import DashboardHeader from "components/Headers/DashboardHeader.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";

import StudyListItem from "../../components/StudyManager/StudyListItem.js";

// api utility
import { useApi } from "../../utils/request.js";

// https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#4-create-a-useapi-hook-for-accessing-protected-apis-with-an-access-token
const StudyManager = () => {
  const { user } = useAuth0();
  const opts = {
    method: "POST"
  };

  const body = {
    CreatorId: user.sub
  };

  const { login, error, refresh, data } = useApi(
    "/api/creator/list",
    opts,
    body
  );

  return (
    <>
      <AdminNavbar brandText={"Neuroclarity"} />
      <DashboardHeader />
      {/* Page content */}
      <Container className="mt--5" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card style={{ height: "100%" }} className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Your Studies</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Desired Reviewers</th>
                    <th scope="col">Status</th>
                    <th scope="col">Copy Link</th>
                    <th scope="col">Completion</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.Studies &&
                    data.Studies.map(item => (
                      <StudyListItem
                        studyName={item.StudyID}
                        desired={item.DesiredReviewers}
                        completed={item.CompletedReviewers}
                      />
                    ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default StudyManager;
