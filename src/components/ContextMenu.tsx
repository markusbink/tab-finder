import * as React from "react";
import styled, { keyframes } from "styled-components";
import { useTabContext } from "../contexts/TabContext";
import Tab from "../helpers/Tab";
import { useContextMenu } from "../hooks/useContextMenu";
import { ContextMenuItem } from "./ContextMenuItem";

interface ContextMenuProps {
  target: any;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ target }) => {
  const contextMenuRef = React.useRef(null);
  const { tabs, setTabs } = useTabContext();
  const { isVisible, position } = useContextMenu(target, contextMenuRef);

  React.useLayoutEffect(() => {}, []);

  const actions = [
    {
      icon: "",
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
      icon: "",
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
      icon: "",
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
      icon: "",
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
        <ContextMenuItem label={action.label} callback={action.callback} />
      ))}
    </ContextMenuWrapper>
  );
};

const bounce = keyframes`
    0% {
      transform: scale(0.9);
      opacity: 0.5;
    }
    80% {
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
  width: 180px;
  z-index: 20;
  animation: ${bounce} 0.15s cubic-bezier(0, 0, 0.38, 0.9);
`;
