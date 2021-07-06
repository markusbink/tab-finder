import styled, { keyframes } from "styled-components";
import { ContextMenuItem } from "./ContextMenuItem";
import {
  FolderNotchMinus,
  FolderNotchPlus,
  PushPinSimple,
  PushPinSimpleSlash,
  XCircle,
} from "phosphor-react";
import { useTheme } from "../../hooks/useTheme";
import Tab from "../../helpers/Tab";
import { useContextMenu } from "../../hooks/useContextMenu";
import { useSelector, useDispatch } from "react-redux";
import * as Constants from "../../constants";
import { AppState } from "../../store/types";
import {
  closeTabs,
  groupTabs,
  pinTabs,
  ungroupTabs,
  unpinTabs,
} from "../../store/actions";
import { useRef } from "react";

interface ContextMenuProps {
  target: React.MutableRefObject<null>;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ target }) => {
  const contextMenuRef = useRef(null);
  const theme = useTheme();
  const { isVisible, position } = useContextMenu(target, contextMenuRef);
  const tabs = useSelector((state: AppState) => state.tabs);
  const dispatch = useDispatch();

  /**
   * Closes all tabs that have been selected
   */
  const onCloseTabs = () => {
    tabs.map((tab) => {
      if (!tab.isSelected) {
        return;
      }
      Tab.closeTabById(tab.id!);
    });

    dispatch(
      closeTabs(tabs.filter((tab) => tab.isSelected).map((tab) => tab.id!))
    );
  };

  /**
   * Groups all tabs that have been selected
   */
  const onGroupTabs = async () => {
    const highlighedTabIds: number[] = tabs
      .filter((tab) => tab.isSelected!)
      .map((tab) => tab.id!);
    await chrome.tabs.group({ tabIds: highlighedTabIds });

    const udpatedTabs = await Tab.getTabs();
    dispatch(groupTabs(udpatedTabs));
  };

  /**
   * Ungroups all tabs that have been selected
   */
  const onUngroupTabs = async () => {
    const highlighedTabIds: number[] = tabs
      .filter((tab) => tab.isSelected!)
      .map((tab) => tab.id!);
    await chrome.tabs.ungroup(highlighedTabIds);

    const udpatedTabs = await Tab.getTabs();
    dispatch(ungroupTabs(udpatedTabs));
  };

  /**
   * Pins all tabs that have been selected
   */
  const onPinTabs = async () => {
    tabs.map(async (tab) => {
      if (!tab.isSelected) {
        return;
      }
      await Tab.update(tab.id!, { pinned: true });
    });

    const udpatedTabs = await Tab.getTabs();
    dispatch(pinTabs(udpatedTabs));
  };

  /**
   * Unpins all tabs that have been selected
   */
  const onUnpinTabs = async () => {
    tabs.map(async (tab) => {
      if (!tab.isSelected) {
        return;
      }
      await Tab.update(tab.id!, { pinned: false });
    });

    const udpatedTabs = await Tab.getTabs();
    dispatch(unpinTabs(udpatedTabs));
  };

  /**
   * Actions and labels to be used in the ContextMenu UI
   */
  const actions = [
    {
      icon: <XCircle color={theme.text} size="100%" />,
      label: "Close tabs",
      callback: onCloseTabs,
    },
    {
      icon: <FolderNotchPlus color={theme.text} size="100%" />,
      label: "Group tabs",
      callback: onGroupTabs,
    },
    {
      icon: <FolderNotchMinus color={theme.text} size="100%" />,
      label: "Ungroup tabs",
      callback: onUngroupTabs,
    },
    {
      icon: <PushPinSimple color={theme.text} size="100%" />,
      label: "Pin tabs",
      callback: onPinTabs,
    },
    {
      icon: <PushPinSimpleSlash color={theme.text} size="100%" />,
      label: "Unpin tabs",
      callback: onUnpinTabs,
    },
  ];

  return (
    <ContextMenuWrapper
      ref={contextMenuRef}
      isVisible={isVisible}
      position={position}
    >
      {actions.map((action) => (
        <ContextMenuItem
          key={action.label}
          icon={action.icon}
          label={action.label}
          callback={action.callback}
        />
      ))}
    </ContextMenuWrapper>
  );
};

const bounce = keyframes`
    0% {
      transform: scale(0.9);
      opacity: 0.75;
    }
    40% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  `;

const ContextMenuWrapper = styled.div<{
  isVisible: boolean;
  position: { x: number; y: number };
}>`
  position: absolute;
  top: ${({ position }) => position.y}px;
  left: ${({ position }) => position.x}px;
  background: ${({ theme }) => theme.background};
  box-shadow: 0px 1px 5px 3px rgb(0 0 0 / 0.25);
  position: absolute;
  border-radius: 6px;
  overflow: hidden;
  display: ${({ isVisible }) => (isVisible ? "inline-block" : "none")};
  width: ${Constants.CONTEXT_MENU_WIDTH}px;
  z-index: 20;
  animation: ${bounce} 0.3s cubic-bezier(0.95, 0, 0.335, 1);
  padding: 5px;
`;
