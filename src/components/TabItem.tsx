import * as React from "react";
import Helper from "../helpers/Helper";
import Tab from "../helpers/Tab";
import styled from "styled-components";
import { DraggableProvided } from "react-beautiful-dnd";
import { ITab, useTabContext } from "../contexts/TabContext";
import { TogglePinBtn, ToggleAudioBtn, CloseTabBtn } from "./TabButtons";
import { TabAction } from "./TabButtons/TabActionBtn";

interface TabItemProps {
  tab: ITab;
  provided?: DraggableProvided;
  isInSameGroup?: boolean;
}

export const TabItem: React.FC<TabItemProps> = ({
  tab,
  provided,
  isInSameGroup,
}) => {
  const { tabs, setTabs, lastSelected, setLastSelected } = useTabContext();

  const onTabClicked = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    if (e.metaKey) {
      setTabs(
        tabs.map((tab, tabIndex) => {
          if (tabIndex === index) {
            tab.isSelected = !tab.isSelected;
          }
          return tab;
        })
      );
      setLastSelected(index);
      return;
    }

    if (e.shiftKey) {
      if (lastSelected === -1) {
        return;
      }
      setTabs(
        tabs.map((tab, tabIndex) => {
          if (
            (tabIndex <= index && tabIndex >= lastSelected) ||
            (tabIndex >= index && tabIndex <= lastSelected)
          ) {
            tab.isSelected = true;
          } else {
            tab.isSelected = false;
          }
          return tab;
        })
      );
      return;
    }

    Tab.goToTab(index);
  };

  const renderFavicon = (tab: chrome.tabs.Tab) => {
    return tab.favIconUrl ? (
      <TabFavicon src={tab.favIconUrl} alt="Favicon of individual tab" />
    ) : (
      <TabFaviconPlaceholder as="span" />
    );
  };

  return (
    <TabItemWrapper
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      isInSameGroup={isInSameGroup}
      isSelected={tab.isSelected!}
      ref={provided?.innerRef}
      draggable={false}
      onClick={(e) => onTabClicked(e, tab.index!)}
    >
      {renderFavicon(tab)}
      <TabTitle>{Helper.truncate(tab.title!, 30)}</TabTitle>
      <TabActionsWrapper>
        <TogglePinBtn tab={tab} />
        {tab.audible && <ToggleAudioBtn tab={tab} />}
        <CloseTabBtn tab={tab} />
      </TabActionsWrapper>
    </TabItemWrapper>
  );
};

const TabActionsWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  background-image: linear-gradient(
    270deg,
    ${({ theme }) => theme.tab.background},
    85%,
    transparent
  );
  display: flex;
  align-items: center;
  padding: 0 10px 0 30px;
  border-radius: 6px;
`;

const TabItemWrapper = styled.li<{
  isSelected: boolean;
  isInSameGroup?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.tab.background};
  color: ${({ theme }) => theme.text};
  margin-top: ${({ isInSameGroup }) => (isInSameGroup ? "-40px" : "0px")};
  margin-bottom: 10px;
  text-align: left;
  padding: 10px;
  border-radius: 6px;
  transition: border 0.1s ease-in-out;
  position: relative;
  border: 2px solid
    ${({ isSelected }) =>
      isSelected
        ? ({ theme }) => theme.success
        : ({ theme }) => theme.tab.background};
  user-select: none;
  outline: none;

  &:hover {
    border: 2px solid
      ${({ isSelected }) =>
        isSelected
          ? ({ theme }) => theme.success
          : ({ theme }) => theme.tab.hover};
    user-select: none;
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.success};
  }

  &:hover ${TabAction} {
    display: inline-block;
  }
`;

const TabTitle = styled.h4`
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
`;

const TabFavicon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 15px;
`;
const TabFaviconPlaceholder = styled(TabFavicon)`
  background: #ddd;
  border-radius: 6p;
  display: inline-block;
`;
