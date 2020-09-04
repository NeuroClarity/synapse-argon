import React, { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)

import { Link } from "react-router-dom";
import { useClipboard } from "use-clipboard-copy";

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

const StudyListItem = ({ studyId, studyName, desired, completed, refresh }) => {
  const [percent, setPercent] = useState(100);
  const [link, setLink] = useState();
  const [statusBadge, setStatusBadge] = useState(
    <Badge color="" className="badge-dot mr-4">
      <i className="bg-warning" />
      pending
    </Badge>
  );
  const clipboard = useClipboard();

  useEffect(() => {
    setLink(window.location.origin + "/review/new/" + studyId);
  }, [studyId]);

  useEffect(() => {
    let percent = Math.trunc((desired / completed) * 100);
    percent = isNaN(percent) ? 0 : percent;
    setPercent(percent);
  }, [desired, completed]);

  useEffect(() => {
    if (percent === 100) {
      setStatusBadge(
        <Badge color="" className="badge-dot mr-4">
          <i className="bg-success" />
          completed
        </Badge>
      );
    } else {
      setStatusBadge(
        <Badge color="" className="badge-dot mr-4">
          <i className="bg-warning" />
          pending
        </Badge>
      );
    }
  }, [percent]);

  const copyLink = React.useCallback(
    event => {
      clipboard.copy(link);
    },
    [clipboard, link]
  );

  const deleteStudy = React.useCallback(
    event => {
      fetch(process.env.REACT_APP_AXON_DOMAIN + "/api/creator/delete", {
        method: "POST",
        headers: {
          // TODO: access token
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          StudyID: studyId
        }).then(() => refresh())
      });
    },
    //eslint-disable-next-line
    [studyId]
  );

  return (
    <tr>
      <th scope="row">
        <Media className="align-items-center">
          <Media>
            <Link to={"/admin/study/" + studyId}>
              <span className="mb-0 text-sm">{studyName}</span>
            </Link>
          </Media>
        </Media>
      </th>
      <td>{desired}</td>
      <td>{statusBadge}</td>
      <td>
        <div className="avatar-group">
          <a
            className="avatar avatar-sm"
            id="tooltip742438047"
            onClick={e => copyLink(e)}
          >
            <i className={"ni ni-single-copy-04"} />
          </a>
          <UncontrolledTooltip delay={0} target="tooltip742438047">
            Click to copy your reviewer link
          </UncontrolledTooltip>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <span className="mr-2">{percent}%</span>
          <div>
            <Progress
              max="100"
              value={percent.toString()}
              barClassName="bg-danger"
            />
          </div>
        </div>
      </td>
      <td className="text-right">
        <UncontrolledDropdown>
          <DropdownToggle
            className="btn-icon-only text-light"
            role="button"
            size="sm"
            color=""
            onClick={e => e.preventDefault()}
          >
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem onClick={e => deleteStudy()}>
              Delete Study
            </DropdownItem>
            <DropdownItem onClick={e => e.preventDefault()}>
              Contact Us
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default StudyListItem;
