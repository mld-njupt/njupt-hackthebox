import { Layout, Grid, Avatar } from "@arco-design/web-react";
import { useFetch } from "../../utils/customHooks";
import UDTable from "../../components/UDTable/UDTable";
import { getRanking } from "../../api/rank";
import "./Ranking.sass";
import { useEffect } from "react";

const { Content } = Layout;
const { Row, Col } = Grid;

export default function Ranking() {
  const [[rankingData], getRankingData] = useFetch(getRanking());
  useEffect(() => {
    getRankingData();
  }, []);
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

      <div className="bottom-content">
        {rankingData && <UDTable data={rankingData}></UDTable>}
      </div>
    </Layout>
  );
}
