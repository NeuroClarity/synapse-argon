
import React from "react";

const buttons = [
  {
    label: "Strongly Disagree",
    number: 1,
  },
  {
    label: "Disagree",
    number: 2,
  },
  {
    label: "Neutral",
    number: 3,
  },
  {
    label: "Agree",
    number: 4,
  },
  {
    label: "Strongly Agree",
    number: 5,
  },
]

class SurveyRating extends React.Component {
  render() {
    return (
      <>
        <div 
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            background: "#EFEFEF", 
            padding: "15px"
          }}
        >
          {
            buttons.map((val, key) => (
              <label 
                style={{
                  "textAlign": "center",
                  "fontSize": "16px",
                }}
              >{val.label}<br />
                <input type="radio" key={key} name={this.props.ratingKey}
                  value={val.number}
                  style={{
                    "width": "20px",
                    "height": "20px",
                    "marginTop": "15px"
                  }}
                  onChange={ e => this.props.onChange(e) }
                />
              </label>
            ))
          }
        </div>
      </>
    )
  }
}

export default SurveyRating;
