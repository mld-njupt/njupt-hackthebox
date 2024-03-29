// @ts-nocheck
import { useEffect, useState } from "react";
import { Layout, Menu, Notification, Dropdown } from "@arco-design/web-react";
import { IconDown } from "@arco-design/web-react/icon";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useFetch } from "../../utils/customHooks";
import { getSessionApi, logoutApi, getUserInfoApi } from "../../api/user";
import { refreshUser } from "../../store/user";
import IconAbout from "../../assets/images/icons/About.svg";
import IconDashboard from "../../assets/images/icons/Dashboard.svg";
import IconEnv from "../../assets/images/icons/Env.svg";
import IconOnline from "../../assets/images/icons/Online.svg";
import IconProfile from "../../assets/images/icons/UserProfile.svg";
import "./Home.scss";

const MenuItem = Menu.Item;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Content = Layout.Content;

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState("dashboard");
  const [isRefresh, refresh] = useRecoilState(refreshUser);
  const [[session], getSession] = useFetch(getSessionApi());
  const [[logoutData], logout] = useFetch(logoutApi());
  const [[userInfo], getUserInfo] = useFetch(getUserInfoApi());

  useEffect(() => {
    getSession();
    getUserInfo();
    // navigate("/dashboard");
  }, [isRefresh]);
  useEffect(() => {
    if (session && session.code === 200) {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(session.data));
    } else if (session && session.code !== 200) {
      localStorage.removeItem("user");
      session && Notification.error({ title: "Error", content: "请先登录" });
      navigate("/login");
    }
  }, [session]);
  useEffect(() => {
    if (logoutData && logoutData.code === 200) {
      Notification.success({ title: "Success", content: "退出成功" });
      localStorage.removeItem("userType");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("user");
      navigate("/login");
    } else if (logoutData && logoutData.code !== 200) {
      logoutData && Notification.error({ title: "Error", content: "退出失败" });
      navigate("/login");
    }
  }, [logoutData]);
  useEffect(() => {
    if (userInfo && userInfo.code === 200) {
      localStorage.removeItem("userType");
      localStorage.removeItem("userInfo");
      localStorage.setItem("userType", "full");
      localStorage.setItem("userInfo", JSON.stringify(userInfo.data));
    } else {
      localStorage.removeItem("userType");
      localStorage.removeItem("userInfo");
    }
  }, [userInfo]);
  const handleCilckMenuItem = (key) => {
    navigate(key);
    setNavigation(key);
  };
  const dropList = (
    <Menu
      style={{
        background: "#1a2332",
        border: "none",
        boxShadow: "0px 0px 2px black",
      }}
    >
      <MenuItem
        onClick={() => {
          navigate("/fullRegister");
        }}
        style={{ background: "#1a2332", color: "#9fef00" }}
      >
        成为进阶用户
      </MenuItem>
      <MenuItem onClick={logout} style={{ background: "#1a2332" }}>
        注销登录
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    let match = location?.pathname;
    let matchArray = match.split("/");
    match ? setNavigation(matchArray[1]) : setNavigation("");
  }, [location]);

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
              {session && session.data?.username}
            </Dropdown.Button>
          </div>
        </Header>
        <Layout>
          <Sider breakpoint="xl">
            <Menu
              defaultSelectedKeys={["dashboard"]}
              selectedKeys={navigation}
              style={{ width: "100%" }}
              onClickMenuItem={handleCilckMenuItem}
            >
              <MenuItem
                key="dashboard"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconDashboard
                  className="arco-icon"
                  style={{ fontSize: "24px", color: "#9fef00" }}
                />
                首页
              </MenuItem>
              <MenuItem
                key="userprofile"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconProfile
                  className="arco-icon"
                  style={{ fontSize: "24px", color: "#9fef00" }}
                />
                个人中心
              </MenuItem>
              <MenuItem
                key="env"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconEnv className="arco-icon" style={{ fontSize: "24px" }} />
                实操环境
              </MenuItem>
              <MenuItem
                key="ranking"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconOnline
                  className="arco-icon"
                  style={{ fontSize: "24px" }}
                />
                实时排名
              </MenuItem>
              <MenuItem
                key="about"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconAbout className="arco-icon" style={{ fontSize: "24px" }} />
                运营
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
