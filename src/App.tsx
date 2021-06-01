import React, {useEffect, useState} from 'react';
import './App.css';
import { TabHeader } from './components/TabHeader';
import { TabList } from './components/TabList';

const App: React.FC = () => {

  const [tabCount, setTabCount] = useState<number>(0);
  const [tabs, setTabs] = useState<Tab[] | any>([]);

  useEffect(() => {
    chrome.tabs.query({}, tabs => {
      setTabCount(tabs.length);
      setTabs(tabs);
      console.log(tabs);
    });

  }, []);

  return (
    <div className="App">
      <TabHeader count={tabCount}/>
        <TabList tabs={tabs}/>
    </div>
  );
}

export default App;
