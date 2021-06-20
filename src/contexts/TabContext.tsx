import * as React from "react";
import Tab from "../helpers/Tab";

interface ITabContext {
    tabs: chrome.tabs.Tab[];
    setTabs: React.Dispatch<React.SetStateAction<chrome.tabs.Tab[]>>;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    tabCount: number;
    setTabCount: (count: number) => void;
    selectedTabs: number[];
    setSelectedTabs: (tabIds: number[]) => void;
}

export const TabContext = React.createContext<ITabContext>({
    tabs: [],
    setTabs: () => {},
    searchTerm: "",
    setSearchTerm: () => {},
    tabCount: 0,
    setTabCount: () => {},
    selectedTabs: [],
    setSelectedTabs: () => {},
});

interface TabContextProviderProps {
    children: React.ReactNode;
}

export const TabContextProvider: React.FC<TabContextProviderProps> = ({
    children,
}) => {
    const [tabs, setTabs] = React.useState<chrome.tabs.Tab[]>([]);
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [tabCount, setTabCount] = React.useState<number>(0);
    const [selectedTabs, setSelectedTabs] = React.useState<number[]>([]);

    React.useEffect(() => {

        (async() => {
            const currentTabs: chrome.tabs.Tab[] = await Tab.getTabs();
            setTabCount(currentTabs.length);
            setTabs(currentTabs);
        })();
       
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
    }, [tabs]);

    return (
        <TabContext.Provider
            value={{
                tabs,
                setTabs,
                searchTerm,
                setSearchTerm,
                tabCount,
                setTabCount,
                selectedTabs,
                setSelectedTabs,
            }}>
            {children}
        </TabContext.Provider>
    );
};

export const useTabContext = (): ITabContext => React.useContext(TabContext);