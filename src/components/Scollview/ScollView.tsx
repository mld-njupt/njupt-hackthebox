import React, { useState, useEffect, forwardRef } from "react";
import { useWidth } from "../../utils/customHooks";
import "./ScollView.scss";
const ScollView = (props: {
  width: number;
  children: Array<JSX.Element> | JSX.Element;
  itemWidth: number;
}) => {
  const { width, children, itemWidth } = props;
  const contentCapacity = width / itemWidth;
  const itemCount = React.Children.count(children);
  const indicatorCount =
    itemCount / contentCapacity < 1
      ? 0
      : Math.ceil(itemCount / contentCapacity);
  useEffect(() => {
    console.log(contentCapacity, itemCount, indicatorCount);
  }, []);

  return (
    <div className="scoll-view-wrap" style={{ width: width }}>
      <div className="scoll-view-content">
        {React.Children.map(children, (item) => {
          return React.cloneElement(item, { style: { flexShrink: 0 } });
        })}
      </div>
      <div className="indicator"></div>
    </div>
  );
};
export default ScollView;
