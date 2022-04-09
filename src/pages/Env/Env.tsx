import {
  Button,
  Card,
  Collapse,
  Divider,
  Drawer,
  Input,
  Message,
  Radio,
  Select,
  Table,
  Tabs,
  Trigger,
  Typography,
  Form,
  Descriptions,
  Notification,
} from "@arco-design/web-react";
import "./Env.scss";
import { IconSearch } from "@arco-design/web-react/icon";
import { Fragment, useEffect, useState } from "react";
import {
  getCategories,
  getAllChallenges,
  getChallengesByCategory,
  submitFlag,
  getSolved,
  getSolvedByCid,
} from "../../api/competition";

export default function Env() {
  // 右侧弹出侧栏数据
  const [siderVisible, setSiderVisible] = useState<boolean>(false);
  const [questionDetail, setQuestionDetail] = useState<any>({});
  const [flag, setFlag] = useState<string>("");

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
      setChallenges(res?.data?.data);
      setChallengesLoading(false);
    });
    getCategories().then((res) => {
      console.log(res);
      setCategories(res?.data?.data);
    });
  }, []);

  function ChallengeList() {
    if (filter.category === -1) {
      return (
        <>
          <Table
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
                          console.log(res);
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
    } else return <></>;
  }

  function StatusPopup() {
    return (
      <Card>
        <Typography.Text>查看</Typography.Text>
        <Divider />
        <Radio.Group
          direction="vertical"
          defaultValue={() => {
            return filter.category;
          }}
          onChange={(e) => {
            // e === "a" && (text = "未处理");
            // e === "b" && (text = "已处理");
            let text: string | undefined;
            switch (e) {
              case "all":
                text = "全部";
                break;
              case "category":
                text = "按类型查看";
                break;
            }
            setFilterCategoryText(text);
          }}
        >
          <Radio value="-1">全部</Radio>
          <Radio value="category">按类型查看</Radio>
          {categories?.map((index: number, item: any) => {
            return <Radio value={index}></Radio>;
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
                columns={[{ title: "提交时间", dataIndex: "time" }]}
                data={[
                  {
                    key: "1",
                    name: "Jane Doe",
                    salary: 23000,
                    address: "32 Park Road, London",
                    email: "jane.doe@example.com",
                  },
                  {
                    key: "2",
                    name: "Alisa Ross",
                    salary: 25000,
                    address: "35 Park Road, London",
                    email: "alisa.ross@example.com",
                  },
                  {
                    key: "3",
                    name: "Kevin Sandra",
                    salary: 22000,
                    address: "31 Park Road, London",
                    email: "kevin.sandra@example.com",
                  },
                  {
                    key: "4",
                    name: "Ed Hellen",
                    salary: 17000,
                    address: "42 Park Road, London",
                    email: "ed.hellen@example.com",
                  },
                  {
                    key: "5",
                    name: "William Smith",
                    salary: 27000,
                    address: "62 Park Road, London",
                    email: "william.smith@example.com",
                  },
                ]}
              />
            </Typography.Paragraph>
          </Tabs.TabPane>
        </Tabs>
      </Drawer>
    </Fragment>
  );
}
