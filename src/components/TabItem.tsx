import * as React from "react";
import Helper from "../helpers/Helper";
import Tab from "../helpers/Tab";
import { DraggableProvided } from "react-beautiful-dnd";
import { CloseTabBtn } from "./CloseTabBtn";
import { ToggleAudioBtn } from "./ToggleAudioBtn";
import styled from "styled-components";

interface TabItemProps {
  tab: chrome.tabs.Tab;
  provided: DraggableProvided;
}

export const TabItem: React.FC<TabItemProps> = ({ tab, provided }) => {
  const [isMuted, setIsMuted] = React.useState<boolean>(false);
  const [isSelected, _setIsSelected] = React.useState<boolean>(false);

  // Initially check whether a tab is muted or not
  React.useEffect(() => {
    chrome.tabs.get(tab.id!, async (tab) => {
      const muted = tab?.mutedInfo?.muted;
      setIsMuted(() => !!muted);
    });
  }, [tab.id, tab.groupId]);

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
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      onClick={() => onTabClicked(tab.id!)}
    >
      {renderFavicon(tab)}
      <TabTitle>{Helper.truncate(tab.title!, 35)}</TabTitle>
      <TabActionsWrapper>
        {tab.audible && (
          <ToggleAudioBtn tab={tab} isMuted={isMuted} setIsMuted={setIsMuted} />
        )}
        <CloseTabBtn tab={tab} />
      </TabActionsWrapper>
    </TabItemWrapper>
  );
};

const TabItemWrapper = styled.li`
  display: flex;
  align-items: center;
  background: var(--dark-grey);
  color: var(--light-grey);
  margin-bottom: 10px;
  text-align: left;
  padding: 10px;
  border-radius: 6px;
  transition: border 0.2s ease-in-out;
  position: relative;
  border: 2px solid var(--dark-grey);
  user-select: none;

  &:hover {
    border: 2px solid var(--light-grey);
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

const TabActionsWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  background-image: linear-gradient(270deg, var(--dark-grey), 85%, transparent);
  background-image: linear-gradient(270deg, var(--dark-grey), 85%, transparent);
  display: flex;
  align-items: center;
  padding: 0 10px 0 30px;
`;
