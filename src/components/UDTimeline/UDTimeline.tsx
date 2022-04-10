import React, { MouseEventHandler, useState } from "react";
import { useWidth } from "../../utils/customHooks";
import "./UDTimeline.scss";
const UDTimeline = (props: { nodeArray: Array<any> }) => {
  const { nodeArray } = props;
  const [linePoint, setLinePoint] = useState<number>(-1);
  const [timelineRef, timelineWidth] = useWidth<HTMLDivElement>();
  const pointDivide = timelineWidth / props.nodeArray.length;
  return (
    <div className="timeline-wrap">
      <TimelineCard
        visibility={linePoint < 0 ? "hidden" : "visible"}
        left={linePoint * pointDivide}
      ></TimelineCard>
      <div className="timeline-bottom-wrap">
        <div className="timeline-line"></div>
        <div className="timeline-point" ref={timelineRef}>
          {nodeArray.map((value, index) => {
            return (
              <TimelinePoint
                key={index}
                index={index}
                handleMouseOver={() => setLinePoint(index)}
                handleMouseLeave={() => {
                  setLinePoint(-1);
                }}
              ></TimelinePoint>
            );
          })}
        </div>
      </div>
    </div>
  );
};
const TimelinePoint = (props: {
  handleMouseOver: MouseEventHandler<HTMLDivElement>;
  handleMouseLeave: MouseEventHandler<HTMLDivElement>;
  index: number;
}) => {
  return (
    <div className="point-wrap">
      <div
        onMouseOver={props.handleMouseOver}
        onMouseLeave={props.handleMouseLeave}
        className="point"
      ></div>
    </div>
  );
};
const TimelineCard = (props: { left: number; visibility: any }) => {
  return (
    <div
      className="timeline-card-wrap"
      style={{
        visibility: props.visibility,
        transform: `translateX(${props.left > 0 && props.left}px)`,
      }}
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
