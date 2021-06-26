import * as React from "react";
import styled from "styled-components";
import { useContextMenu } from "../hooks/useContextMenu";
import { ContextMenuItem } from "./ContextMenuItem";

interface ContextMenuProps {
  target: any;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ target }) => {
  const { isVisible, position } = useContextMenu(target);

  const actions = [
    {
      icon: "",
      label: "Close tabs",
      callback: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log("Tab closed");
      },
    },
    {
      icon: "",
      label: "Group tabs",
      callback: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log("Tabs grouped");
      },
    },
    {
      icon: "",
      label: "Pin tabs",
      callback: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log("Tabs pinned");
      },
    },
  ];

  return (
    <ContextMenuWrapper isVisible={isVisible} position={position}>
      {actions.map((action) => (
        <ContextMenuItem label={action.label} callback={action.callback} />
      ))}
    </ContextMenuWrapper>
  );
};

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
`;
