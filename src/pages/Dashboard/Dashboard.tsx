import { Carousel, Tabs } from "@arco-design/web-react";
import "./Dashboard.scss";
const { TabPane } = Tabs;

const Dashboard = () => {
  const carouselImg = [
    "https://www.hackthebox.com/storage/banners/9bf31c7ff062936a96d3c8bd1f8f2ff3.jpg",
    "https://www.hackthebox.com/storage/banners/5f93f983524def3dca464469d2cf9f3e.jpg",
    "https://www.hackthebox.com/storage/banners/2723d092b63885e0d7c260cc007e8b9d.jpg",
    "https://www.hackthebox.com/storage/banners/c9e1074f5b3f9fc8ea15d152add07294.jpg",
    "https://www.hackthebox.com/storage/banners/65b9eea6e1cc6bb9f0cd2a47751a186f.jpg",
    "https://www.hackthebox.com/storage/banners/a3c65c2974270fd093ee8a9bf8ae7d0b.jpg",
    "https://www.hackthebox.com/storage/banners/a97da629b098b75c294dffdc3e463904.jpg",
  ];
  return (
    <div className="dashboard-wrap">
      <div className="dashboard-header">
        <div className="left">
          <div className="announcement header-item">
            <span className="title">公告</span>
            <span className="link-box">
              Hacking Battlegrounds Live #4 - Hacking Will Tear Us Apart!
            </span>
          </div>
        </div>
        <div className="right">
          <div className="changelog header-item">
            <span className="title">更新日志</span>
            <span className="link-box">Version 3.18.0</span>
          </div>
          <div className="player header-item">
            <span className="title">在线玩家</span>
            <span className="link-box">586 Players Online</span>
          </div>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="top-content">
          <div className="carousel-wrap">
            <Carousel
              autoPlay
              animation="fade"
              showArrow="never"
              indicatorType="line"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {carouselImg.map((src, index) => (
                <div key={index} style={{ width: "100%" }}>
                  <img
                    src={src}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "12px",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="userInfo-wrap">
            <div>
              <div className="icon-wrap">
                <div className="icon-img">
                  <div className="icon"></div>
                </div>
                <div className="icon-msg"></div>
              </div>
            </div>
            <div className="userInfo-item2"></div>
            <div></div>
            <div></div>
            <div className="userInfo-item5"></div>
          </div>
        </div>
        <div className="bottom-content">
          <Tabs defaultActiveTab="1">
            <TabPane key="1" title="Tab 1">
              Content of Tab Panel 1
            </TabPane>
            <TabPane key="2" title="Tab 2">
              Content of Tab Panel 2
            </TabPane>
            <TabPane key="3" title="Tab 3">
              Content of Tab Panel 3
            </TabPane>
          </Tabs>
          ,
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
