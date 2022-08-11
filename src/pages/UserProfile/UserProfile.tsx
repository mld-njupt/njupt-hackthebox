import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import RadarChart from "../../components/BasicRadarChart/BasicRadarChart";
import ScollView from "../../components/Scollview/ScollView";
import { useNavigate } from "react-router-dom";
import { useWidth, useFetch } from "../../utils/customHooks";
import { getSelfApi, getScoreApi, putUserInfoApi } from "../../api/user";
import CalendarHeatmap from "react-calendar-heatmap";
import "./UserProfile.scss";
import "react-calendar-heatmap/dist/styles.css";
import {
  Form,
  Tabs,
  Grid,
  Input,
  InputNumber,
  Button,
  Popconfirm,
  Message,
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
  const [[rank], getRank] = useFetch(getSelfApi());
  const [[score], getScore] = useFetch(getScoreApi());
  // const [[putRes, putUserInfo]] = useFetch(putUserInfoApi(curUser));
  const [scoreObj, setScoreObj] = useState<any>({});
  const { username, email, password } = JSON.parse(
    localStorage.getItem("user") as string
  );
  const { phone, major, school, grade, country, area, age, wechat, qq } =
    JSON.parse(localStorage.getItem("userInfo") as string);
  const navigate = useNavigate();
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
  const randomValues = getRange(365).map((index) => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(1, 3),
    };
  });
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
        <TabPane key="2" title="修改个人信息">
          <Form
            onValuesChange={(current, all) => {
              console.log(all);
            }}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="用户名"
                  rules={[{ required: true, message: "请输入用户名" }]}
                >
                  <Input style={{ width: "100%" }} defaultValue={username} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="邮箱"
                  rules={[{ required: true, message: "请输入邮箱" }]}
                >
                  <Input style={{ width: "100%" }} defaultValue={email} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="密码"
                  rules={[{ required: true, message: "请输入密码" }]}
                >
                  <Input.Password
                    style={{ width: "100%" }}
                    defaultValue={password}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="确认密码"
                  rules={[{ required: true, message: "请重复输入密码" }]}
                >
                  <Input.Password
                    style={{ width: "100%" }}
                    defaultValue={password}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="手机号"
                  rules={[{ required: true, message: "请输入手机号" }]}
                >
                  <Input style={{ width: "100%" }} defaultValue={phone} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="学校"
                  rules={[{ required: true, message: "请输入学校" }]}
                >
                  <Input style={{ width: "100%" }} defaultValue={school} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="专业"
                  rules={[{ required: true, message: "请输入专业" }]}
                >
                  <Input style={{ width: "100%" }} defaultValue={major} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="年级"
                  rules={[{ required: true, message: "请输入年级" }]}
                >
                  <Input style={{ width: "100%" }} defaultValue={grade} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="国家"
                  rules={[{ required: true, message: "请输入国家" }]}
                >
                  <Input style={{ width: "100%" }} defaultValue={country} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="地区"
                  rules={[{ required: true, message: "请输入地区" }]}
                >
                  <Input style={{ width: "100%" }} defaultValue={area} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="年龄">
                  <Input style={{ width: "100%" }} defaultValue={age} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="微信号">
                  <Input style={{ width: "100%" }} defaultValue={wechat} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="qq号">
                  <Input style={{ width: "100%" }} defaultValue={qq} />
                </Form.Item>
              </Col>
              <Col span={6} />
              <Col span={6} />
              <Col span={6}>
                <Popconfirm
                  title="Are you sure you want to delete?"
                  onOk={() => {
                    Message.info({
                      content: "ok",
                    });
                  }}
                  onCancel={() => {
                    Message.error({
                      content: "cancel",
                    });
                  }}
                >
                  <div style={{height:"30px"}}></div>
                  <Button style={{width:"100%"}} type="primary">确认修改</Button>
                </Popconfirm>
              </Col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default UserProfile;
