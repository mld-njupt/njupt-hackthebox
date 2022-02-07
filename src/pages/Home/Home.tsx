// @ts-nocheck
import { useState, useCallback } from "react";
import { Layout, Menu, Message } from "@arco-design/web-react";
import { Routes, Link, Route, Outlet } from "react-router-dom";
import { lazy } from "react";
import IconAbout from "../../assets/images/icons/About.svg";
import IconDashboard from "../../assets/images/icons/Dashboard.svg";
import IconEnv from "../../assets/images/icons/Env.svg";
import IconOnline from "../../assets/images/icons/Online.svg";
import "./Home.scss";
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;
const Home = () => {
  // const [collapsed, setCollapsed] = useState(false);
  // const handleCollapsed = useCallback(() => {
  //   setCollapsed(!collapsed);
  // }, [collapsed]);
  return (
    <div className="home-wrap">
      <Layout
        className="layout-collapse"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Header style={{ height: "62px" }}>
          <div className="logo" />
          Header
        </Header>
        <Layout>
          <Sider breakpoint="xl">
            <Menu
              defaultOpenKeys={["1"]}
              defaultSelectedKeys={["0_3"]}
              onClickMenuItem={(key) =>
                Message.info({ content: `You select ${key}`, showIcon: true })
              }
              style={{ width: "100%" }}
            >
              <MenuItem
                key="Dashboard"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconDashboard
                  className="arco-icon"
                  style={{ fontSize: "24px" }}
                />
                <Link to="/dashboard">首页/Dashboard</Link>
              </MenuItem>
              <MenuItem
                key="Env"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconEnv className="arco-icon" style={{ fontSize: "24px" }} />
                <Link to="/env">实操环境/Env</Link>
              </MenuItem>
              <MenuItem
                key="Online"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconOnline
                  className="arco-icon"
                  style={{ fontSize: "24px" }}
                />
                <Link to="/online">线上对战/Online</Link>
              </MenuItem>
              <MenuItem
                key="About"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconAbout className="arco-icon" style={{ fontSize: "24px" }} />
                <Link to="/about">运营/About</Link>
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
