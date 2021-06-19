import * as React from "react";
import Helper from "../helpers/Helper";
import Tab from "../helpers/Tab";
import { DraggableProvided } from "react-beautiful-dnd";
import { useTabContext } from "../contexts/TabContext";
import { CloseTabBtn } from "./CloseTabBtn";
import { ToggleAudioBtn } from "./ToggleAudioBtn";

interface TabItemProps {
    tab: chrome.tabs.Tab;
    provided: DraggableProvided;
}

export const TabItem: React.FC<TabItemProps> = ({ tab, provided }) => {
    const [isMuted, setIsMuted] = React.useState<boolean>(false);
    const [isSelected, setIsSelected] = React.useState<boolean>(false);
    const {
        selectedTabs,
        setSelectedTabs,
        setIsGroupActionBarVisible,
        isGroupActionBarVisible,
    } = useTabContext();

    // Initially check whether a tab is muted or not
    React.useEffect(() => {
        chrome.tabs.get(tab.id!, async (tab) => {
            const muted = tab?.mutedInfo?.muted;
            setIsMuted(() => !!muted);
        });
    }, [tab.id, tab.groupId]);

    // Deselect all tab items once a group action has been triggered
    React.useEffect(() => {
        if (!isGroupActionBarVisible) {
            setIsSelected(false);
        }
    }, [isGroupActionBarVisible]);

    // Select and highlight the currently clicked tab
    const selectTab = (tabId: number) => {
        setIsSelected((prevIsSelected) => !prevIsSelected);

        let updatedTabs: number[] = [];
        if (selectedTabs.includes(tabId)) {
            updatedTabs = selectedTabs.filter((id) => id !== tabId);
        } else {
            updatedTabs = [...selectedTabs, tabId];
        }
        setSelectedTabs(updatedTabs);
        updatedTabs.length > 1
            ? setIsGroupActionBarVisible(true)
            : setIsGroupActionBarVisible(false);
    };

    const onTabClicked = (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
        tabId: number
    ) => {
        if (e.metaKey) {
            selectTab(tabId);
            return;
        }
        chrome.tabs.get(tabId, (tab) => {
            Tab.goToTab(tab.index);
        });
    };

    const renderFavicon = (tab: chrome.tabs.Tab) => {
        return tab.favIconUrl ? (
            <img src={tab.favIconUrl} alt="Favicon of individual tab" />
        ) : (
            <span className="img-placeholder"></span>
        );
    };

    return (
        <li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={(e) => onTabClicked(e, tab.id!)}
            className={`tab-item ${isSelected && "selected"} ${
                tab.groupId !== -1 && "grouped"
            }`}>
            {renderFavicon(tab)}
            <h4>{Helper.truncate(tab.title!, 35)}</h4>
            <div className="actions">
                {tab.audible && (
                    <ToggleAudioBtn
                        tab={tab}
                        isMuted={isMuted}
                        setIsMuted={setIsMuted}
                    />
                )}
                <CloseTabBtn tab={tab} />
            </div>
        </li>
    );
};
