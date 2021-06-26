import * as React from "react";
import styled from "styled-components";

interface ContextMenuItemProps {
  label: string;
  action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
  label,
  action,
}) => {
  return <MenuItem onClick={(e) => action(e)}>{label}</MenuItem>;
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
