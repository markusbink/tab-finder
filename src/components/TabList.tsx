import * as React from "react";
import { TabItem } from "./TabItem";
import { DragDropContext, Draggable, Droppable, DroppableProvided, DropResult } from "react-beautiful-dnd";
import { useTabContext } from "../contexts/TabContext";

interface TabListProps {
    tabs: chrome.tabs.Tab[];
}

export const TabList: React.FC<TabListProps> = ({ tabs }) => {
    const {setTabs} = useTabContext();

    // Function to change the order of a list based on previous and new location
    const reorder = (
        list: chrome.tabs.Tab[],
        startIndex: number,
        endIndex: number
    ): chrome.tabs.Tab[] => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = async (result: DropResult): Promise<void> => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            tabs,
            result.source.index,
            result.destination.index
        );

        // Update state with new order
        setTabs(items);

        // Change order of tabs based on Drag and Drop change
        const changedTabs = await chrome.tabs.query({ index: result.source.index });
        if (!changedTabs) {
            return;
        }

        const tabId: number = changedTabs[0].id!;
        chrome.tabs.move(tabId, { index: result.destination?.index! });
    };
    
    return (
        // Make tab groups lay on top of one another like a deck of cards
        // Add differenct colours for different groups
        // Make a range selection for groups
        // Make groups unselectable
        // Sort tabs alphabetically based on source url
        // Persist state through chrome.storage API

        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Droppable droppableId="tab-tabs" key="tab-list">
            {(provided) => (
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
            )}
        </Droppable>
    </DragDropContext>


        
    );
};
