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
import Register from "views/auth/Register.js";
import Login from "views/auth/Login.js";

import Dashboard from "views/creator/Dashboard.js";
import Profile from "views/creator/Profile.js";
import Success from "views/creator/Success.js";
import StudyManager from "views/creator/StudyManager.js";
import NewStudy from "views/creator/NewStudy.js";

var routes = [
  {
    path: "/study/:studyId",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/success",
    name: "Success",
    icon: "ni ni-single-02 text-yellow",
    component: Success,
    layout: "/admin"
  },
  {
    path: "/studies",
    name: "Study Viewer",
    icon: "ni ni-bullet-list-67 text-red",
    component: StudyManager,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/new",
    name: "New Study",
    icon: "ni ni-circle-08 text-pink",
    component: NewStudy,
    layout: "/admin"
  }
];
export default routes;
