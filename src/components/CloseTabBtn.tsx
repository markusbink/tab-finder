import React from "react";
import styled from "styled-components";
import { Close } from "../assets/icons/Close";
import { useTabContext } from "../contexts/TabContext";
import Helper from "../helpers/Helper";
import Tab from "../helpers/Tab";

interface CloseTabBtnProps {
  tab: chrome.tabs.Tab;
}

export const CloseTabBtn: React.FC<CloseTabBtnProps> = ({ tab }) => {
  const { setTabs, setTabCount, searchTerm, setSearchTerm } = useTabContext();

  const closeTab = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    tabId: number
  ): Promise<void> => {
    e.stopPropagation();
    // Remove tab from browser
    await Tab.closeTabById(tabId);

    // Update UI in extension popup
    const tabs = await Tab.getTabs();

    setTabs(tabs.filter((tab) => tab.id !== tabId));
    setTabCount(tabs.filter((tab) => tab.id !== tabId).length);

    // Remove filtering if no more tabs match filter criterion
    if (!searchTerm) {
      return;
    }
    const filteredTabs = Helper.filterTabsByTerm(tabs, searchTerm);

    if (filteredTabs.length === 0) {
      setSearchTerm("");
    }
  };

  return (
    <TabAction onClick={async (e) => await closeTab(e, tab.id!)}>
      <Close />
    </TabAction>
  );
};

export const TabAction = styled.div`
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
  display: none;

  &:hover {
    opacity: 1;
  }

  &:not(:last-child) {
    margin-right: 5px;
  }
`;
