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

import ReactStars from "react-rating-stars-component";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Col
} from "reactstrap";

class SurveyForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      q1value: 0,
      q2value: 0,
      q3value: 0,
      q4value: '',
    }
  }

  render() {
    return (
      <>
        <FormGroup>
          <div>
            <p>Please rate the overall quality of the video</p>
          </div>
          <ReactStars
            count={5}
            size={30}
            onChange={e => this.props.setQ1(e)}
          />
        </FormGroup>
        <FormGroup>
          <div>
            <p>After watching this, how likely you are to try this product?</p>
          </div>
          <ReactStars
            count={5}
            size={30}
            onChange={e => this.props.setQ2(e)}
          />
        </FormGroup>
        <FormGroup>
          <div>
            <p>How memorable was this ad to you?</p>
          </div>
          <ReactStars
            count={5}
            size={30}
            onChange={e => this.props.setQ3(e)}
          />
        </FormGroup>
        <FormGroup>
          <div>
            <p>Anything else you’d like to add?</p>
          </div>
          <InputGroup className="input-group-alternative mb-3">
            <Input 
              type="textarea" 
              onChange={e => this.props.setQ4(e)}
            />
          </InputGroup>
        </FormGroup>
      </>
    )
  }
}

export default SurveyForm;

