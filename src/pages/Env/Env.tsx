import {
  Button,
  Card,
  Divider,
  Drawer,
  Input,
  Radio,
  Table,
  Tabs,
  Trigger,
  Typography,
  Descriptions,
  Notification,
} from "@arco-design/web-react";
import "./Env.scss";
import Loading from "../../components/Loading/Loading";
import { Fragment, useEffect, useState } from "react";
import {
  getCategories,
  getAllChallenges,
  getChallengesByCategory,
  submitFlag,
  getSolved,
  getSolvedByCid,
} from "../../api/competition";
import { Outlet } from "react-router-dom";

export default function Env() {
  // 右侧弹出侧栏数据
  const [siderVisible, setSiderVisible] = useState<boolean>(false);
  const [questionDetail, setQuestionDetail] = useState<any>({});
  const [flag, setFlag] = useState<string>("");
  const [singleCchallengeSolvedInfo, setSingleChallengeSolvedInfo] = useState<
    any[]
  >([]);

  const [categories, setCategories] = useState<any[]>([]);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [challengesLoading, setChallengesLoading] = useState<boolean>(false);
  const [popFilterVisible, setPopFilterVisible] = useState<boolean>(false);
  const [filter, setFilter] = useState<any>({
    category: -1,
  });
  const [filterCategoryText, setFilterCategoryText] = useState<
    string | undefined
  >("全部");

  useEffect(() => {
    setChallengesLoading(true);
    getAllChallenges().then((res) => {
      console.log(res);
      setChallenges(res?.data?.data === null ? [] : res?.data?.data);
      setChallengesLoading(false);
    });
    getCategories().then((res) => {
      console.log(res);
      setCategories(res?.data?.data === null ? [] : res?.data?.data);
    });
  }, []);

  function timeConvert(timestamp: number) {
    //num:0 YYYY-MM-DD  num:1  YYYY-MM-DD hh:mm:ss // timestamp:时间戳
    //将时间戳转换成正常时间格式
    //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var date = new Date(timestamp * 1000);
    var YY = date.getFullYear() + "-";
    var MM =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    var DD = date.getDate() + "   ";
    var hh = date.getHours() + ":";
    var mm =
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":";
    var ss =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return YY + MM + DD + hh + mm + ss;
  }

  function ChallengeList() {
    return (
      <>
        <Table
          border={false}
          columns={[
            {
              title: "题目编号",
              dataIndex: "id",
            },
            {
              title: "题目名称",
              dataIndex: "name",
            },
            {
              title: "方向",
              dataIndex: "category",
            },
            {
              title: "Tags",
              dataIndex: "tags",
            },
            {
              title: "分数",
              dataIndex: "score",
            },
            {
              title: "已解题人数",
              dataIndex: "solver_count",
            },
            {
              title: "状态",
              dataIndex: "is_solved",
              render: (text: boolean, record: any) => {
                // console.log(record);
                return text ? "已完成" : "未完成";
              },
            },
            {
              title: "操作",
              dataIndex: "action",
              render: (text: any, record: any) => {
                return (
                  <Button
                    onClick={() => {
                      console.log(record);
                      setQuestionDetail(record);
                      setSiderVisible(true);
                      getSolvedByCid(record.id).then((res) => {
                        console.log(res?.data?.data);
                        setSingleChallengeSolvedInfo(
                          res?.data?.data === null ? [] : res?.data?.data
                        );
                      });
                    }}
                  >
                    提交
                  </Button>
                );
              },
            },
          ]}
          data={challenges}
          loading={challengesLoading}
          pagination={false}
        />
      </>
    );
  }

  function StatusPopup() {
    return (
      <Card>
        <Typography.Text>查看</Typography.Text>
        <Divider />
        <Radio.Group
          direction="vertical"
          defaultValue={() => {
            console.log(filter.category);
            return filter.category;
          }}
          onChange={(e) => {
            // console.log(Number(e));
            setChallengesLoading(true);
            setFilter((prev: any) => {
              return { ...prev, category: Number(e) };
            });
            if (Number(e) === -1) {
              setFilterCategoryText("全部");
              getAllChallenges().then((res) => {
                console.log(res);
                setChallenges(res?.data?.data === null ? [] : res?.data?.data);
                setChallengesLoading(false);
              });
            } else {
              setFilterCategoryText(categories[Number(e)]);
              getChallengesByCategory(categories[Number(e)]).then((res) => {
                console.log(res);
                setChallenges(res?.data?.data === null ? [] : res?.data?.data);
                setChallengesLoading(false);
              });
            }
            setPopFilterVisible(false);
          }}
        >
          <Radio value={-1}>全部</Radio>
          {categories?.map((value: string, index: number) => {
            // console.log(value, index);
            return <Radio value={index}>{value}</Radio>;
          })}
        </Radio.Group>
      </Card>
    );
  }

  return (
    <Fragment>
      <div className="env-wrap">
        <div className="env-tabs">
          <Tabs defaultActiveTab="1">
            <Tabs.TabPane title="挑战列表" key="1">
              <Card bordered={false}>
                <Trigger
                  popupVisible={popFilterVisible}
                  popup={() => <StatusPopup />}
                  trigger="click"
                  classNames="zoomInTop"
                  onVisibleChange={(visible) => {
                    setPopFilterVisible(visible);
                  }}
                >
                  <Button style={{ width: 140 }}>
                    查看 · {filterCategoryText}
                  </Button>
                </Trigger>
              </Card>
              <ChallengeList />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
      <Drawer
        className="drawer"
        width={700}
        title={<span>{questionDetail?.name}</span>}
        visible={siderVisible}
        footer={null}
        onOk={() => {
          console.log("OK");
          setSiderVisible(false);
        }}
        onCancel={() => {
          console.log("Cancel");
          setSiderVisible(false);
        }}
      >
        <Tabs defaultActiveTab="1">
          <Tabs.TabPane key="1" title="详情">
            <Descriptions
              column={1}
              title="题目信息"
              data={
                questionDetail && [
                  {
                    key: 1,
                    label: "题目ID",
                    value: questionDetail?.id,
                  },
                  {
                    key: 2,
                    label: "题目名称",
                    value: questionDetail?.name,
                  },
                  {
                    key: 3,
                    label: "分数",
                    value: questionDetail?.score,
                  },
                  {
                    key: 4,
                    label: "简介",
                    value: questionDetail?.description,
                  },
                  {
                    key: 5,
                    label: "附件",
                    value: questionDetail?.attachment,
                  },
                  {
                    key: 6,
                    label: "分类",
                    value: questionDetail?.category,
                  },
                  {
                    key: 7,
                    label: "标签",
                    value: questionDetail?.tags,
                  },
                  {
                    key: 8,
                    label: "hints",
                    value: questionDetail?.hints,
                  },
                  {
                    key: 9,
                    label: "已解决人数",
                    value: questionDetail?.solver_count,
                  },
                  {
                    key: 10,
                    label: "状态",
                    value: questionDetail?.is_solved ? "已解决" : "未解决",
                  },
                ]
              }
              style={{ margin: 20 }}
              labelStyle={{ paddingRight: 20 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" title="提交flag">
            <Descriptions
              column={1}
              title="提交flag"
              data={[]}
              style={{ margin: "20px 20px 5px 20px" }}
              labelStyle={{ paddingRight: 20 }}
            />
            <Input
              style={{ margin: "0px 20px 0px 20px", width: 350 }}
              allowClear
              placeholder="Please enter your flag here"
              onChange={(e) => {
                // console.log(e);
                setFlag(e);
              }}
            />
            <Button
              style={{ marginLeft: 12 }}
              onClick={() => {
                if (flag !== "") {
                  console.log(flag);
                  submitFlag(questionDetail.id, flag).then((res) => {
                    console.log(res);
                    if (res?.data?.code === 4010) {
                      Notification.warning({
                        title: res?.data?.msg,
                        content: res?.data?.data ? res?.data?.data : "",
                      });
                    } else if (res?.data?.code === 4000) {
                      Notification.error({
                        title: res?.data?.msg,
                        content: res?.data?.data ? res?.data?.data : "",
                      });
                    } else if (res?.data?.code === 200) {
                      Notification.success({
                        title: res?.data?.msg,
                        content: res?.data?.data ? res?.data?.data : "",
                      });
                    }
                  });
                }
              }}
            >
              Submit
            </Button>
          </Tabs.TabPane>
          <Tabs.TabPane key="3" title="提交记录">
            <Typography.Paragraph>
              <Table
                border={false}
                className="tabs"
                columns={[
                  {
                    title: "ID",
                    dataIndex: "id",
                  },
                  { title: "用户名", dataIndex: "username" },
                  {
                    title: "提交时间",
                    dataIndex: "submitted_at",
                    render: (record) => {
                      console.log(record);
                      return timeConvert(parseInt(record));
                    },
                  },
                  { title: "分数", dataIndex: "score" },
                ]}
                // data={singleCchallengeSolvedInfo}
                data={[
                  {
                    id: 1,
                    uid: 2,
                    cid: 3,
                    username: "test1",
                    challenge_name: "Hard Web",
                    submitted_at: 1647085328,
                    score: 883,
                  },
                  {
                    id: 2,
                    uid: 3,
                    cid: 3,
                    username: "test2",
                    challenge_name: "Hard Web",
                    submitted_at: 1647085501,
                    score: 883,
                  },
                  {
                    id: 5,
                    uid: 4,
                    cid: 3,
                    username: "test3",
                    challenge_name: "Hard Web",
                    submitted_at: 1647085677,
                    score: 883,
                  },
                  {
                    id: 5,
                    uid: 4,
                    cid: 3,
                    username: "test3",
                    challenge_name: "Hard Web",
                    submitted_at: 1647085677,
                    score: 883,
                  },
                  {
                    id: 5,
                    uid: 4,
                    cid: 3,
                    username: "test3",
                    challenge_name: "Hard Web",
                    submitted_at: 1647085677,
                    score: 883,
                  },
                  {
                    id: 5,
                    uid: 4,
                    cid: 3,
                    username: "test3",
                    challenge_name: "Hard Web",
                    submitted_at: 1647085677,
                    score: 883,
                  },
                  {
                    id: 5,
                    uid: 4,
                    cid: 3,
                    username: "test3",
                    challenge_name: "Hard Web",
                    submitted_at: 1647085677,
                    score: 883,
                  },
                  {
                    id: 5,
                    uid: 4,
                    cid: 3,
                    username: "test3",
                    challenge_name: "Hard Web",
                    submitted_at: 1647085677,
                    score: 883,
                  },
                  {
                    id: 5,
                    uid: 4,
                    cid: 3,
                    username: "test3",
                    challenge_name: "Hard Web",
                    submitted_at: 1647085677,
                    score: 883,
                  },
                  {
                    id: 5,
                    uid: 4,
                    cid: 3,
                    username: "test3",
                    challenge_name: "Hard Web",
                    submitted_at: 1647085677,
                    score: 883,
                  },
                  {
                    id: 5,
                    uid: 4,
                    cid: 3,
                    username: "test3",
                    challenge_name: "Hard Web",
                    submitted_at: 1647085677,
                    score: 883,
                  },
                  {
                    id: 5,
                    uid: 4,
                    cid: 3,
                    username: "test3",
                    challenge_name: "Hard Web",
                    submitted_at: 1647085677,
                    score: 883,
                  },
                  {
                    id: 5,
                    uid: 4,
                    cid: 3,
                    username: "test3",
                    challenge_name: "Hard Web",
                    submitted_at: 1647085677,
                    score: 883,
                  },
                  {
                    id: 5,
                    uid: 4,
                    cid: 3,
                    username: "test3",
                    challenge_name: "Hard Web",
                    submitted_at: 1647085677,
                    score: 883,
                  },
                  {
                    id: 5,
                    uid: 4,
                    cid: 3,
                    username: "test3",
                    challenge_name: "Hard Web",
                    submitted_at: 1647085677,
                    score: 883,
                  },
                  {
                    id: 5,
                    uid: 4,
                    cid: 3,
                    username: "test3",
                    challenge_name: "Hard Web",
                    submitted_at: 1647085677,
                    score: 883,
                  },
                ]}
                pagination={false}
              />
            </Typography.Paragraph>
          </Tabs.TabPane>
        </Tabs>
      </Drawer>
      <Outlet></Outlet>
    </Fragment>
  );
}
