import * as React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import "./App.css";
import { GroupActionBar } from "./components/GroupActionBar";
import { TabHeader } from "./components/TabHeader";
import { TabList } from "./components/TabList";
import { TabSearchInput } from "./components/TabSearchInput";
import { useTabContext } from "./contexts/TabContext";
import Helper from "./helpers/Helper";

const App: React.FC = () => {
    const {
        tabs,
        setTabs,
        searchTerm,
        setIsGroupActionBarVisible,
        selectedTabs,
    } = useTabContext();

    const denyAction = () => {
        setIsGroupActionBarVisible(false);
    };

    const groupHighlightedTabs = (tabIds: number[]) => {
        chrome.tabs.group({ tabIds: tabIds });
    };

    const successAction = () => {
        setIsGroupActionBarVisible(false);
        groupHighlightedTabs(selectedTabs);
    };

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
        <div className="App">
            <TabHeader />
            <TabSearchInput />
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable droppableId="tab-tabs" key="tab-list">
                    {(provided) => (
                        <TabList
                            provided={provided}
                            tabs={Helper.filterTabsByTerm(tabs, searchTerm)}
                        />
                    )}
                </Droppable>
            </DragDropContext>
            <GroupActionBar
                denyTitle="Cancel"
                successTitle="Group"
                denyAction={denyAction}
                successAction={successAction}
            />
        </div>
    );
};

export default App;
