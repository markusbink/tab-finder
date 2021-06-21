import * as React from "react";
import Helper from "../helpers/Helper";
import Tab from "../helpers/Tab";
import { DraggableProvided } from "react-beautiful-dnd";
import { ToggleAudioBtn } from "./ToggleAudioBtn";
import styled from "styled-components";
import { TogglePinBtn } from "./TogglePinBtn";
import { TabAction } from "./TabActionBtn";
import { CloseTabBtn } from "./CloseTabBtn";

interface TabItemProps {
  tab: chrome.tabs.Tab;
  provided?: DraggableProvided;
}

export const TabItem: React.FC<TabItemProps> = ({ tab, provided }) => {
  const [isSelected, _setIsSelected] = React.useState<boolean>(false);

  const onTabClicked = (tabId: number) => {
    chrome.tabs.get(tabId, (tab) => {
      Tab.goToTab(tab.index);
    });
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
      ref={provided?.innerRef}
      draggable={false}
      onClick={() => onTabClicked(tab.id!)}
    >
      {renderFavicon(tab)}
      <TabTitle>{Helper.truncate(tab.title!, 37)}</TabTitle>
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

const TabItemWrapper = styled.li`
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
  user-select: none;

  &:hover {
    border: 2px solid ${({ theme }) => theme.tab.hover};
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
