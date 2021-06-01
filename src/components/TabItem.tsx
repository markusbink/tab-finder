import * as React from "react";

interface TabItemProps {
    tab: Tab;
}

export const TabItem: React.FC<TabItemProps> = ({tab}) => {

    /**
   * Goes to selected tab based on index
   * @param index Index of to be opened tab
   */
  const goToTab = (index: number): void => {
    chrome.tabs.highlight({'tabs': index}, function() {});
  }

    return (
        <li onClick={() => goToTab(tab.index)}className="tab-item">
          {tab.favIconUrl ? (
            <img src={tab.favIconUrl}/>
          ) : (
            <span className="img-placeholder"></span>
          )}
          <h4>{tab.title}</h4>
        </li>
    )
}