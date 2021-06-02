import * as React from "react";
import { TabItem } from "./TabItem";

interface TabListProps {
    tabs: chrome.tabs.Tab[];
    setTabs: (tabs: chrome.tabs.Tab[]) => void;
    setTabCount: (tabCount: number) => void;
}

export const TabList: React.FC<TabListProps> = ({tabs, setTabs, setTabCount}) => {

    return (
        <ul className="tab-list">
      {tabs.map((tab: chrome.tabs.Tab) => (
          <TabItem tab={tab} setTabs={setTabs} setTabCount={setTabCount}/>
      ))}
      </ul>
    )

}