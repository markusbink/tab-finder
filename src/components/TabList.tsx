import * as React from "react";
import { TabItem } from "./TabItem";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useTabContext } from "../contexts/TabContext";
import Tab from "../helpers/Tab";
import styled from "styled-components";

interface TabListProps {
  tabs: chrome.tabs.Tab[];
}

export const TabList: React.FC<TabListProps> = ({ tabs }) => {
  const { setTabs } = useTabContext();

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
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Droppable droppableId="tab-tabs" key="tab-list">
        {(provided) => (
          <TabListWrapper {...provided.droppableProps} ref={provided.innerRef}>
            {tabs.map((tab: chrome.tabs.Tab, index: number) =>
              tab.pinned ? (
                <TabItem key={tab.id} tab={tab} />
              ) : (
                <Draggable key={tab.id} draggableId={tab.id + ""} index={index}>
                  {(provided) => (
                    <TabItem provided={provided} key={tab.id} tab={tab} />
                  )}
                </Draggable>
              )
            )}
          </TabListWrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const TabListWrapper = styled.ul`
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
    background-image: linear-gradient(0deg, var(--black), transparent);
    pointer-events: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
