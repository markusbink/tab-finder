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

  function truncate(text: string, length: number){
    return (text.length > length) ? text.substr(0, length-1) + '...' : text;
  };

    return (
        <li onClick={() => goToTab(tab.index)}className="tab-item">
          {tab.favIconUrl ? (
            <img src={tab.favIconUrl}/>
          ) : (
            <span className="img-placeholder"></span>
          )}
          <h4>{truncate(tab.title, 35)}</h4>
        </li>
    )
}