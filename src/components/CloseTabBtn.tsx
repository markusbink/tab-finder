import React from "react";
import { Close } from "../assets/icons/Close";
import { useTabContext } from "../contexts/TabContext";

interface CloseTabBtnProps {
    tab: chrome.tabs.Tab;
}

export const CloseTabBtn: React.FC<CloseTabBtnProps> = ({ tab }) => {
    const { setTabs, setTabCount } = useTabContext();

    const closeTab = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        tabId: number
    ): void => {
        e.stopPropagation();
        // Remove tab from browser
        chrome.tabs.remove(tabId);
        // Update UI in extension popup
        chrome.tabs.query({}, (tabs) => {
            setTabs(tabs.filter((tab) => tab.id !== tabId));
            setTabCount(tabs.filter((tab) => tab.id !== tabId).length);
        });
    };

    return (
        <div onClick={(e) => closeTab(e, tab.id!)} className="action close">
            <Close />
        </div>
    );
};
