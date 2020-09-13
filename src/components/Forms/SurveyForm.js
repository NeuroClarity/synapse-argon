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
import SurveyRating from "../../components/Forms/SurveyRating.js"
// reactstrap components
import {
  FormGroup,
  Input,
  InputGroup,
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
        <div className="mb-3">
          <h4>Rate your agreement with the following statements:</h4>
        </div>
        <FormGroup>
          <div>
            <p>After watching this video, I am more likely to purchase/use this product in the future.</p>
          </div>
          <SurveyRating ratingKey={"PurchaseIntent"} onChange={ this.props.setQ2 }/>
        </FormGroup>
        <FormGroup>
          <div>
            <p>This ad was highly memorable compared to ads for other products in this space.</p>
            <SurveyRating ratingKey={"Memorable"} onChange={ this.props.setQ3 }/>
          </div>
        </FormGroup>
        <FormGroup>
          <div>
            <p>This was a high quality video compared to other similar videos that I have watched.</p>
          </div>
          <SurveyRating ratingKey={"Quality"} onChange={ this.props.setQ1 }/>
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

