import * as React from "react";
import { useEffect, useState } from "react";
import Tab from "../helpers/Tab";

interface ITabContext {
  lastSelected: number;
  setLastSelected: (index: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export interface ITab extends chrome.tabs.Tab {
  isSelected?: boolean;
}

export const TabContext = React.createContext<ITabContext>({
  lastSelected: -1,
  setLastSelected: () => {},
  theme: "dark",
  setTheme: () => {},
});

interface TabContextProviderProps {
  children: React.ReactNode;
}

function useStoredValue(initialValue: string) {
  const [theme, setTheme] = useState(initialValue);

  const loadTheme = async () => {
    // Set theme
    chrome.storage.sync.get(["theme"], async (result) => {
      if (!result.theme) {
        await chrome.storage.sync.set({ theme: "dark" });
      }
      setTheme(result.theme);
    });
  };

  useEffect(() => {
    loadTheme();
  }, []);

  return theme;
}

export const TabContextProvider: React.FC<TabContextProviderProps> = ({
  children,
}) => {
  const [lastSelected, setLastSelected] = React.useState<number>(-1);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    /**
     * Temporary workaround for secondary monitors on MacOS where redraws don't happen
     * @See https://bugs.chromium.org/p/chromium/issues/detail?id=971701
     * Solution from: https://stackoverflow.com/questions/56500742/why-is-my-google-chrome-extensions-popup-ui-laggy-on-external-monitors-but-not
     */
    const redrawAnimation = (info: chrome.runtime.PlatformInfo) => {
      if (info.os === "mac") {
        const fontFaceSheet = new CSSStyleSheet();
        fontFaceSheet.insertRule(`
              @keyframes redraw {
                0% {
                  opacity: 1;
                }
                100% {
                  opacity: .99;
                }
              }
            `);
        fontFaceSheet.insertRule(`
              html {
                animation: redraw 1s linear infinite;
              }
            `);
        //@ts-ignore
        document.adoptedStyleSheets = [
          //@ts-ignore
          ...document.adoptedStyleSheets,
          fontFaceSheet,
        ];
      }
    };

    if (
      // From testing the following conditions seem to indicate that the popup was opened on a secondary monitor
      window.screenLeft < 0 ||
      window.screenTop < 0 ||
      window.screenLeft > window.screen.width ||
      window.screenTop > window.screen.height
    ) {
      chrome.runtime.getPlatformInfo((info) => redrawAnimation(info));
    }
  }, []);

  return (
    <TabContext.Provider
      value={{
        lastSelected,
        setLastSelected,
        theme,
        setTheme,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = (): ITabContext => {
  return React.useContext(TabContext);
};
