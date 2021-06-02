import * as React from "react";
import { useTabContext } from "../contexts/TabContext";
import { TabItem } from "./TabItem";

const groupHighlightedTabs = () => {
    chrome.tabs.query({active: true}, tabs => {
      let tabsToGroup: number[] = [];
      for(let i = 0; i < tabs.length; i++) {
        tabsToGroup.push(tabs[i].id!);
      }
      chrome.tabs.group({tabIds: tabsToGroup});
    })
  }

export const TabList: React.FC = () => {
    const {tabs}= useTabContext();

    return (
        <ul className="tab-list">
      {tabs.map((tab: chrome.tabs.Tab) => (
          <TabItem tab={tab} />
      ))}
      </ul>
    )

}