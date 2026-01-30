import React from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.activeElement?.blur(); // Close dropdown after selection
  };



  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <Globe size={20} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li className="menu-title px-4 py-2 opacity-50 text-xs uppercase tracking-wider">
          Language
        </li>
        {languages.map((lng) => (
          <li key={lng.code}>
            <button
              className={`flex items-center gap-2 ${i18n.language === lng.code ? "active" : ""}`}
              onClick={() => changeLanguage(lng.code)}
            >
              <span className="text-lg">{lng.flag}</span>
              {lng.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
