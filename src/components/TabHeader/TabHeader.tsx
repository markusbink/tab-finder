import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { TabFinderIcon } from "../../assets/icons/TabFinderIcon";
import { Store } from "../../store/types";
import { ToggleThemeBtn } from "./ToggleThemeBtn";

export const TabHeader: React.FC = () => {
  const tabs = useSelector((state: Store) => state.tabs);
  return (
    <Header>
      <LogoWrapper>
        <TabFinderIcon />
        <Title>TabFinder</Title>
        <TabCount>{tabs.length}</TabCount>
      </LogoWrapper>
      <ToggleThemeBtn />
    </Header>
  );
};

const Header = styled.header`
  padding: 15px 10px 5px 10px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text};
  line-height: 1.5;
`;

const TabCount = styled.span`
  font-weight: 800;
  font-size: 12px;
  color: ${({ theme }) => theme.success};
  margin-left: 7px;
  padding-left: 7px;
  border-left: 2px solid ${({ theme }) => theme.text};
`;
