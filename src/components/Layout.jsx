import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Cloud,
  Sprout,
  Bell,
  Settings as SettingsIcon,
  Menu,
  X,
  Sun,
  Moon,
  Bug,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";
import ToastContainer from "./ToastContainer.jsx";
import NotificationBell from "./NotificationBell.jsx";
import UserMenu from "./UserMenu.jsx";
import { useTranslation } from "react-i18next";

const Layout = ({ children }) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const unreadCount = useSelector((state) => state.advisories.unreadCount);
  // Theme state moved to UserMenu

  const navItems = [
    { path: "/", label: t("nav.dashboard"), icon: Home },
    { path: "/weather", label: t("nav.weather"), icon: Cloud },
    { path: "/crops", label: t("nav.crops"), icon: Sprout },
    {
      path: "/advisories",
      label: t("nav.advisories"),
      icon: Bell,
      badge: unreadCount,
    },
    { path: "/pest-detection", label: t("nav.pestDetection"), icon: Bug },
    { path: "/forum", label: t("nav.community"), icon: Users },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-lg px-4 gap-4">
        <div className="navbar-start w-auto">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </label>
          </div>
          <Link to="/" className="btn btn-ghost text-xl px-2">
            🌾 ClimateSmart
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex flex-1 justify-center">
            {/* Centered Navigation for cleaner look */}
          <ul className="menu menu-horizontal px-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 ${location.pathname === item.path ? "active font-bold" : "opacity-80 hover:opacity-100"}`}
                  >
                    <Icon size={18} />
                    {item.label}
                    {item.badge && item.badge > 0 && (
                      <span className="badge badge-sm badge-error">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="navbar-end w-auto flex gap-2">
          <NotificationBell />
          <UserMenu />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-base-100 shadow">
          <ul className="menu p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 py-3 ${location.pathname === item.path ? "active" : ""}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon size={20} />
                    {item.label}
                    {item.badge && item.badge > 0 && (
                      <span className="badge badge-sm badge-primary ml-auto">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">{children}</main>

      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>
            {t("app.footer", { year: new Date().getFullYear() })}
          </p>
        </aside>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default Layout;
