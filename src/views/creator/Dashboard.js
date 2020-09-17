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
  const { user } = useAuth0();
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

  const { loading, error, refresh, data } = useApi(
    "/api/creator/insights",
    opts,
    body
  );

  useEffect(() => {
    console.log("error: ", error);
    console.log("data: ", data);
  }, [data, error]);

  return (
    <>
      <DashboardHeader />
      {data && data.SecondStudyID ? (
        <ABStudy data={data} loading={loading} />
      ) : (
        <Study data={data} loading={loading} />
      )}
      {/* Page content */}
    </>
  );
};

export default withRouter(Dashboard);
