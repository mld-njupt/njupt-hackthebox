import {
  Button,
  Card,
  Collapse,
  Divider,
  Input,
  Message,
  Radio,
  Select,
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

  useEffect(() => {
    getCategories().then((res) => {
      console.log(res);
      setCategoryList(res.data);
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
                    <Option key={item} disabled={index === 3} value={item}>
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
              <Collapse accordion bordered={false}>
                {categoryList.map((item: any, index: any) => {
                  return <Collapse.Item header={item} name={index}>

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
    </div>
  );
}
