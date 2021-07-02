import React from "react";
import { XCircle } from "phosphor-react";
import { useTabContext } from "../../contexts/TabContext";
import Helper from "../../helpers/Helper";
import Tab from "../../helpers/Tab";
import { TabActionBtn } from "./TabActionBtn";
import { useTheme } from "../../hooks/useTheme";

interface CloseTabBtnProps {
  tab: chrome.tabs.Tab;
}

export const CloseTabBtn: React.FC<CloseTabBtnProps> = ({ tab }) => {
  const { tabs, setTabs, setTabCount, searchTerm, setSearchTerm } =
    useTabContext();
  const theme = useTheme();

  const closeTab = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    tabId: number
  ): Promise<void> => {
    e.stopPropagation();
    // Remove tab from browser
    await Tab.closeTabById(tabId);

    // Update UI in extension popup
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
    <TabActionBtn onClick={async (e) => await closeTab(e, tab.id!)}>
      <XCircle size="100%" color={theme.action.icon} />
    </TabActionBtn>
  );
};
