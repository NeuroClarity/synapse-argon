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
import Dashboard from "views/creator/Dashboard.js";
import Profile from "views/creator/Profile.js";
import NewStudy from "views/creator/NewStudy.js";
import StudyManager from "views/creator/StudyManager.js";
import Payment from "views/creator/Payment.js"

var routes = [
  {
    path: "/study/:studyId",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/studies",
    name: "Study Manager",
    icon: "ni ni-bullet-list-67 text-red",
    component: StudyManager,
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
    path: "/upgrade",
    name: "Upgrade",
    icon: "ni ni-fat-add",
    component: Payment,
    layout: "/admin"
  },
  {
    path: "/new",
    name: "New Study",
    icon: "ni ni-fat-add",
    component: NewStudy,
    layout: "/forms"
  }
];
export default routes;
