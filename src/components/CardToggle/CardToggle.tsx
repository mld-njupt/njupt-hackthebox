import { useEffect, useState } from "react";
import { IconLeft, IconRight } from "@arco-design/web-react/icon";
import "./CardToggle.scss";
const cardMsg = [
  {
    title: "Ponits",
    svg: "https://app.hackthebox.com/images/icons/ic-homepage/ic-mc-points-thin.svg",
  },
  {
    title: "User Owns",
    svg: "https://app.hackthebox.com/images/icons/ic-homepage/ic-userflag.svg",
  },
  {
    title: "System Owns",
    svg: "https://app.hackthebox.com/images/icons/ic-homepage/ic-rootflag.svg",
  },
  {
    title: "Respect",
    svg: "https://app.hackthebox.com/images/icons/ic-homepage/ic-respect.svg",
  },
  {
    title: "User Bloods",
    svg: "https://app.hackthebox.com/images/icons/ic-homepage/ic-userblood.svg",
  },
];
const CardToggle = () => {
  const length = cardMsg.length;
  const [indicatorIndex, setIndicatorIndex] = useState<number>(0);
  const handleIndicate = (type: string) => {
    return () => {
      type === "add"
        ? setIndicatorIndex((indicatorIndex + 1) % length)
        : setIndicatorIndex((indicatorIndex + length - 1) % length);
    };
  };
  useEffect(() => {
    setTimeout(() => {
      setIndicatorIndex((indicatorIndex + 1) % length);
    }, 3000);
  }, [indicatorIndex]);
  return (
    <div className="card-toggle-wrap">
      <div className="top-wrap">
        <div className="username">mldnjupt</div>
        <span> - </span>
        <div className="card-title">{cardMsg[indicatorIndex].title}</div>
      </div>
      <div className="bottom-wrap">
        <div className="indicator">
          <div
            onClick={handleIndicate("reduce")}
            className="left-indicator indicator-item"
          >
            <IconLeft style={{ color: "#a4b1cd" }}></IconLeft>
          </div>
          <div
            onClick={handleIndicate("add")}
            className="right-indicator indicator-item"
          >
            <IconRight style={{ color: "#a4b1cd" }}></IconRight>
          </div>
        </div>
        <div className="user-points">
          <div
            className="icon"
            style={{ backgroundImage: `url(${cardMsg[indicatorIndex].svg})` }}
          ></div>
          <div className="points">0</div>
        </div>
      </div>
    </div>
  );
};
export default CardToggle;
