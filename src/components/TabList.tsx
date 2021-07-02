import * as React from "react";
import { TabItem } from "./TabItem";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { ITab, useTabContext } from "../contexts/TabContext";
import Tab from "../helpers/Tab";
import styled from "styled-components";
import { ContextMenu } from "./ContextMenu";

interface TabListProps {
  tabs: ITab[];
}

export const TabList: React.FC<TabListProps> = ({ tabs }) => {
  const { setTabs } = useTabContext();
  const tabListRef = React.useRef(null);

  React.useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setTabs(
          tabs.map((tab) => {
            tab.isSelected = false;
            return tab;
          })
        );
      }
    });
  }, []);

  // Function to change the order of a list based on previous and new location
  const reorder = (
    list: chrome.tabs.Tab[],
    startIndex: number,
    endIndex: number
  ): chrome.tabs.Tab[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = async (result: DropResult): Promise<void> => {
    if (!result.destination) {
      return;
    }

    const items = reorder(tabs, result.source.index, result.destination.index);

    // Update state with new order
    setTabs(items);

    // Change order of tabs based on Drag and Drop change
    const changedTabs = await Tab.getTabByIndex(result.source.index);
    if (!changedTabs) {
      return;
    }

    const tabId: number = changedTabs[0].id!;
    await Tab.move(tabId, result.destination?.index!);
  };

  return (
    <TabListWrapper ref={tabListRef}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Droppable droppableId="tab-tabs" key="tab-list">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {tabs.map((tab: chrome.tabs.Tab, index: number) => {
                let isInSameGroup = false;
                if (tab.groupId !== -1) {
                  if (index > 0 && index < tabs.length) {
                    isInSameGroup =
                      tabs[index].groupId == tabs[index - 1].groupId;
                  }
                }

                return tab.pinned ? (
                  <TabItem
                    isInSameGroup={isInSameGroup}
                    key={tab.id}
                    tab={tab}
                  />
                ) : (
                  <Draggable
                    key={tab.id}
                    draggableId={tab.id + ""}
                    index={index}
                  >
                    {(provided) => (
                      <TabItem
                        isInSameGroup={isInSameGroup}
                        provided={provided}
                        key={tab.id}
                        tab={tab}
                      />
                    )}
                  </Draggable>
                );
              })}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <ContextMenu target={tabListRef} />
    </TabListWrapper>
  );
};

const TabListWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding: 10px;
  scrollbar-width: none; /* Firefox */

  ::after {
    content: "";
    position: absolute;
    display: block;
    left: 0;
    bottom: 0;
    height: 30px;
    width: 100%;
    background-image: linear-gradient(
      0deg,
      ${({ theme }) => theme.background},
      transparent
    );
    pointer-events: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
