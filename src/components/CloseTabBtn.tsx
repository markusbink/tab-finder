import React from "react";
import { Close } from "../assets/icons/Close";
import { useTabContext } from "../contexts/TabContext";
import Helper from "../helpers/Helper";

interface CloseTabBtnProps {
    tab: chrome.tabs.Tab;
}

export const CloseTabBtn: React.FC<CloseTabBtnProps> = ({ tab }) => {
    const { setTabs, setTabCount, searchTerm, setSearchTerm } = useTabContext();

    const closeTab = async (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        tabId: number
    ): Promise<void> => {
        e.stopPropagation();
        // Remove tab from browser
        await chrome.tabs.remove(tabId);
        // Update UI in extension popup
        await chrome.tabs.query({}, (tabs) => {
            setTabs(tabs.filter((tab) => tab.id !== tabId));
            setTabCount(tabs.filter((tab) => tab.id !== tabId).length);

            // Remove filtering if no more tabs match filter criterion
            if (!searchTerm) {
                return;
            }
            const filteredTabs = Helper.filterTabsByTerm(tabs, searchTerm);
            console.log(filteredTabs);

            if (filteredTabs.length === 0) {
                setSearchTerm("");
            }
        });
    };

    return (
        <div
            onClick={async (e) => await closeTab(e, tab.id!)}
            className="action close">
            <Close />
        </div>
    );
};
