import { dashboardCardInterface } from "../../utils/interfaces";
import "./DashboardCard.scss";
const DashboardCard = (props: dashboardCardInterface) => {
  const { title, src, msg, style } = props;
  return (
    <div className="dashboard-card-wrap" style={style}>
      <img src={src} className="card-img" alt="" />
      <div className="card-title">{title}</div>
      <div className="card-msg">{msg}</div>
    </div>
  );
};
export default DashboardCard;
