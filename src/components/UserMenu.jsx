import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Settings,
  LogOut,
  User,
  Moon,
  Sun,
  Globe,
  ChevronDown,
} from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
];

const UserMenu = () => {
  const { t, i18n } = useTranslation();
  
  // Theme State moved here
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dim"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dim" ? "lemonade" : "dim");
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar placeholder"
      >
         <div className="bg-neutral text-neutral-content rounded-full w-10">
            <span className="text-xs">UI</span>
          </div>
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-60"
      >
        <li className="menu-title px-4 py-2">
            <div className="flex flex-col">
                <span className="font-bold text-base">User Name</span>
                <span className="text-xs opacity-50">user@example.com</span>
            </div>
        </li>
        <div className="divider my-0"></div>
        
        {/* Theme Toggle */}
        <li>
          <a onClick={toggleTheme} className="justify-between">
            <span className="flex items-center gap-2">
                {theme === "dim" ? <Moon size={16}/> : <Sun size={16}/>}
                {t("settings.theme")}
            </span>
            <span className="badge badge-sm">{theme === "dim" ? "Dark" : "Light"}</span>
          </a>
        </li>

        {/* Language Submenu (Simplified as detailed list for now or nested) */}
         <li>
            <details>
              <summary className="flex items-center gap-2">
                  <Globe size={16} />
                  {t("settings.language")}
              </summary>
              <ul>
                {languages.map((lng) => (
                  <li key={lng.code}>
                     <a 
                        className={i18n.language === lng.code ? "active" : ""}
                        onClick={() => changeLanguage(lng.code)}
                     >
                        <span className="mr-2">{lng.flag}</span> {lng.name}
                     </a>
                  </li>
                ))}
              </ul>
            </details>
        </li>

        <li>
          <Link to="/settings" className="flex items-center gap-2">
            <Settings size={16} />
            {t("nav.settings")}
          </Link>
        </li>
        
        <div className="divider my-0"></div>
        
        <li>
          <a className="text-error flex items-center gap-2">
            <LogOut size={16} />
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
