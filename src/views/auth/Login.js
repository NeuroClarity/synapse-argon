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
// reactstrap components
import { Row } from "reactstrap";
import LoginButton from "../../components/Buttons/LoginButton.js";

class Login extends React.Component {
  render() {
    return (
      <div className="mt--7">
        <Row className="justify-content-center">
          <LoginButton />
        </Row>
      </div>
    );
  }
}

export default Login;
