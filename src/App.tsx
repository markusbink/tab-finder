import React, { ChangeEventHandler, useState } from "react";
import "./App.css";
import { GroupActionBar } from "./components/GroupActionBar";
import { TabHeader } from "./components/TabHeader";
import { TabList } from "./components/TabList";
import { useTabContext } from "./contexts/TabContext";

const App: React.FC = () => {
    const { setIsGroupActionBarVisible, selectedTabs, tabs } = useTabContext();
    const [searchTerm, setSearchTerm] = useState<string>("");

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

    const onInputChanged = (event: any) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="App">
            <TabHeader />
            <div className="search-wrapper">
                <input
                    onChange={onInputChanged}
                    className="search"
                    type="text"
                    placeholder="What tab are you looking for?"
                />
            </div>
            <TabList
                tabs={tabs.filter((tab) =>
                    tab.title!.toLowerCase().includes(searchTerm.toLowerCase())
                )}
            />
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
