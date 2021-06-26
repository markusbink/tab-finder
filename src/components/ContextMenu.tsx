import * as React from "react";
import styled from "styled-components";
import { ContextMenuItem } from "./ContextMenuItem";

interface ContextMenuProps {
  isVisible: boolean;
  position: {
    x: number;
    y: number;
  };
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  isVisible,
  position,
}) => {
  const actions = [
    {
      label: "Close tabs",
      action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log("Tab closed");
      },
    },
    {
      label: "Group tabs",
      action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log("Tabs grouped");
      },
    },
    {
      label: "Pin tabs",
      action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log("Tabs pinned");
      },
    },
  ];

  return (
    <ContextMenuWrapper isVisible={isVisible} position={position}>
      {actions.map((action) => (
        <ContextMenuItem label={action.label} action={action.action} />
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
