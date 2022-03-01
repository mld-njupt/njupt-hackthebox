import { Layout, Grid, Avatar, Tabs } from "@arco-design/web-react";
import ScollView from "../../components/Scollview/ScollView";
import "./Ranking.sass";

const { Header, Content } = Layout;
const { Row, Col } = Grid;
const { TabPane } = Tabs;

export default function Ranking() {
  return (
    <Layout style={{ color: "white" }}>
      <Row align="center" className="header">
        <Col flex="auto" className="header-title">
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>Rankings</span>
          <span className="secondary">
            Hack The Box rankings throughout the platform
          </span>
        </Col>
        <Col flex="250px" className="global-rank">
          <Avatar>A</Avatar>
          <div className="rank-detail">
            <span className="rank">#unranked</span>
            <span className="secondary">GLOBAL RANKING</span>
          </div>
        </Col>
      </Row>
      <Content>
      <div className="bottom-content">
          <Tabs defaultActiveTab="1">
            <TabPane key="1" title="概况">
              Tab1
            </TabPane>
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
      </Content>
    </Layout>
  );
}
