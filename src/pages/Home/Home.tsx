// @ts-nocheck
import { useEffect } from "react";
import { Layout, Menu, Notification } from "@arco-design/web-react";
import { useNavigate, Outlet } from "react-router-dom";
import { useFetch } from "../../utils/customHooks";
import { getSessionApi } from "../../api/user";
import IconAbout from "../../assets/images/icons/About.svg";
import IconDashboard from "../../assets/images/icons/Dashboard.svg";
import IconEnv from "../../assets/images/icons/Env.svg";
import IconOnline from "../../assets/images/icons/Online.svg";
import "./Home.scss";
const MenuItem = Menu.Item;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Content = Layout.Content;
const Home = () => {
  const navigate = useNavigate();
  const handleCilckMenuItem = (key) => {
    navigate(key);
  };
  const [session, getSession] = useFetch(getSessionApi());
  useEffect(() => {
    if (session.code === 200) {
    } else if (session != null && session.code === 6000) {
      session && Notification.error({ title: "Error", content: "请先登录" });
      navigate("/login");
    }
  }, [session]);
  useEffect(() => {
    getSession();
    navigate("/dashboard");
  }, []);
  return (
    <div className="home-wrap">
      <Layout
        className="layout-collapse"
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
        <Header style={{ height: "62px" }}>
          <div className="logo">0xGame & X1cT34m.com</div>
        </Header>
        <Layout>
          <Sider breakpoint="xl">
            <Menu
              defaultSelectedKeys={["/dashboard"]}
              style={{ width: "100%" }}
              onClickMenuItem={handleCilckMenuItem}
            >
              <MenuItem
                key="/dashboard"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconDashboard
                  className="arco-icon"
                  style={{ fontSize: "24px", color: "#9fef00" }}
                />
                首页/Dashboard
              </MenuItem>
              <MenuItem
                key="/env"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconEnv className="arco-icon" style={{ fontSize: "24px" }} />
                实操环境/Env
              </MenuItem>
              <MenuItem
                key="/online"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconOnline
                  className="arco-icon"
                  style={{ fontSize: "24px" }}
                />
                线上对战/Online
              </MenuItem>
              <MenuItem
                key="/about"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconAbout className="arco-icon" style={{ fontSize: "24px" }} />
                运营/About
              </MenuItem>
            </Menu>
          </Sider>
          <Content>
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default Home;
