import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import RadarChart from "../../components/BasicRadarChart/BasicRadarChart";
import ScollView from "../../components/Scollview/ScollView";
import { useNavigate } from "react-router-dom";
import { useWidth, useFetch } from "../../utils/customHooks";
import { refreshUser } from "../../store/user";
import asyncLocalStorage from "../../utils/asyncLocalStorage";
import {
  getSelfApi,
  getScoreApi,
  putUserInfoApi,
  updateInfoApi,
} from "../../api/user";
import CalendarHeatmap from "react-calendar-heatmap";
import "./UserProfile.scss";
import "react-calendar-heatmap/dist/styles.css";
import {
  Form,
  Tabs,
  Grid,
  Input,
  Notification,
  Button,
  Popconfirm,
  Message,
  InputNumber,
} from "@arco-design/web-react";

const Row = Grid.Row;
const Col = Grid.Col;
const WEEKDAYLABEL_LEFT = 5;
//@ts-ignore
CalendarHeatmap.prototype.getTransformForWeekdayLabels = function () {
  if (this.props.horizontal) {
    //@ts-ignore
    return `translate(${WEEKDAYLABEL_LEFT}, ${this.getMonthLabelSize()})`;
  }
  return null;
};
const TabPane = Tabs.TabPane;
interface CommonUserProp {
  username: string;
  password: string;
  rePassword: string;
  email: string;
}
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
const today = new Date();
function shiftDate(date: string | number | Date, numDays: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function UserProfile() {
  const [wrapRef, wrapWidth] = useWidth<HTMLDivElement>();
  const [isRefresh, refresh] = useRecoilState(refreshUser);
  const [commonUser, setCommonUser] = useState<CommonUserProp>({
    username: "",
    password: "",
    email: "",
    rePassword: "",
  });
  const [user, setUser] = useState<UserProp>({
    age: 0,
    area: "",
    country: "",
    grade: "",
    major: "",
    phone: "",
    qq: "",
    school: "",
    wechat: "",
  });
  const [[rank], getRank] = useFetch(getSelfApi());
  const [[score], getScore] = useFetch(getScoreApi());
  //普通用户修改信息
  const [[updateInfoData], updateInfo] = useFetch(updateInfoApi(commonUser));
  //进阶用户修改信息
  const [[putUserInfoData], putUserInfo] = useFetch(putUserInfoApi(user));
  const [scoreObj, setScoreObj] = useState<any>({
    Web: 0,
    Crypto: 0,
    Ppc: 0,
    Misc: 0,
    Pwn: 0,
  });
  const { username, email, password, rePassword } = commonUser;
  const { phone, major, school, grade, country, area, age, wechat, qq } = user;

  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const navigate = useNavigate();
  useEffect(() => {
    getRank();
    getScore();
  }, []);
  useEffect(() => {
    score &&
      score.data.map((value: { category: any; solve_count: any }) => {
        setScoreObj((prev: any) => {
          return { ...prev, [value.category]: value.solve_count };
        });
      });
  }, [score]);
  useEffect(() => {
    if (
      (updateInfoData && updateInfoData.code === 200) ||
      (putUserInfoData && putUserInfoData.code === 200)
    ) {
      Notification.success({ title: "Success", content: "修改成功" });
      refresh((prev) => {
        return !prev;
      });
    }
  }, [updateInfoData, putUserInfoData]);
  const randomValues = getRange(365).map((index) => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(1, 3),
    };
  });
  useEffect(() => {
    asyncLocalStorage.getItem("user").then((res: any) => {
      res && setCommonUser({ ...JSON.parse(res) });
    });
    asyncLocalStorage.getItem("userInfo").then((res: any) => {
      res && setUser({ ...JSON.parse(res) });
    });
  }, []);
  const handleCommonSubmit = () => {
    if (password !== rePassword) {
      Notification.error({ title: "Error", content: "两次密码输入不一致" });
    } else if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email)) {
      Notification.error({ title: "Error", content: "邮箱格式错误" });
    } else {
      updateInfo();
    }
  };
  const handleSubmit = () => {
    if (!/^1\d{10}$/.test(phone)) {
      Notification.error({ title: "Error", content: "手机号格式错误" });
    } else if (password !== rePassword) {
      Notification.error({ title: "Error", content: "两次密码输入不一致" });
    } else if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email)) {
      Notification.error({ title: "Error", content: "邮箱格式错误" });
    } else {
      updateInfo();
      putUserInfo();
    }
  };
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
            <div className="item-state">
              {userType === "full" ? "普通用户" : "萌新"}
            </div>
            {userType === "full" ? null : (
              <div
                className="go"
                onClick={() => {
                  navigate("/fullRegister");
                }}
              >
                进阶
              </div>
            )}
          </div>
        </div>
      </div>
      <Tabs defaultActiveTab="1">
        <TabPane key="1" title="个人信息">
          <div className="profile-heatmap">
            <CalendarHeatmap
              startDate={new Date("2022-01-01")}
              endDate={new Date("2022-12-31")}
              values={randomValues}
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return `color-github-${value.count}`;
              }}
              // tooltipDataAttrs={(value: {
              //   date: { toISOString: () => string | any[] };
              //   count: any;
              // }) => {
              //   return {
              //     "data-tip": `${value.date
              //       .toISOString()
              //       .slice(0, 10)} has count: ${value.count}`,
              //   };
              // }}
              showWeekdayLabels={true}
              gutterSize={2}
            />
          </div>
          <div className="ranking-wrap">
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
            <div>
              <div className="global-ranking">
                <div className="ranking-image"></div>
                <div className="ranking-msg">
                  <div className="mgs-ranking">#{rank && rank.data.rank}</div>
                  <div className="msg-title">总排名</div>
                </div>
              </div>
              {score && (
                <ScollView width={wrapWidth} itemWidth={210}>
                  <ProfileCard
                    key={1}
                    score={scoreObj.Web}
                    category={"Web"}
                  ></ProfileCard>
                  <ProfileCard
                    key={2}
                    score={scoreObj.Pwn}
                    category={"Pwn"}
                  ></ProfileCard>
                  <ProfileCard
                    key={3}
                    score={scoreObj.Crypto}
                    category={"Cryoto"}
                  ></ProfileCard>
                  <ProfileCard
                    key={4}
                    score={scoreObj.Misc}
                    category={"Misc"}
                  ></ProfileCard>
                  <ProfileCard
                    key={5}
                    score={scoreObj.Ppc}
                    category={"Ppc"}
                  ></ProfileCard>
                </ScollView>
              )}
            </div>
          </div>
        </TabPane>
        <TabPane key="2" title="修改个人信息">
          <Form
            onValuesChange={(current, all: any) => {
              console.log(all);
              setCommonUser(all);
            }}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  field="username"
                  label="用户名"
                  rules={[{ required: true, message: "请输入用户名" }]}
                  initialValue={username}
                >
                  <Input allowClear style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  field="email"
                  label="邮箱"
                  rules={[{ required: true, message: "请输入邮箱" }]}
                  initialValue={email}
                >
                  <Input allowClear style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  field={"password"}
                  label="密码"
                  initialValue={password}
                >
                  <Input.Password style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="确认密码"
                  field={"rePassword"}
                  initialValue={password}
                >
                  <Input.Password style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {userType === "full" ? (
            <Form
              onValuesChange={(current, all: any) => {
                setUser(all);
              }}
              layout="vertical"
            >
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    label="手机号"
                    rules={[{ required: true, message: "请输入手机号" }]}
                    field="phone"
                    initialValue={phone}
                  >
                    <Input allowClear style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="学校"
                    rules={[{ required: true, message: "请输入学校" }]}
                    field="school"
                    initialValue={school}
                  >
                    <Input allowClear style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="专业"
                    rules={[{ required: true, message: "请输入专业" }]}
                    field="major"
                    initialValue={major}
                  >
                    <Input allowClear style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="年级"
                    rules={[{ required: true, message: "请输入年级" }]}
                    field="grade"
                    initialValue={grade}
                  >
                    <Input allowClear style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    label="国家"
                    rules={[{ required: true, message: "请输入国家" }]}
                    field="country"
                    initialValue={country}
                  >
                    <Input allowClear style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="地区"
                    rules={[{ required: true, message: "请输入地区" }]}
                    field="area"
                    initialValue={area}
                  >
                    <Input allowClear style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="年龄"
                    rules={[{ required: true, message: "请输入年龄" }]}
                    field="age"
                    initialValue={age}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="微信号"
                    rules={[{ required: true, message: "请输入微信号" }]}
                    field="wechat"
                    initialValue={wechat}
                  >
                    <Input allowClear style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    label="qq号"
                    rules={[{ required: true, message: "请输入qq号" }]}
                    field="qq"
                    initialValue={qq}
                  >
                    <Input allowClear style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          ) : null}
          <Row gutter={16}>
            <Col span={6}>
              <Popconfirm
                title="确认修改?"
                onOk={userType === "full" ? handleSubmit : handleCommonSubmit}
                onCancel={() => {
                  Message.error({
                    content: "取消修改",
                  });
                }}
              >
                <div style={{ height: "30px" }}></div>
                <Button style={{ width: "100%" }} type="primary">
                  确认修改
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default UserProfile;
