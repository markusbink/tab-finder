import Tab from "../../helpers/Tab";
import { PushPinSimple, PushPinSimpleSlash } from "phosphor-react";
import { useTheme } from "../../hooks/useTheme";
import { TabActionBtn } from "./TabActionBtn";
import { togglePinTab } from "../../store/actions";
import { useDispatch } from "react-redux";

interface TogglePinBtnProps {
  tab: chrome.tabs.Tab;
}

export const TogglePinBtn: React.FC<TogglePinBtnProps> = ({ tab }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const onTogglePin = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    tabId: number
  ): Promise<void> => {
    e.stopPropagation();

    // Update whether tab is pinned or not
    chrome.tabs.get(tabId, async (tab) => {
      await Tab.update(tab.id!, { pinned: !tab.pinned });
      dispatch(togglePinTab(tabId));
    });
  };

  return (
    <TabActionBtn onClick={(e) => onTogglePin(e, tab.id!)}>
      {tab.pinned ? (
        <PushPinSimpleSlash size="100%" color={theme.action.icon} />
      ) : (
        <PushPinSimple size="100%" color={theme.action.icon} />
      )}
    </TabActionBtn>
  );
};
