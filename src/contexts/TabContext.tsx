import React, {createContext, useContext, useEffect, useState} from "react";


interface ITabContext {
    tabs: chrome.tabs.Tab[];
    setTabs: (tabs: chrome.tabs.Tab[]) => void;
    tabCount: number;
    setTabCount: (count: number) => void;
}

export const TabContext = createContext<ITabContext>({
    tabs: [],
    setTabs: () => {},
    tabCount: 0,
    setTabCount: () => {}
});

interface TabContextProviderProps {
    children: React.ReactNode;
}

export const TabContextProvider: React.FC<TabContextProviderProps> = ({children}) => {
    const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
    const [tabCount, setTabCount] = useState<number>(0);

    useEffect(() => {
        chrome.tabs.query({}, tabs => {
          setTabCount(tabs.length);
          setTabs(tabs);
        });
    
        const redrawAnimation = (info: chrome.runtime.PlatformInfo) => {
          if (info.os === 'mac') {
            const fontFaceSheet = new CSSStyleSheet()
            fontFaceSheet.insertRule(`
              @keyframes redraw {
                0% {
                  opacity: 1;
                }
                100% {
                  opacity: .99;
                }
              }
            `)
            fontFaceSheet.insertRule(`
              html {
                animation: redraw 1s linear infinite;
              }
            `)
            //@ts-ignore
            document.adoptedStyleSheets = [
              //@ts-ignore
              ...document.adoptedStyleSheets,
              fontFaceSheet,
            ]
          }
        }
    
      /**
       * Temporary workaround for secondary monitors on MacOS where redraws don't happen
       * @See https://bugs.chromium.org/p/chromium/issues/detail?id=971701
       * Solution from: https://stackoverflow.com/questions/56500742/why-is-my-google-chrome-extensions-popup-ui-laggy-on-external-monitors-but-not
       */
      if (
        // From testing the following conditions seem to indicate that the popup was opened on a secondary monitor
        window.screenLeft < 0 ||
        window.screenTop < 0 ||
        window.screenLeft > window.screen.width ||
        window.screenTop > window.screen.height
      ) {
        chrome.runtime.getPlatformInfo((info) => redrawAnimation(info));
      }}, []);

    return (
        <TabContext.Provider value={{tabs, setTabs, tabCount, setTabCount}}>
            {children}
        </TabContext.Provider>
    )
}

export const useTabContext = () => useContext(TabContext);