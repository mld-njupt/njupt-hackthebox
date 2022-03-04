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
import { useState } from "react";

const { TabPane } = Tabs;
const Option = Select.Option;
const { Text } = Typography;

export default function Env() {
  const [bottomContentRef, bottomContentWidth] = useWidth<HTMLDivElement>();
  const [popVisible, setPopVisible] = useState(false);
  const [questionStatus, setQuestionStatus] = useState<string>("全部");

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

  const options = ["Beijing", "Shanghai", "Guangzhou", "Disabled"];

  return (
    <div className="env-wrap">
      <div className="env-tabs" ref={bottomContentRef}>
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
                  popup={() => <StatusPopup/>}
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
                  {options.map((option, index) => (
                    <Option key={option} disabled={index === 3} value={option}>
                      {option}
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
                  {options.map((option, index) => (
                    <Option key={option} disabled={index === 3} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Card>
              <Collapse bordered={false}>
                <Collapse.Item header="Web" name="1"></Collapse.Item>
                <Collapse.Item header="Pwn" name="2"></Collapse.Item>
                <Collapse.Item header="Reverse" name="3"></Collapse.Item>
                <Collapse.Item header="Crypto" name="4"></Collapse.Item>
                <Collapse.Item header="Misc" name="5"></Collapse.Item>
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
