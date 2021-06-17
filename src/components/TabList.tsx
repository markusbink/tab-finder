import * as React from "react";
import { useTabContext } from "../contexts/TabContext";
import { TabItem } from "./TabItem";

interface TabListProps {
    tabs: chrome.tabs.Tab[];
}

export const TabList: React.FC<TabListProps> = ({ tabs }) => {
    return (
        // Make tab groups lay on top of one another like a deck of cards
        // Make a range selection for groups
        // Make groups unselectable
        // Add differenct colours for different groups
        // Persist state
        <ul className="tab-list">
            {tabs.map((tab: chrome.tabs.Tab) => (
                <TabItem key={tab.id} tab={tab} />
            ))}
        </ul>
    );
};
