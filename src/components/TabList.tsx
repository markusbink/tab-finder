import { useEffect, useRef, useState } from "react";
import { TabItem } from "./TabItem";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Tab from "../helpers/Tab";
import styled from "styled-components";
import { ContextMenu } from "./ContextMenu";
import { useDispatch } from "react-redux";
import { deselectTabs, setTabs } from "../store/actions";
import { NoTabsFound } from "./NoTabsFound";
import { ITab } from "../store/types";
interface TabListProps {
  tabs: ITab[];
}

export const TabList: React.FC<TabListProps> = ({ tabs }) => {
  const [lastSelected, setLastSelected] = useState<number | null>(null);
  const tabListRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") {
        return;
      }

      dispatch(deselectTabs());
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  // Function to change the order of a list based on previous and new location
  const reorder = (
    list: ITab[],
    startIndex: number,
    endIndex: number
  ): ITab[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // TODO: Fix flickering issue on re-render
  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    // Change order of tabs based on Drag and Drop change
    const changedTab = tabs[source.index];
    if (!changedTab || !changedTab.id) {
      return;
    }

    await Tab.move(changedTab.id, destination.index);
    const updatedTabs = await Tab.getTabs();

    // Update state with new order
    // const items = reorder(tabs, source.index, destination.index);
    dispatch(setTabs(updatedTabs));
  };

  return tabs.length > 0 ? (
    <TabListWrapper ref={tabListRef}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Droppable droppableId="tab-tabs" key="tab-list">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {tabs.map((tab: ITab, index: number) => {
                let isInSameGroup = false;
                if (tab.groupId !== -1) {
                  if (index > 0 && index < tabs.length) {
                    isInSameGroup =
                      tabs[index].groupId == tabs[index - 1].groupId;
                  }
                }
                return (
                  <Draggable
                    key={tab.id}
                    draggableId={tab.id + ""}
                    index={index}
                    isDragDisabled={tab.pinned}
                  >
                    {(provided) => (
                      <>
                        <TabItem
                          isInSameGroup={isInSameGroup}
                          provided={provided}
                          key={tab.id}
                          tab={tab}
                          lastSelected={lastSelected}
                          setLastSelected={setLastSelected}
                        />
                      </>
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
  ) : (
    <NoTabsFound />
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
