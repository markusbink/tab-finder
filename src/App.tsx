import React, {useEffect, useState} from 'react';
import './App.css';

interface Tab {
  active: boolean;
  audible: boolean;
  favIconUrl: string;
  groupId: number;
  highlighted: boolean;
  id: number;
  incognito: number;
  index: number;
  pinned: boolean;
  selected: boolean;
  status: string;
  title: string;
  url: string;
  width: number;
  windowId: number;
}

function App() {

  const [tabCount, setTabCount] = useState<number>(0);
  const [tabs, setTabs] = useState<Tab[] | any>([]);

  useEffect(() => {
    chrome.tabs.query({}, tabs => {
      setTabCount(tabs.length);
      setTabs(tabs);
      console.log(tabs);
    });

  }, []);


  /**
   * Goes to selected tab based on index
   * @param index Index of to be opened tab
   */
  const goToTab = (index: number): void => {
    chrome.tabs.highlight({'tabs': index}, function() {});
  }
  

  return (
    <div className="App">
      <div className="header">
        <h2>Tab-Finder</h2>
        <p>Your one stop shop for managin your tabs.</p>
      </div>
      <div className="tab-count-wrapper">
          <h4>You currently have <span className="tab-count">{tabCount}</span> tabs open</h4>
        </div>
      <div className="content">
      <ul className="tab-list">
      {tabs.map((tab: Tab) => (
        <li onClick={() => goToTab(tab.index)}className="tab-item">
          {tab.favIconUrl ? (
            <img src={tab.favIconUrl}/>
          ) : (
            <span className="img-placeholder"></span>
          )}
          <h4>{tab.title}</h4>
        </li>
      ))}
      </ul>
      </div>
    </div>
  );
}

export default App;
