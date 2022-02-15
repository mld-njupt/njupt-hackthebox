import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  Children,
} from "react";
import {
  scollViewInterface,
  scollViewContextInterface,
} from "../../utils/interfaces";
import "./ScollView.scss";
const scollViewContext = React.createContext<scollViewContextInterface>({});
const IndicatorWrap = (props: any) => {
  const context = useContext(scollViewContext);
  return (
    <div className="indicator-wrap">
      {React.Children.map(props.children, (item, index) => {
        return React.cloneElement(item, {
          onClick: () => context.setScollViewIndex(index),
          isSelected: context.scollViewIndex === index,
        });
      })}
    </div>
  );
};
const IndicatorItem = (props: any) => {
  const { onClick, isSelected } = props;
  const className = (
    isSelected
      ? ["indicator-item"].concat("indicator-item-selected")
      : ["indicator-item"]
  ).join(" ");
  return (
    <div className="item-wrap" onClick={onClick}>
      <div className={className}></div>
    </div>
  );
};

const ScollView = (props: scollViewInterface) => {
  const { width, children, itemWidth } = props;
  let items: JSX.Element[] = [];
  const [translateX, setTranslateX] = useState(0);
  const [scollViewIndex, setScollViewIndex] = useState<number>(0);
  useEffect(() => {
    const contentCapacity = width / itemWidth;
    const itemCount = React.Children.count(children);
    const indicatorCount =
      itemCount / contentCapacity < 1
        ? 0
        : Math.ceil(itemCount / contentCapacity);
    // for (let index = 0; index < indicatorCount; index++) {
    //   items.push(<IndicatorItem></IndicatorItem>);
    // }
  }, []);
  useEffect(() => {
    setTranslateX(-1 * scollViewIndex * width);
  }, [scollViewIndex]);
  const context = useMemo(
    () => ({
      scollViewIndex,
      setScollViewIndex,
    }),
    [scollViewIndex, setScollViewIndex]
  );
  return (
    <scollViewContext.Provider value={context}>
      <div className="scoll-view-wrap" style={{ width: width }}>
        <div
          className="scoll-view-content"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {React.Children.map(children, (item) => {
            return React.cloneElement(item, { style: { flexShrink: 0 } });
          })}
        </div>
        <div className="indicator-content">
          <IndicatorWrap>
            {/* {items.map((value) => {
              console.log(value);
              return value;
            })} */}
            <IndicatorItem></IndicatorItem>
            <IndicatorItem></IndicatorItem>
            <IndicatorItem></IndicatorItem>
          </IndicatorWrap>
        </div>
      </div>
    </scollViewContext.Provider>
  );
};
export default ScollView;
