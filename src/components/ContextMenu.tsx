import * as React from "react";
import styled, { keyframes } from "styled-components";
import { useTabContext } from "../contexts/TabContext";
import Tab from "../helpers/Tab";
import { useContextMenu } from "../hooks/useContextMenu";
import { ContextMenuItem } from "./ContextMenuItem";
import * as Constants from "../constants";
import {
  FolderNotchMinus,
  FolderNotchPlus,
  PushPinSimple,
  XCircle,
} from "phosphor-react";
import { useTheme } from "../hooks/useTheme";

interface ContextMenuProps {
  target: any;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ target }) => {
  const contextMenuRef = React.useRef(null);
  const { tabs, setTabs } = useTabContext();
  const theme = useTheme();
  const { isVisible, position } = useContextMenu(target, contextMenuRef);

  React.useLayoutEffect(() => {}, []);

  const actions = [
    {
      icon: <XCircle color={theme.text} size="100%" />,
      label: "Close tabs",
      callback: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // Remove tabs
        tabs.map((tab) => {
          if (!tab.isSelected) {
            return;
          }
          Tab.closeTabById(tab.id!);
        });
        // Update state
        setTabs(tabs.filter((tab) => !tab.isSelected));
      },
    },
    {
      icon: <FolderNotchPlus color={theme.text} size="100%" />,
      label: "Group tabs",
      callback: async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const highlighedTabIds: number[] = tabs
          .filter((tab) => tab.isSelected!)
          .map((tab) => tab.id!);
        await chrome.tabs.group({ tabIds: highlighedTabIds });

        const updatedTabs = await Tab.getTabs();
        setTabs(updatedTabs);
      },
    },
    {
      icon: <FolderNotchMinus color={theme.text} size="100%" />,
      label: "Ungroup tabs",
      callback: async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const highlighedTabIds: number[] = tabs
          .filter((tab) => tab.isSelected!)
          .map((tab) => tab.id!);
        await chrome.tabs.ungroup(highlighedTabIds);

        const updatedTabs = await Tab.getTabs();
        setTabs(updatedTabs);
      },
    },
    {
      icon: <PushPinSimple color={theme.text} size="100%" />,
      label: "Pin tabs",
      callback: async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        tabs.map(async (tab) => {
          // If tab is not pinned, pin it otherwise unpin it
          if (!tab.isSelected) {
            return;
          }
          await Tab.update(tab.id!, { pinned: !tab.pinned });
        });
        const updatedTabs = await Tab.getTabs();
        setTabs(updatedTabs);
      },
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
