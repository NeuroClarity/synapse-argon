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
import {
  FormGroup,
  Input,
  Label,
} from "reactstrap";

class DemographicForm extends React.Component {
  render() {
    return (
      <>
        <div className="mb-3">
          <h4>Please enter your demographic information:</h4>
        </div>
        <FormGroup style={{
        }}>
          <div>
            <p>Age</p>
          </div>
          <Input
            placeholder="Age"
            type="number"
            step="1"
            min={0}
            value={this.props.age}
            onChange={e => this.props.setAge(e)}
          />
        </FormGroup>
        <FormGroup style={{
        }}>
          <div>
            <p>Gender</p>
          </div>
          <Input 
            type="select" 
            name="select" 
            value={this.props.gender}
            onChange={e => this.props.setGender(e)}
          >
            <option disabled selected value> Gender </option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Input>
        </FormGroup>
        <FormGroup style={{
        }}>
          <div>
            <p>Ethnicity</p>
          </div>
          <Input 
            type="select" 
            name="select" 
            value={this.props.race}
            onChange={e => this.props.setRace(e)}
          >
            <option disabled selected value> Ethnicity </option>
            <option>White</option>
            <option>Black</option>
            <option>American Indian/Alaskan Native</option>
            <option>Hispanic</option>
            <option>Asian/Pacific Islander</option>
            <option>Other</option>
          </Input>
        </FormGroup>
      </>
    )
  }
}

export default DemographicForm;

