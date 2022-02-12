import { dashboardCardInterface } from "../../utils/interfaces";
import "./DashboardCard.scss";
const DashboardCard = (props: dashboardCardInterface) => {
  const { title, src, msg } = props;
  return (
    <div className="dashboard-card-wrap">
      <img src={src} className="card-img" />
      <div className="card-title"></div>
      <div className="card-msg"></div>
    </div>
  );
};
export default DashboardCard;
