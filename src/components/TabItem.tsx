import React, {useState, useEffect} from "react";
import { Close } from "../assets/icons/Close";
import { SpeakerOff } from "../assets/icons/SpeakerOff";
import { SpeakerOn } from "../assets/icons/SpeakerOn";
import { useTabContext } from "../contexts/TabContext";

interface TabItemProps {
    tab: chrome.tabs.Tab;
}

export const TabItem: React.FC<TabItemProps> = ({tab}) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const {setTabs, setTabCount} = useTabContext();

  useEffect(() => {
    chrome.tabs.get(tab.id!, async (currentTab) => {
      const muted = currentTab.mutedInfo?.muted;
      setIsMuted(() => !!muted);
    });;
  }, [])

  const selectTab = () => {
    setIsSelected(prevIsSelected => !prevIsSelected);
  }

  const onTabClicked = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    if(e.metaKey) {
      selectTab();
    } else {
      goToTab(index);
    }
  }

    /**
   * Goes to selected tab based on index
   * @param index Index of to be opened tab
   */
  const goToTab = (index: number): void => {
    chrome.tabs.highlight({'tabs': index});
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
        <li onClick={(e) => onTabClicked(e, tab.index)} className={`tab-item ${isSelected ? 'selected' : ''}`}>
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