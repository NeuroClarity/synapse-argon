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

import { useHistory } from "react-router";

// reactstrap components
import { Card, CardHeader, Spinner, Table, Container, Row } from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";

// core components
import DashboardHeader from "components/Headers/DashboardHeader.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";

import StudyListItem from "../../components/StudyManager/StudyListItem.js";

// api utility
import { useApi } from "../../utils/request.js";

// https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#4-create-a-useapi-hook-for-accessing-protected-apis-with-an-access-token
const StudyManager = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const history = useHistory();
  const [refreshIndex, setRefreshIndex] = React.useState(0);
  const [accessToken, setAccessToken] = React.useState();
  const opts = {
    method: "POST"
  };

  const body = {
    CreatorId: user.sub
  };

  React.useEffect(() => {
    async function asyncWrapper() {
      const token = await getAccessTokenSilently();
      setAccessToken(token);
    }
    asyncWrapper();
  }, [getAccessTokenSilently]);

  const { refresh, data } = useApi(
    "/api/creator/list",
    opts,
    body,
    accessToken
  );

  // Refresh call to list every 200ms
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIndex(refreshIndex => refreshIndex + 1);
      refresh();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  // Trivial refresh when history changes. Hacky, update later.
  useEffect(() => {
    refresh();
    //eslint-disable-next-line
  }, [history]);

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
                        studyId={item.StudyID}
                        key={item.StudyID}
                        studyName={item.Name}
                        desired={item.DesiredReviewers}
                        completed={item.CompletedReviews}
                        refresh={refresh}
                      />
                    ))}
                </tbody>
              </Table>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                {!data && (
                  <Spinner
                    style={{ width: "5rem", height: "5rem" }}
                    color="primary"
                    type="grow"
                  />
                )}
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default StudyManager;
