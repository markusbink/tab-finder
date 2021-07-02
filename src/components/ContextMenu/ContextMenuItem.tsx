import * as React from "react";
import styled from "styled-components";

interface ContextMenuItemProps {
  icon?: any;
  label: string;
  callback: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
  icon,
  label,
  callback,
}) => {
  return (
    <MenuItem onClick={(e) => callback(e)}>
      <IconWrapper>{icon}</IconWrapper>
      {label}
    </MenuItem>
  );
};

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  padding: 10px;
  user-select: none;
  border-radius: 4px;
  transition: all 0.1s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.contextMenu.hover};
  }
`;

const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 15px;
`;
