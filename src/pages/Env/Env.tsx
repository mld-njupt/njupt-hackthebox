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
  Spin,
  Table,
  Tabs,
  Trigger,
  Typography,
} from "@arco-design/web-react";
import "./Env.scss";
import { useWidth } from "../../utils/customHooks";
import { IconSearch } from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";
import { getCategories, getAllChallenges, getChallengesByCategory, submitFlag, getSolved } from "../../api/competition";

const { TabPane } = Tabs;
const Option = Select.Option;
const { Text } = Typography;

export default function Env() {
  const [popVisible, setPopVisible] = useState(false);
  const [questionStatus, setQuestionStatus] = useState<string>("全部");
  const [categoryList, setCategoryList] = useState<Array<10>>([]);
  const [challengeForCategoryList, setChallengeForCategoryList] = useState<Array<10>>([]);
  const [challengeForCategoryListLoading, setChallengeForCategoryListLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [whichChallenge, setWhichChallenge] = useState(0);

  useEffect(() => {
    getCategories().then((res) => {
      console.log(res);
      setCategoryList(res.data.data);
    })
  }, [])

  function StatusPopup() {
    return (
      <Card>
        <Text>状态</Text>
        <Divider></Divider>
        <Radio.Group
          direction="vertical"
          defaultValue="c"
          onChange={(e) => {
            let text = "全部";
            // e === "a" && (text = "未处理");
            // e === "b" && (text = "已处理");
            switch (e) {
              case "a":
                text = "已完成";
                break;
              case "b":
                text = "未完成";
                break;
              case "c":
                text = "全部";
                break;
            }
            setQuestionStatus(text);
          }}
        >
          <Radio value="a">已完成</Radio>
          <Radio value="b">未完成</Radio>
          <Radio value="c">全部</Radio>
        </Radio.Group>
      </Card>
    );
  }

  const options = categoryList;
  const difficultyOptions = ['简单', '中等', '困难'];
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
      }
    },
    {
      title: "操作",
      dataIndex: "action",
      render: (text: any, record: any) => {
        return (
          <Button
            onClick={() => {
              console.log(record);
              setVisible(true);
            }}
          >
            提交
          </Button>
        );
      }
    }
  ]

  return (
    <div className="env-wrap">
      <div className="env-tabs">
        <Tabs defaultActiveTab="1">
          <TabPane key="1" title="题目列表">
            <div className="match-table-wrap">
              <Card bordered={false}>
                <Input
                  style={{ width: 350 }}
                  prefix={<IconSearch />}
                  placeholder="Please enter"
                />
                <Trigger
                  popupVisible={popVisible}
                  popup={() => <StatusPopup />}
                  trigger="click"
                  classNames="zoomInTop"
                  onVisibleChange={(visible) => {
                    setPopVisible(visible);
                  }}
                >
                  <Button style={{ marginRight: 40 }}>
                    状态·{questionStatus}
                  </Button>
                </Trigger>
                <Select
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
                </Select>
              </Card>
              <Collapse accordion bordered={false} onChange={(e: any) => {
                setChallengeForCategoryList([]);
                setChallengeForCategoryListLoading(true);
                console.log(e);
                getChallengesByCategory(categoryList[e].toString()).then((res) => {
                  console.log(res);
                  res?.data?.data && setChallengeForCategoryList(res.data.data);
                  setChallengeForCategoryListLoading(false);
                })
              }}>
                {categoryList.map((item: any, index: any) => {

                  return <Collapse.Item key={index} header={item} name={index}>
                    <Table loading={challengeForCategoryListLoading} columns={challengeColumns} data={challengeForCategoryList} pagination={false} />
                    {/* <Spin loading={false}>
                      <div>
                        <Divider />
                        {challengeForCategoryList?.map((item: any, index: any) => {
                          console.log(item);
                          return <div key={index} style={{ width: "100%" }}>
                            <div>{item.name}</div>
                            <div>{item.description}</div>
                            <Divider />
                          </div>
                        })}
                      </div>
                    </Spin> */}
                  </Collapse.Item>;
                })}
              </Collapse>
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
        width={500}
        title={<span>First Drawer </span>}
        visible={visible}
        footer={null}
        onOk={() => {
          console.log("OK")
          setVisible(false);
        }}
        onCancel={() => {
          console.log("Cancel")
          setVisible(false);
        }}
      >
        <Text>{ }</Text>
        <Button
          onClick={() => {
            setVisible2(true);
          }}
          type='primary'
          style={{ marginTop: 20 }}
        >
          Open Drawer
        </Button>
      </Drawer>
      <Drawer
        width={332}
        title={<span>Second Drawer </span>}
        footer={null}
        visible={visible2}
        onOk={() => {
          console.log("OK");
          setVisible2(false);
        }}
        onCancel={() => {
          console.log("Cancel");
          setVisible2(false);
        }}
      >
        <div>Here is an example text.</div>

        <div>Here is an example text.</div>
      </Drawer>
    </div>
  );
}

