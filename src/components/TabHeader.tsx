import * as React from "react";
import styled from "styled-components";
import { TabFinderIcon } from "../assets/icons/TabFinderIcon";
import { useTabContext } from "../contexts/TabContext";

export const TabHeader: React.FC = () => {
  const { tabCount } = useTabContext();

  return (
    <Header>
      <LogoWrapper>
        <TabFinderIcon />
        <Title>TabFinder</Title>
        <TabCount>{tabCount}</TabCount>
      </LogoWrapper>
    </Header>
  );
};

const Header = styled.header`
  padding: 15px 10px 5px 10px;
  text-align: left;
  background-color: var(--black);
  color: var(--light-grey);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  color: var(--light-grey);
  line-height: 1.5;
`;

const TabCount = styled.span`
  font-weight: 800;
  font-size: 12px;
  color: var(--green);
  margin-left: 7px;
  padding-left: 7px;
  border-left: 2px solid var(--light-grey);
`;
