import * as React from "react";
import styled from "styled-components";

interface ContextMenuItemProps {
  icon?: string;
  label: string;
  callback: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
  label,
  callback,
}) => {
  return <MenuItem onClick={(e) => callback(e)}>{label}</MenuItem>;
};

const MenuItem = styled.div`
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  padding: 10px;
  user-select: none;

  &:hover {
    background: ${({ theme }) => theme.tab.background};
  }
`;
