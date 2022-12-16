import React from "react";
import { THEMES_LIST, useTheme } from "../../hooks/useTheme";

export const TheHero: React.FC<{
  showUserMenu: boolean;
  handleLogout: () => Promise<void>;
}> = ({ showUserMenu, handleLogout }) => {
  return (
    <div className="flex  items-center justify-center py-32 px-4 text-center">
      {showUserMenu && (
        <div className="phone-1 artboard absolute top-16 right-2 mt-2 flex flex-col justify-between rounded-lg bg-base-300 p-6">
          <div className="flex flex-col space-y-4">
            <button className="btn-secondary btn">1</button>
            <button className="btn-secondary btn">2</button>
          </div>
          <div className="flex items-center justify-between px-6">
            <ThemeHandler />
            <button className="btn-error btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">
          See (...ehm Read) What&apos;s happening in the World!
        </h1>
        <p className="py-6">
          T3 - News is free and the best place to stay informed
        </p>
      </div>
    </div>
  );
};

const ThemeHandler: React.FC = () => {
  const { setTheme } = useTheme();

  return (
    <div className="dropdown dropdown-top">
      <label tabIndex={0} className="btn-accent btn m-1">
        Theme
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box mb-6 w-52 overflow-y-scroll bg-base-100 p-2 shadow"
      >
        {THEMES_LIST.map((theme, index) => (
          <li key={index} onClick={() => setTheme(theme)}>
            <a>{theme}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
