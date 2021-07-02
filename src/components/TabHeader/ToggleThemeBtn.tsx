import * as React from "react";
import { MoonStars, Sun } from "phosphor-react";
import { useTabContext } from "../../contexts/TabContext";
import { TabActionBtn } from "../TabButtons/TabActionBtn";
import { useTheme } from "../../hooks/useTheme";

export const ToggleThemeBtn: React.FC = () => {
  const { theme, setTheme } = useTabContext();
  const styledTheme = useTheme();

  const toggleTheme = () => {
    switch (theme) {
      case "dark":
        setTheme("light");
        chrome.storage.sync.set({ theme: "light" });
        break;
      case "light":
        setTheme("dark");
        chrome.storage.sync.set({ theme: "dark" });
        break;
      default:
        setTheme("dark");
    }
  };

  return (
    <TabActionBtn background="transparent" onClick={() => toggleTheme()}>
      {theme === "dark" ? (
        <Sun size={32} color={styledTheme.text} />
      ) : (
        <MoonStars size={32} color={styledTheme.text} />
      )}
    </TabActionBtn>
  );
};
