import * as React from "react";
import { PushPinSimple, PushPinSimpleSlash } from "phosphor-react";
import { useTheme } from "../../hooks/useTheme";
import Tab from "../../helpers/Tab";
import { useTabContext } from "../../contexts/TabContext";
import { TabActionBtn } from "./TabActionBtn";

interface TogglePinBtnProps {
  tab: chrome.tabs.Tab;
}

export const TogglePinBtn: React.FC<TogglePinBtnProps> = ({ tab }) => {
  const [isPinned, setIsPinned] = React.useState(tab.pinned);
  const { setTabs } = useTabContext();
  const theme = useTheme();

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
      {isPinned ? (
        <PushPinSimpleSlash size="100%" color={theme.action.icon} />
      ) : (
        <PushPinSimple size="100%" color={theme.action.icon} />
      )}
    </TabActionBtn>
  );
};
