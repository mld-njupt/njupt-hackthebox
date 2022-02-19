import { useState } from "react";
import "./UDTimeline.scss";

const UDTimeline = (props: { nodeArray: Array<any> }) => {
  const { nodeArray } = props;
  return (
    <div className="timeline-wrap">
      <div></div>
    </div>
  );
};
const TimelineCard = () => {
  return (
    <div className="timeline-card-wrap">
      <div className="date-wrap">
        <div className="title">Week from Monday</div>
        <div className="date">Dec 3, 2021</div>
      </div>
      <div className="points-wrap">
        <div className="title">● Points Gained: </div>
        <div className="points">0</div>
      </div>
    </div>
  );
};
export default UDTimeline;
