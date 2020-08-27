import React, { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)

import { Link } from "react-router-dom";

import {
  Progress,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Badge,
  Media
} from "reactstrap";

const StudyListItem = ({ studyName, desired, completed }) => {
  const [percent, setPercent] = useState(100);

  useEffect(() => {
    console.log("percent: ", percent);
  });

  return (
    <tr>
      <th scope="row">
        <Media className="align-items-center">
          <Media>
            <Link to={"/admin/study/" + studyName}>
              <span className="mb-0 text-sm">{studyName}</span>
            </Link>
          </Media>
        </Media>
      </th>
      <td>{desired}</td>
      <td>
        <Badge color="" className="badge-dot mr-4">
          <i className="bg-warning" />
          delayed
        </Badge>
      </td>
      <td>
        <div className="avatar-group">
          <a
            className="avatar avatar-sm"
            href="#pablo"
            id="tooltip742438047"
            onClick={e => e.preventDefault()}
          >
            <i className={"ni ni-single-copy-04"} />
          </a>
          <UncontrolledTooltip delay={0} target="tooltip742438047">
            Click to copy
          </UncontrolledTooltip>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <span className="mr-2">60%</span>
          <div>
            <Progress max="100" value="60" barClassName="bg-danger" />
          </div>
        </div>
      </td>
      <td className="text-right">
        <UncontrolledDropdown>
          <DropdownToggle
            className="btn-icon-only text-light"
            href="#pablo"
            role="button"
            size="sm"
            color=""
            onClick={e => e.preventDefault()}
          >
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
              Delete Study
            </DropdownItem>
            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
              Edit Study
            </DropdownItem>
            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
              Contact Us
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default StudyListItem;
