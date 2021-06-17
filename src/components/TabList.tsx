import * as React from "react";
import { TabItem } from "./TabItem";
import { useTabContext } from "../contexts/TabContext";
import { List, arrayMove } from "react-movable";

interface TabListProps {
    tabs: chrome.tabs.Tab[];
}

export const TabList: React.FC<TabListProps> = ({ tabs }) => {
    const { setTabs } = useTabContext();

    const onTabItemMoved = (oldIndex: number, newIndex: number) => {
        setTabs(arrayMove(tabs, oldIndex, newIndex));
        chrome.tabs.query({ index: oldIndex }, (tabs) => {
            if (!tabs) {
                return;
            }
            const tabId: number = tabs[0].id!;
            chrome.tabs.move(tabId, { index: newIndex });
        });
    };

    return (
        // Make tab groups lay on top of one another like a deck of cards
        // Make a range selection for groups
        // Make groups unselectable
        // Add differenct colours for different groups
        // Persist state
        // Add X to search input
        <List
            values={tabs}
            onChange={({ oldIndex, newIndex }) =>
                onTabItemMoved(oldIndex, newIndex)
            }
            renderList={({ children, props }) => (
                <ul className="tab-list" {...props}>
                    {children}
                </ul>
            )}
            renderItem={({ value, props }) => (
                <TabItem {...props} tab={value} />
            )}
        />
    );
};
