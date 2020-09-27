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
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";
import { useApi } from "../../utils/request.js";

const AdminNavbar = () => {
  const { user, logout, getAccessTokenSilently } = useAuth0();
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

  const { data: profileData } = useApi(
    "/api/creator/profile",
    opts,
    body,
    accessToken
  );

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            Neuroclarity
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {profileData
                        ? profileData.FirstName + " " + profileData.LastName
                        : ""}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem
                  href="#pablo"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
