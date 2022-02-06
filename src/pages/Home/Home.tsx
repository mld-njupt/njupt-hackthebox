// @ts-nocheck
import { useState, useCallback } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Message,
} from "@arco-design/web-react";
import {
  IconDesktop,
  IconCalendar,
  IconCaretRight,
  IconCaretLeft,
} from "@arco-design/web-react/icon";
import IconAbout from "../../assets/images/icons/About.svg";
import IconDashboard from "../../assets/images/icons/Dashboard.svg";
import IconEnv from "../../assets/images/icons/Env.svg";
import IconOnline from "../../assets/images/icons/Online.svg";
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;
const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const handleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);
  return (
    <div className="home-warp">
      <Layout
        className="layout-collapse-demo"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Sider
          collapsed={collapsed}
          onCollapse={handleCollapsed}
          collapsible
          trigger={collapsed ? <IconCaretRight /> : <IconCaretLeft />}
          breakpoint="xl"
        >
          <div className="logo" />
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
              首页/Dashboard
            </MenuItem>
            <MenuItem
              key="Env"
              style={{ display: "flex", alignItems: "center" }}
            >
              <IconEnv className="arco-icon" style={{ fontSize: "24px" }} />
              实操环境/Env
            </MenuItem>
            <MenuItem
              key="Online"
              style={{ display: "flex", alignItems: "center" }}
            >
              <IconOnline className="arco-icon" style={{ fontSize: "24px" }} />
              线上对战/Online
            </MenuItem>
            <MenuItem
              key="About"
              style={{ display: "flex", alignItems: "center" }}
            >
              <IconAbout className="arco-icon" style={{ fontSize: "24px" }} />
              运营/About
            </MenuItem>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ paddingLeft: 20 }}>Header</Header>
          <Layout style={{ paddingLeft: 20 }}>
            <Content>Content</Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};
export default Home;
