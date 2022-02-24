import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useWidth } from "../../utils/customHooks";
import "./UDTimeline.scss";
const UDTimeline = (props: { nodeArray: Array<any> }) => {
  const { nodeArray } = props;
  const [linePoint, setLinePoint] = useState<number>(-1);
  const [timelineRef, timelineWidth] = useWidth<HTMLDivElement>();
  const pointDivide = timelineWidth / props.nodeArray.length;
  return (
    <div className="timeline-wrap" ref={timelineRef}>
      {linePoint >= 0 ? (
        <TimelineCard left={linePoint * pointDivide}></TimelineCard>
      ) : null}
      <div className="timeline-point">
        {nodeArray.map((value, index) => {
          return (
            <TimelinePoint
              key={index}
              handleMouseOver={() => setLinePoint(index)}
              handleMouseLeave={() => {
                setLinePoint(-1);
              }}
            ></TimelinePoint>
          );
        })}
      </div>
    </div>
  );
};
const TimelinePoint = (props: {
  handleMouseOver: MouseEventHandler<HTMLDivElement>;
  handleMouseLeave: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      onMouseOver={props.handleMouseOver}
      onMouseLeave={props.handleMouseLeave}
      className="point-wrap"
    >
      <div className="point"></div>
    </div>
  );
};
const TimelineCard = (props: { left: number }) => {
  return (
    <div
      className="timeline-card-wrap"
      style={{ transform: `translateX(${props.left}px)` }}
    >
      <div className="date-wrap">
        <div className="title">Week from Monday</div>
        <div className="date">Dec 3, 2021</div>
      </div>
      <div className="points-wrap">
        <div className="circle">●</div>
        <div className="title"> Points Gained: </div>
        <div className="points">0</div>
      </div>
    </div>
  );
};
export default UDTimeline;
