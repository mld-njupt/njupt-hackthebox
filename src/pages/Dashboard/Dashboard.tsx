import "./Dashboard.scss";
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
    </div>
  );
};
export default Dashboard;
