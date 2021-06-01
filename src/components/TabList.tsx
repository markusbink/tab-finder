import * as React from "react";
import { TabItem } from "./TabItem";

interface TabListProps {
    tabs: Tab[];
}

export const TabList: React.FC<TabListProps> = ({tabs}) => {

    return (
        <ul className="tab-list">
      {tabs.map((tab: Tab) => (
          <TabItem tab={tab}/>
      ))}
      </ul>
    )

}