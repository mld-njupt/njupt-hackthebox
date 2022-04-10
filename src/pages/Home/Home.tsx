// @ts-nocheck
import { useEffect } from "react";
import { Layout, Menu, Notification, Dropdown } from "@arco-design/web-react";
import { IconDown } from "@arco-design/web-react/icon";
import { useNavigate, Outlet } from "react-router-dom";
import { useFetch } from "../../utils/customHooks";
import { getSessionApi, logoutApi } from "../../api/user";
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
  const [[session], getSession] = useFetch(getSessionApi());
  const [[logoutData], logout] = useFetch(logoutApi());
  useEffect(() => {
    getSession();
    // navigate("/dashboard");
  }, []);
  useEffect(() => {
    if (session && session.code === 200) {
    } else if (session && session.code !== 200) {
      session && Notification.error({ title: "Error", content: "请先登录" });
      navigate("/login");
    }
  }, [session]);
  useEffect(() => {
    if (logoutData && logoutData.code === 200) {
      Notification.success({ title: "Success", content: "退出成功" });
      navigate("/login");
    } else if (logoutData && logoutData.code !== 200) {
      logoutData && Notification.error({ title: "Error", content: "退出失败" });
      navigate("/login");
    }
  }, [logoutData]);
  const dropList = (
    <Menu
      style={{
        background: "#1a2332",
        border: "none",
        boxShadow: "0px 0px 2px black",
      }}
    >
      <MenuItem style={{ background: "#1a2332", color: "#9fef00" }}>
        成为Vip
      </MenuItem>
      <MenuItem style={{ background: "#1a2332" }}>修改用户信息</MenuItem>
      <MenuItem onClick={logout} style={{ background: "#1a2332" }}>
        注销登录
      </MenuItem>
    </Menu>
  );
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
          <div className="header-wrap">
            <div className="logo">0xGame & X1cT34m.com</div>
            <Dropdown.Button
              className="header-dropdown"
              type="primary"
              droplist={dropList}
              icon={<IconDown />}
            >
              {session && session.data.username}
            </Dropdown.Button>
          </div>
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
                key="/ranking"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconOnline
                  className="arco-icon"
                  style={{ fontSize: "24px" }}
                />
                实时排名/Ranking
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
