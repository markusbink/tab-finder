import Tab from "../../helpers/Tab";
import { XCircle } from "phosphor-react";
import { TabActionBtn } from "./TabActionBtn";
import { useTheme } from "../../hooks/useTheme";
import { useDispatch } from "react-redux";
import { closeTab } from "../../store/actions";

interface CloseTabBtnProps {
  tab: chrome.tabs.Tab;
}

export const CloseTabBtn: React.FC<CloseTabBtnProps> = ({ tab }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const onCloseTab = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    tabId: number
  ): Promise<void> => {
    e.stopPropagation();
    // Remove tab from browser
    await Tab.closeTabById(tabId);

    // Update UI in extension popup
    dispatch(closeTab(tabId));
  };

  return (
    <TabActionBtn onClick={async (e) => await onCloseTab(e, tab.id!)}>
      <XCircle size="100%" color={theme.action.icon} />
    </TabActionBtn>
  );
};
