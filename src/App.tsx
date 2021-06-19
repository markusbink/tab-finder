import * as React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import "./App.css";
import { GroupActionBar } from "./components/GroupActionBar";
import { TabHeader } from "./components/TabHeader";
import { TabList } from "./components/TabList";
import { TabSearchInput } from "./components/TabSearchInput";
import { useTabContext } from "./contexts/TabContext";

const App: React.FC = () => {
    const { setIsGroupActionBarVisible, selectedTabs, tabs, setTabs } =
        useTabContext();
    const [searchTerm, setSearchTerm] = React.useState<string>("");

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

    const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Function to change the order of a list based on previous and new location
    const reorder = (
        tabs: chrome.tabs.Tab[],
        startIndex: number,
        endIndex: number
    ) => {
        const result = Array.from(tabs);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result: DropResult) => {
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
        chrome.tabs.query({ index: result.source.index }, (tabs) => {
            if (!tabs) {
                return;
            }
            const tabId: number = tabs[0].id!;
            chrome.tabs.move(tabId, { index: result.destination?.index! });
        });
    };

    return (
        <div className="App">
            <TabHeader />
            <TabSearchInput
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onInputChanged={onInputChanged}
            />
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable droppableId="tab-tabs" key="tab-list">
                    {(provided) => (
                        <TabList
                            provided={provided}
                            tabs={tabs.filter((tab) =>
                                tab
                                    .title!.toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                            )}
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
