import * as React from "react";
import styled from "styled-components";

interface TabActionBtnProps {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: React.ReactNode;
  background?: string;
}

export const TabActionBtn: React.FC<TabActionBtnProps> = ({
  onClick,
  children,
  background,
}) => {
  return (
    <TabAction background={background} onClick={onClick}>
      {children}
    </TabAction>
  );
};

export const TabAction = styled.div<{ background?: string }>`
  padding: 5px;
  background: ${({ background }) =>
    background ? background : ({ theme }) => theme.action.background};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: 0.75;
  height: 30px;
  width: 30px;

  &:hover {
    opacity: 1;
  }

  &:not(:last-child) {
    margin-right: 5px;
  }
`;
