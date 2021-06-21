import * as React from "react";
import { Moon } from "../assets/icons/Moon";
import { Sun } from "../assets/icons/Sun";
import { useTabContext } from "../contexts/TabContext";
import { colors } from "../styles/themes";
import { TabActionBtn } from "./TabActionBtn";

export const ToggleThemeBtn: React.FC = () => {
  const { theme, setTheme } = useTabContext();

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
      {theme === "dark" ? <Sun /> : <Moon />}
    </TabActionBtn>
  );
};
