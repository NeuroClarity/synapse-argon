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
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Forms from "layouts/Forms.js";
import ReviewLayout from "layouts/Review.js";

import PrivateRoute from "./components/Routes/PrivateRoute.js";

ReactDOM.render(
  <Auth0Provider
    domain="dev-q7h0r088.us.auth0.com"
    clientId="CmO86D0Y75i1tRd29d0yE5QbTu1dAxpq"
    redirectUri={window.location.origin + "/admin/studies"}
  >
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          component={AdminLayout}
          path="/admin"
          render={props => <AdminLayout {...props} />}
        />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <PrivateRoute
          component={Forms}
          path="/forms"
          render={props => <Forms {...props} />}
        />
      <PrivateRoute component={ReviewLayout} path="/review" render={props => <ReviewLayout {...props} />} />
        <Redirect from="/" to="/auth/login" />
      </Switch>
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById("root")
);
