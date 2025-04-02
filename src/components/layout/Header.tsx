import { Link, NavLink } from "react-router-dom";
import { ConfigProvider } from "antd";
import { HomeOutlined, UserOutlined, FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import "../../styles/components/Header.css";

function Header() {

  return (
    <ConfigProvider>
      <div className="Header">
        <div className="container">
          <Link to="/">
            <img src="/imgs/logo.svg" alt="Logo" className="Header__logo" />
          </Link>
          <div className="Header__links">
            <NavLink to="/" className="Header__link">
              <HomeOutlined style={{ transition: "all 0.2s ease-in-out" }} className="Header__icon" />
              <p><img src="/icons/home.svg" alt="home" /></p>
            </NavLink>
            <NavLink to="/customers" className="Header__link">
              <UserOutlined style={{ transition: "all 0.2s ease-in-out" }} className="Header__icon" />
              <p><img src="/icons/customers.svg" alt="customers" /></p>
            </NavLink>
            <NavLink to="/reports" className="Header__link">
              <FileTextOutlined style={{ transition: "all 0.2s ease-in-out" }} className="Header__icon" />
              <p><img src="/icons/report.svg" alt="report" /></p>
            </NavLink>
            <NavLink to="/settings" className="Header__link">
              <SettingOutlined style={{ fontSize: "18px", transition: "all 0.2s ease-in-out" }} className="Header__icon" />
              <p><img src="/icons/settings.svg" alt="settings" /></p>
            </NavLink>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Header;
