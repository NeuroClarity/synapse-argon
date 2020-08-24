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
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Icons from "views/examples/Icons.js";

import StudyManager from "views/examples/StudyManager.js";

import NewStudy from "views/examples/NewStudy.js";
import ConfigureStudy from "views/examples/ConfigureStudy.js";

var routes = [
  {
    path: "/study/:studyId",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
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
    layout: "/forms"
  },
  {
    path: "/configure",
    name: "Configure Study",
    icon: "ni ni-circle-08 text-pink",
    component: ConfigureStudy,
    layout: "/forms"
  }
];
export default routes;
