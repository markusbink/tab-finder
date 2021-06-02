import React, {useState, useEffect} from "react";
import { Close } from "../assets/icons/Close";
import { SpeakerOff } from "../assets/icons/SpeakerOff";
import { SpeakerOn } from "../assets/icons/SpeakerOn";

interface TabItemProps {
    tab: chrome.tabs.Tab;
    setTabs: (tabs: chrome.tabs.Tab[]) => void;
    setTabCount: (tabCount: number) => void;
}

export const TabItem: React.FC<TabItemProps> = ({tab, setTabs, setTabCount}) => {

  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    chrome.tabs.get(tab.id!, async (currentTab) => {
      const muted = currentTab.mutedInfo?.muted;
      setIsMuted(() => !!muted);
    });;
  }, [])

    /**
   * Goes to selected tab based on index
   * @param index Index of to be opened tab
   */
  const goToTab = (index: number): void => {
    chrome.tabs.highlight({'tabs': index}, function() {});
  }

  const toggleAudio = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tabId: number): void => {
    e.stopPropagation();
    chrome.tabs.get(tabId, async (tab) => {
      const muted = !tab.mutedInfo?.muted;
      await chrome.tabs.update(tabId, { muted });
      setIsMuted(() => muted);
    });
  }

  const closeTab = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tabId: number): void => {
    e.stopPropagation();
    // Remove tab from browser
    chrome.tabs.remove(tabId);
    // Update UI in extension popup
    chrome.tabs.query({}, (tabs) => {
      setTabs(tabs.filter(tab => tab.id != tabId));
      setTabCount((tabs.filter(tab => tab.id != tabId)).length);
    });
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
          <h4>{truncate(tab.title!, 35)}</h4>
          <div className="actions">
            <div onClick={(e) => toggleAudio(e, tab.id!)} className="action audio">
              {isMuted ?? !tab.audible ? <SpeakerOff/> : <SpeakerOn/>}
            </div>
            <div onClick={(e) => closeTab(e, tab.id!)} className="action close">
              <Close/>
            </div>
          </div>
        </li>
    )
}