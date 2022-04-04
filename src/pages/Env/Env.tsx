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
import { useEffect, useState } from "react";
import {
  getCategories,
  getAllChallenges,
  getChallengesByCategory,
  submitFlag,
  getSolved,
  getSolvedByCid,
} from "../../api/competition";

const { TabPane } = Tabs;
const Option = Select.Option;
const { Text } = Typography;
const FormItem = Form.Item;

export default function Env() {
  const [questionStatus, setQuestionStatus] = useState<string | undefined>(
    "按类型查看"
  );
  const [challengeList, setChallengeList] = useState([]);
  const [challengeListLoading, setChallengeListLoading] = useState(true);

  const [popVisible, setPopVisible] = useState(false);
  const [categoryList, setCategoryList] = useState<Array<10>>([]);
  const [challengeForCategoryList, setChallengeForCategoryList] = useState<
    Array<100>
  >([]);
  const [challengeForCategoryListLoading, setChallengeForCategoryListLoading] =
    useState(false);

  const [visible, setVisible] = useState(false);
  // const [whichChallenge, setWhichChallenge] = useState(0);
  // 右侧 drawer 所显示的选定查看比赛的详细信息
  const [questionDetail, setQuestionDetail] = useState<any>({});
  // 需要提交的flag
  const [flag, setFlag] = useState("");
  const [solvedCidList, setSolvedCidList] = useState<Array<100>>([]);

  useEffect(() => {
    getAllChallenges().then((res) => {
      console.log(res);
      setChallengeList(res?.data?.data);
      setChallengeListLoading(false);
    });
    getCategories().then((res) => {
      console.log(res);
      setCategoryList(res?.data?.data);
    });
  }, []);

  function StatusPopup() {
    return (
      <Card>
        <Text>查看</Text>
        <Divider></Divider>
        <Radio.Group
          direction="vertical"
          defaultValue={() => {
            return questionStatus === "全部" ? "all" : "category";
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
            setQuestionStatus(text);
          }}
        >
          <Radio value="all">全部</Radio>
          <Radio value="category">按类型查看</Radio>
        </Radio.Group>
      </Card>
    );
  }

  function MainTableList() {
    return questionStatus === "全部" ? (
      <Table
        columns={challengeColumns}
        data={challengeList}
        loading={challengeListLoading}
        pagination={false}
      />
    ) : (
      <>
        <Collapse
          accordion
          defaultActiveKey={["1"]}
          expandIconPosition="right"
          bordered={false}
          onChange={(e: any) => {
            setChallengeForCategoryList([]);
            setChallengeForCategoryListLoading(true);
            console.log(e);
            getChallengesByCategory(categoryList[e].toString()).then((res) => {
              console.log(res);
              res?.data?.data && setChallengeForCategoryList(res.data.data);
              setChallengeForCategoryListLoading(false);
            });
          }}
        >
          {categoryList.map((item: any, index: any) => {
            return (
              <Collapse.Item key={index} header={item} name={index}>
                <Table
                  loading={challengeForCategoryListLoading}
                  columns={challengeColumns}
                  data={challengeForCategoryList}
                  pagination={false}
                />
                {/* <Spin loading={false}>
                  <div>
                    <Divider />
                    {challengeForCategoryList?.map((item: any, index: any) => {
                      console.log(item);
                      return (
                        <div key={index} style={{ width: "100%" }}>
                          <div>{item.name}</div>
                          <div>{item.description}</div>
                          <Divider />
                        </div>
                      );
                    })}
                  </div>
                </Spin> */}
              </Collapse.Item>
            );
          })}
        </Collapse>
      </>
    );
  }

  // const options = categoryList;
  // const difficultyOptions = ["简单", "中等", "困难"];
  const challengeColumns = [
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
              setVisible(true);
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
  ];

  return (
    <div className="env-wrap">
      <div className="env-tabs">
        <Tabs defaultActiveTab="1">
          <TabPane key="1" title="题目列表">
            <div className="match-table-wrap">
              <Card bordered={false}>
                {/* <Input
                  style={{ width: 350 }}
                  prefix={<IconSearch />}
                  placeholder="Please enter"
                /> */}
                <Trigger
                  popupVisible={popVisible}
                  popup={() => <StatusPopup />}
                  trigger="click"
                  classNames="zoomInTop"
                  onVisibleChange={(visible) => {
                    setPopVisible(visible);
                  }}
                >
                  <Button style={{ width: 140 }}>
                    查看 · {questionStatus}
                  </Button>
                </Trigger>
                {/* <Select
                  placeholder="排序"
                  style={{ width: 154 }}
                  onChange={(value) =>
                    Message.info({
                      content: `You select ${value}.`,
                      showIcon: true,
                    })
                  }
                >
                  {options.map((item, index) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
                <Select
                  placeholder="难度"
                  style={{ width: 154 }}
                  onChange={(value) =>
                    Message.info({
                      content: `You select ${value}.`,
                      showIcon: true,
                    })
                  }
                >
                  {difficultyOptions.map((item, index) => (
                    <Option key={item} disabled={index === 3} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select> */}
              </Card>
              <MainTableList />
            </div>
          </TabPane>
          <TabPane key="2" title="已完成题目">
            Content of Tab Panel 2
          </TabPane>
          <TabPane key="3" title="待完成题目">
            Content of Tab Panel 3
          </TabPane>
        </Tabs>
      </div>
      <Drawer
        width={700}
        title={<span>Happy Hacking!</span>}
        visible={visible}
        footer={null}
        onOk={() => {
          console.log("OK");
          setVisible(false);
        }}
        onCancel={() => {
          console.log("Cancel");
          setVisible(false);
        }}
      >
        <Tabs defaultActiveTab="1">
          <TabPane key="1" title="详情">
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
          </TabPane>
          <TabPane key="2" title="提交flag">
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
          </TabPane>
          <TabPane key="3" title="提交记录">
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
          </TabPane>
        </Tabs>
      </Drawer>
    </div>
  );
}
