import * as React from "react";
import { MoonStars, Sun } from "phosphor-react";
import { TabActionBtn } from "../TabButtons/TabActionBtn";
import { useTheme } from "../../hooks/useTheme";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../store/actions";
import { AppState } from "../../store/types";

export const ToggleThemeBtn: React.FC = () => {
  const dispatch = useDispatch();
  const styledTheme = useTheme();
  const theme = useSelector((store: AppState) => store.theme);

  const toggleTheme = () => {
    switch (theme) {
      case "dark":
        dispatch(setTheme("light"));
        chrome.storage.sync.set({ theme: "light" });
        break;
      case "light":
        dispatch(setTheme("dark"));
        chrome.storage.sync.set({ theme: "dark" });
        break;
      default:
        dispatch(setTheme("dark"));
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
