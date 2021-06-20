import * as React from "react";
import "./App.css";
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
    } = useTabContext();

    const filteredTabs = Helper.filterTabsByTerm(tabs, searchTerm);

    return (
        <div className="App">
            <TabHeader />
            <TabSearchInput />
            {filteredTabs.length > 0 ? <TabList tabs={filteredTabs}/> : <NoTabsFound/>}
        </div>
    );
};

export default App;
