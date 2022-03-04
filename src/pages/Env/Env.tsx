import { Tabs } from "@arco-design/web-react";
import ScollView from "../../components/Scollview/ScollView";
import "./Env.scss";
import { useWidth } from "../../utils/customHooks";

const { TabPane } = Tabs;

export default function Env() {
  const [bottomContentRef, bottomContentWidth] = useWidth<HTMLDivElement>();
  return (
    <div className="env-warp">
      <div className="env-tabs" ref={bottomContentRef}>
        <Tabs defaultActiveTab="1">
          <TabPane key="1" title="概况"></TabPane>
          <TabPane key="2" title="推荐">
            Content of Tab Panel 2
          </TabPane>
          <TabPane key="3" title="正在进行中">
            Content of Tab Panel 3
          </TabPane>
          <TabPane key="4" title="待办清单">
            Content of Tab Panel 4
          </TabPane>
          <TabPane key="5" title="知识">
            Content of Tab Panel 5
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
