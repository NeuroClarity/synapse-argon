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
import React, { useState, useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { withRouter } from "react-router";

import { Spinner, Row, Col } from "reactstrap";

// core components
import DashboardHeader from "components/Headers/DashboardHeader.js";
import { Study } from "components/Dashboard/Study/Study.js";
import { ABStudy } from "components/Dashboard/ABStudy/ABStudy.js";

// Api fetch utility
import { useApi } from "../../utils/request.js";

const Dashboard = () => {
  const [studyID, setStudyID] = useState(
    window.location.pathname.split("/").pop()
  );
  const [accessToken, setAccessToken] = useState();
  const { user, getAccessTokenSilently } = useAuth0();
  const opts = {
    method: "POST"
  };

  useEffect(() => {
    setStudyID(window.location.pathname.split("/").pop());
  }, []);

  const body = {
    CreatorId: user.sub,
    StudyId: studyID
  };

  React.useEffect(() => {
    async function asyncWrapper() {
      const token = await getAccessTokenSilently();
      setAccessToken(token);
    }
    asyncWrapper();
  }, [getAccessTokenSilently]);

  const { loading, error, refresh, data } = useApi(
    "/api/creator/insights",
    opts,
    body,
    accessToken
  );

  return (
    <>
      <DashboardHeader />
      {loading || !data ? (
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Spinner
                style={{ width: "3rem", height: "3rem" }}
                color="primary"
                type="grow"
              />
            </div>
          </Col>
        </Row>
      ) : data && data.SecondStudyID ? (
        <ABStudy data={data} />
      ) : (
        <Study data={data} />
      )}
      {/* Page content */}
    </>
  );
};

export default withRouter(Dashboard);
