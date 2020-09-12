import React, { useState, useEffect } from "react";
import {
  Progress,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Card,
  CardHeader,
  Table,
  Row
} from "reactstrap";
const DemographicFilter = ({ demographics }) => {
  const [rowArray, setRowArray] = useState();
  const [groups, setGroups] = useState();
  const [groupLabels, setGroupLabels] = useState();
  const [activeLabel, setActiveLabel] = useState();
  const [totalReviewers, setTotalReviewers] = useState();

  const [dropdownOpen, setDropdownOpen] = useState();

  useEffect(() => {
    if (demographics !== undefined) {
      setTotalReviewers(demographics.Groups.Total[0].Reviewers);
      setGroups({ ...demographics.Groups });
      setActiveLabel([...Object.keys(demographics.Groups)][0]);
      setGroupLabels(
        [...Object.keys(demographics.Groups)].map(key => (
          <DropdownItem onClick={() => setActiveLabel(key)}>
            {" "}
            {key}{" "}
          </DropdownItem>
        ))
      );
    }
  }, [demographics]);

  useEffect(() => {
    if (demographics && activeLabel) {
      const newRowA = [];
      groups[activeLabel].forEach((item, i) => {
        const percent = Math.trunc((item.Reviewers / totalReviewers) * 100);
        newRowA.push(
          <React.Fragment key={i}>
            <tr>
              <th scope="row">{item.Label}</th>
              <td>{item.Reviewers}</td>
              <td>
                <span className="mr-2">{percent}%</span>
              </td>
            </tr>
            <tr>
              <td>
                <Progress
                  max="100"
                  value={percent.toString()}
                  barClassName="bg-gradient-success"
                />
              </td>
            </tr>
          </React.Fragment>
        );
      });
      setRowArray(newRowA);
    }
  }, [activeLabel, demographics, groups, totalReviewers]);

  const toggle = React.useCallback(() => {
    setDropdownOpen(!dropdownOpen);
  }, [dropdownOpen]);

  return (
    <Card style={{ height: "100%" }} className="shadow">
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <div className="col">
            <h3 className="mb-0">Demographic Filter</h3>
          </div>
          <div className="col text-right">
            <ButtonDropdown
              color="primary"
              size="sm"
              isOpen={dropdownOpen}
              toggle={toggle}
            >
              <DropdownToggle caret>Change Grouping</DropdownToggle>
              <DropdownMenu>{groupLabels ? groupLabels : <></>}</DropdownMenu>
            </ButtonDropdown>
          </div>
        </Row>
      </CardHeader>
      <Table className="table-sm align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Age</th>
            <th scope="col">Reviewers</th>
            <th scope="col">Completion</th>
          </tr>
        </thead>
        <tbody>{rowArray}</tbody>
      </Table>
    </Card>
  );
};

export default DemographicFilter;
