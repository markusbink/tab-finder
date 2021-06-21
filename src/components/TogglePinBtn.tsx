import * as React from "react";
import styled from "styled-components";
import { Pin } from "../assets/icons/Pin";
import { UnPin } from "../assets/icons/UnPin";
import { useTabContext } from "../contexts/TabContext";
import Tab from "../helpers/Tab";

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
    <TabAction onClick={(e) => togglePin(e, tab.id!)}>
      {isPinned ? <UnPin /> : <Pin />}
    </TabAction>
  );
};

const TabAction = styled.div`
  padding: 5px;
  background: var(--light-grey);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: 0.75;
  height: 30px;
  width: 30px;

  &:hover {
    opacity: 1;
  }

  &:not(:last-child) {
    margin-right: 5px;
  }
`;
