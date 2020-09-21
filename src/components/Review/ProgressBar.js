import React, { useState } from "react";
import { Tooltip, Button } from 'reactstrap';

import '../../assets/css/progressbar.css';

const buttons = [
  {
    title: "Welcome",
    description: "A creator has requested that you review their video",
  },
  {
    title: "Setup",
    description: "Quick steps to ensure the best viewing experience",
  },
  {
    title: "Calibrate",
    description: "Some basic eye tracking calibration",
  },
  {
    title: "Review",
    description: "Review the video and provide feedback",
  },
]

const TooltipItem = props => {
  const { id, text } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <span>
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        target={"Tooltip-" + id}
        toggle={toggle}
      >
        {text}
      </Tooltip>
    </span>
  );
};

const ProgressBar = ({step}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div class="container" className="justify-content-center">
      <ul class="progressbar">
        {
          buttons.map((val, key) => (
            <li class={key < step ? "active" : ""} id={"Tooltip-"+key}>
              <span>{val.title}</span>
              <TooltipItem key={key} id={key} text={val.description}>
                Hello world!
              </TooltipItem>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default ProgressBar;
