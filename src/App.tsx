import React, {useEffect, useState} from 'react';
import './App.css';
import { TabHeader } from './components/TabHeader';
import { TabList } from './components/TabList';
import { TabContextProvider } from './contexts/TabContext';

const App: React.FC = () => {


  return (
    <TabContextProvider>
    <div className="App">
      <TabHeader/>
        <TabList/>
    </div>
    </TabContextProvider>
  );
}

export default App;
