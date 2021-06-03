import * as React from "react";
import { useTabContext } from "../contexts/TabContext";
import { TabItem } from "./TabItem";

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