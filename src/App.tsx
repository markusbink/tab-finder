import * as React from "react";
import "./App.css";
import { GroupActionBar } from "./components/GroupActionBar";
import { NoTabsFound } from "./components/NoTabsFound";
import { TabHeader } from "./components/TabHeader";
import { TabList } from "./components/TabList";
import { TabSearchInput } from "./components/TabSearchInput";
import { useTabContext } from "./contexts/TabContext";
import Helper from "./helpers/Helper";

const App: React.FC = () => {
    const {
        tabs,
        searchTerm,
        setIsGroupActionBarVisible,
        selectedTabs,
    } = useTabContext();

    const filteredTabs = Helper.filterTabsByTerm(tabs, searchTerm);

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
            <TabSearchInput />
            {filteredTabs.length > 0 ? <TabList tabs={filteredTabs}/> : <NoTabsFound/>}
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
