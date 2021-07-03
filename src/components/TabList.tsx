import { TabItem } from "./TabItem";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { ITab } from "../contexts/TabContext";
import Tab from "../helpers/Tab";
import styled from "styled-components";
import { ContextMenu } from "./ContextMenu";
import { useDispatch } from "react-redux";
import { setTabs } from "../store/actions";
import React, { useEffect, useRef, useState } from "react";
import { useTabs } from "../hooks";
import { useResettableState } from "react-resettable-state";
import { useCustomArray } from "../hooks/useCustomArray";

export function useSelectedTabs(): [ITab[], () => void, (tab: ITab) => void] {
  const tabs = useTabs();
  const [selectedTabIds, setSelectedTabIds] = useState<number[]>([]);
  const [selectedTabs, resetSelectedTabs, setSelectedTabs] =
    useResettableState<ITab[]>(tabs);

  useEffect(() => {
    setSelectedTabs(
      tabs.filter((tab) =>
        selectedTabIds.some((selectedTabId) => tab.id === selectedTabId)
      )
    );
  }, [tabs, selectedTabIds, setSelectedTabs]);

  const addSelectedTab = (tab: ITab) => {
    if (selectedTabIds.includes(tab.id!)) {
      return;
    }

    setSelectedTabs([...selectedTabs, tab]);
  };

  return [selectedTabs, resetSelectedTabs, addSelectedTab];
}

export const TabList: React.FC = () => {
  const [selectedTabs, resetSelectedTabs, addSelectedTab] = useSelectedTabs();
  const [lastSelected, setLastSelected] = useState<number | null>(null);
  const tabListRef = useRef(null);
  const dispatch = useDispatch();
  const tabs = useTabs();
  const { entries, addEntry, toggleEntry } = useCustomArray(tabs);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") {
        return;
      }
      resetSelectedTabs();
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

  const onDragEnd = async (result: DropResult): Promise<void> => {
    if (!result.destination) {
      return;
    }

    const items = reorder(tabs, result.source.index, result.destination.index);

    // Update state with new order
    dispatch(setTabs(items));

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
              {tabs.map((tab: ITab, index: number) => {
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
                    lastSelected={lastSelected}
                    setLastSelected={setLastSelected}
                    toggleEntry={toggleEntry}
                    entries={entries}
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
                        lastSelected={lastSelected}
                        setLastSelected={setLastSelected}
                        toggleEntry={toggleEntry}
                        entries={entries}
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
