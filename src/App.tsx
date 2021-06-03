import React from "react";
import "./App.css";
import { GroupActionBar } from "./components/GroupActionBar";
import { TabHeader } from "./components/TabHeader";
import { TabList } from "./components/TabList";
import { useTabContext } from "./contexts/TabContext";

const App: React.FC = () => {
    const { setIsGroupActionBarVisible, selectedTabs } = useTabContext();

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

    return (
        <div className="App">
            <TabHeader />
            <TabList />
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
