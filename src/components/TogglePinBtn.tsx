import * as React from "react";
import { Pin } from "../assets/icons/Pin";
import { UnPin } from "../assets/icons/UnPin";
import { useTabContext } from "../contexts/TabContext";
import Tab from "../helpers/Tab";
import { TabActionBtn } from "./TabActionBtn";

interface TogglePinBtnProps {
  tab: chrome.tabs.Tab;
}

export const TogglePinBtn: React.FC<TogglePinBtnProps> = ({ tab }) => {
  const [isPinned, setIsPinned] = React.useState(tab.pinned);
  const { setTabs } = useTabContext();

  const togglePin = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    tabId: number
  ): Promise<void> => {
    e.stopPropagation();

    // Update whether tab is pinned or not
    chrome.tabs.get(tabId, async (tab) => {
      await Tab.update(tab.id!, { pinned: !isPinned });
      setIsPinned((prevIsPinned) => !prevIsPinned);

      // Set tabs again to make them not draggable if they are pinned
      const tabs = await Tab.getTabs();
      setTabs(tabs);
    });
  };

  return (
    <TabActionBtn onClick={(e) => togglePin(e, tab.id!)}>
      {isPinned ? <UnPin /> : <Pin />}
    </TabActionBtn>
  );
};
