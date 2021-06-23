import * as React from "react";
import Helper from "../helpers/Helper";
import Tab from "../helpers/Tab";
import { DraggableProvided } from "react-beautiful-dnd";
import { ToggleAudioBtn } from "./ToggleAudioBtn";
import styled from "styled-components";
import { TogglePinBtn } from "./TogglePinBtn";
import { TabAction } from "./TabActionBtn";
import { CloseTabBtn } from "./CloseTabBtn";
import { ITab, useTabContext } from "../contexts/TabContext";

interface TabItemProps {
  tab: ITab;
  provided?: DraggableProvided;
}

export const TabItem: React.FC<TabItemProps> = ({ tab, provided }) => {
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
      isSelected={tab.isSelected!}
      // isSelected={selectedTabs.includes(tab.index)}
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
`;

const TabItemWrapper = styled.li<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.tab.background};
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;
  text-align: left;
  padding: 10px;
  border-radius: 6px;
  transition: border 0.2s ease-in-out;
  position: relative;
  border: 2px solid ${({ theme }) => theme.tab.background};
  border: 2px solid
    ${({ isSelected }) =>
      isSelected
        ? ({ theme }) => theme.success
        : ({ theme }) => theme.tab.background};
  user-select: none;
  overflow: hidden;

  &:hover {
    border: 2px solid
      ${({ isSelected }) =>
        isSelected
          ? ({ theme }) => theme.success
          : ({ theme }) => theme.tab.hover};
    user-select: none;
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
