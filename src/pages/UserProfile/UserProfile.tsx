import React from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import RadarChart from "../../components/BasicRadarChart/BasicRadarChart";
import ScollView from "../../components/Scollview/ScollView";
import { useNavigate} from "react-router-dom";
import { useWidth } from "../../utils/customHooks";
import "./UserProfile.scss";
function UserProfile() {
  const [wrapRef, wrapWidth] = useWidth<HTMLDivElement>();
  const navigate=useNavigate()
  return (
    <div className="profile-wrap" ref={wrapRef}>
      <div className="profile-header">
        <div className="header-left">
          <div className="user-image"></div>
          <div className="username">mldnjupt</div>
        </div>
        <div className="header-right">
          <div className="right-item rank">
            <div className="item-title">等级</div>
            <div className="item-state">入门</div>
          </div>
          <div className="right-item user-type">
            <div className="item-title">个人类型</div>
            <div className="item-state">萌新</div>
            <div className="go" onClick={()=>{
              navigate("/fullRegister")
            }}>进阶</div>
          </div>
        </div>
      </div>
      <ScollView width={wrapWidth} itemWidth={210}>
        <div className="global-ranking">
          <div className="ranking-image"></div>
          <div className="ranking-msg">
            <div className="mgs-ranking">#1</div>
            <div className="msg-title">总排名</div>
          </div>
        </div>
        <ProfileCard></ProfileCard>
        <ProfileCard></ProfileCard>
        <ProfileCard></ProfileCard>
      </ScollView>
      <RadarChart title="" series={[]}></RadarChart>
    </div>
  );
}

export default UserProfile;
