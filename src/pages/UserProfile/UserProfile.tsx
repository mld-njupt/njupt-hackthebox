import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import RadarChart from "../../components/BasicRadarChart/BasicRadarChart";
import ScollView from "../../components/Scollview/ScollView";
import { useNavigate } from "react-router-dom";
import { useWidth, useFetch } from "../../utils/customHooks";
import { getSelfApi, getScoreApi, putUserInfoApi } from "../../api/user";
import "./UserProfile.scss";
import { Tabs } from "@arco-design/web-react";
const TabPane = Tabs.TabPane;
interface UserProp {
  age: number;
  area: string;
  country: string;
  grade: string;
  major: string;
  phone: string;
  qq: string;
  school: string;
  wechat: string;
}
function UserProfile() {
  const [wrapRef, wrapWidth] = useWidth<HTMLDivElement>();
  const [[rank], getRank] = useFetch(getSelfApi());
  const [[score], getScore] = useFetch(getScoreApi());
  // const [[putRes, putUserInfo]] = useFetch(putUserInfoApi(curUser));
  const [scoreObj, setScoreObj] = useState<any>({});
  useEffect(() => {
    getRank();
    getScore();
    // navigate("/dashboard");
  }, []);
  useEffect(() => {
    score &&
      score.data.map((value: { category: any; solve_count: any }) => {
        setScoreObj((prev: any) => {
          return { ...prev, [value.category]: value.solve_count * 10 };
        });
      });
  }, [score]);
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("user") as string));
    console.log(JSON.parse(localStorage.getItem("userInfo") as string));
    console.log(localStorage.getItem("userType"));
  }, []);
  const navigate = useNavigate();
  return (
    <div className="profile-wrap" ref={wrapRef}>
      <div className="profile-header">
        <div className="header-left">
          <div className="user-image"></div>
          <div className="username">mldnjupt</div>
        </div>
        <div className="header-right">
          <div className="change">修改个人信息</div>
          <div className="right-item rank">
            <div className="item-title">等级</div>
            <div className="item-state">入门</div>
          </div>
          <div className="right-item user-type">
            <div className="item-title">个人类型</div>
            <div className="item-state">萌新</div>
            <div
              className="go"
              onClick={() => {
                navigate("/fullRegister");
              }}
            >
              进阶
            </div>
          </div>
        </div>
      </div>
      <Tabs defaultActiveTab="1">
        <TabPane key="1" title="个人信息">
          <ScollView width={wrapWidth} itemWidth={210}>
            <div className="global-ranking">
              <div className="ranking-image"></div>
              <div className="ranking-msg">
                <div className="mgs-ranking">#{rank && rank.data.rank}</div>
                <div className="msg-title">总排名</div>
              </div>
            </div>
            <>
              {score &&
                score.data.map(
                  (
                    value: { solve_count: number; category: string },
                    index: React.Key | null | undefined
                  ) => {
                    return (
                      <ProfileCard
                        key={index}
                        score={value.solve_count}
                        category={value.category}
                      ></ProfileCard>
                    );
                  }
                )}
            </>
          </ScollView>
          <RadarChart
            title=""
            series={[
              scoreObj["Web"],
              parseInt(scoreObj["Pwn"]),
              parseInt(scoreObj["Misc"]),
              parseInt(scoreObj["Ppc"]),
              parseInt(scoreObj["Crypto"]),
            ]}
          ></RadarChart>
        </TabPane>
        <TabPane key="2" title="修改个人信息"></TabPane>
      </Tabs>
    </div>
  );
}

export default UserProfile;
