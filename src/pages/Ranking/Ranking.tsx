import { useEffect, useState } from "react";
import { Layout, Grid, Avatar } from "@arco-design/web-react";
import { useFetch } from "../../utils/customHooks";
import UDTable from "../../components/UDTable/UDTable";
import Loading from "../../components/Loading/Loading";
import { getRanking } from "../../api/rank";
import "./Ranking.sass";

const { Content } = Layout;
const { Row, Col } = Grid;

export default function Ranking() {
  const [[rankingData], getRankingData] = useFetch(getRanking());
  const [pagination, setPagination] = useState({
    sizeCanChange: true,
    showTotal: true,
    total: 96,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
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
        {rankingData ? (
          <UDTable pagination={pagination} data={rankingData}></UDTable>
        ) : (
          <Loading></Loading>
        )}
      </div>
    </Layout>
  );
}
