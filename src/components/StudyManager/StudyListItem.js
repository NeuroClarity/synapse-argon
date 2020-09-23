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
  Button,
  Media,
  Modal,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
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
  const [deleteModal, setDeleteModal] = useState(false);
  const [changeNameModal, setChangeNameModal] = useState(false);
  const [newStudyName, setNewStudyName] = useState();

  const clipboard = useClipboard();

  useEffect(() => {
    setLink(window.location.origin + "/review/" + studyId);
  }, [studyId]);

  useEffect(() => {
    let percent = Math.trunc((completed / desired) * 100);
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

  const deleteStudy = event => {
    fetch(process.env.REACT_APP_AXON_DOMAIN + "/api/creator/delete", {
      method: "POST",
      headers: {
        // TODO: access token
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        StudyID: studyId
      })
    });
    setDeleteModal(false);
  };

  const changeStudyName = event => {
    fetch(process.env.REACT_APP_AXON_DOMAIN + "/api/creator/studyName", {
      method: "POST",
      headers: {
        // TODO: access token
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        StudyID: studyId,
        Name: newStudyName
      })
    });
    setChangeNameModal(false);
  };

  return (
    <>
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
              href="#pablo"
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
              <DropdownItem onClick={() => setDeleteModal(true)}>
                Delete Study
              </DropdownItem>
              <DropdownItem onClick={() => setChangeNameModal(true)}>
                Change Study Name
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
      </tr>
      <Modal isOpen={deleteModal}>
        <ModalBody>
          Are you sure you want to delete this study? You probably won't be able
          to recover it again.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={deleteStudy}>
            Delete
          </Button>
          <Button
            color="secondary"
            onClick={() => setDeleteModal(!deleteModal)}
          >
            Nope
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={changeNameModal}>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="examplePassword">Change your Study Name</Label>
              <Input
                type="name"
                name="name"
                id="new name"
                placeholder="New Name"
                onChange={e => setNewStudyName(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={changeStudyName}>
            Change
          </Button>
          <Button
            color="secondary"
            onClick={() => setChangeNameModal(!changeNameModal)}
          >
            Nope
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default StudyListItem;
