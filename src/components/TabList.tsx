import * as React from "react";
import { TabItem } from "./TabItem";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";

interface TabListProps {
    tabs: chrome.tabs.Tab[];
    provided: DroppableProvided;
}

export const TabList: React.FC<TabListProps> = ({ tabs, provided }) => {
    return (
        // Make tab groups lay on top of one another like a deck of cards
        // Add differenct colours for different groups
        // Make a range selection for groups
        // Make groups unselectable
        // Sort tabs alphabetically based on source url
        // Persist state through chrome.storage API
        // Add X to search input to clear current search
        <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="tab-list">
            {tabs.map((tab: chrome.tabs.Tab, index: number) => (
                <Draggable key={tab.id} draggableId={tab.id + ""} index={index}>
                    {(provided) => (
                        <TabItem provided={provided} key={tab.id} tab={tab} />
                    )}
                </Draggable>
            ))}
        </ul>
    );
};
