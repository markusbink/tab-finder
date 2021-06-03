import React, { useState, useEffect } from "react";
import { useTabContext } from "../contexts/TabContext";
import { truncate } from "../helpers/helpers";
import { CloseTabBtn } from "./CloseTabBtn";
import { ToggleAudioBtn } from "./ToggleAudioBtn";

interface TabItemProps {
    tab: chrome.tabs.Tab;
}

export const TabItem: React.FC<TabItemProps> = ({ tab }) => {
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const {
        selectedTabs,
        setSelectedTabs,
        setIsGroupActionBarVisible,
        isGroupActionBarVisible,
    } = useTabContext();

    // Initially check whether a tab is muted or not
    useEffect(() => {
        console.log({ group: tab.groupId });
        chrome.tabs.get(tab.id!, async (currentTab) => {
            const muted = currentTab.mutedInfo?.muted;
            setIsMuted(() => !!muted);
        });
    }, [tab.id]);

    // Deselect all tab items once a group action has been triggered
    useEffect(() => {
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

    // Go to tab that was clicked on
    const goToTab = (tabId: number): void => {
        chrome.tabs.highlight({ tabs: tabId });
    };

    const onTabClicked = (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
        tabId: number
    ) => {
        if (e.metaKey) {
            selectTab(tabId);
        } else {
            chrome.tabs.get(tabId, (tab) => {
                goToTab(tab.index);
            });
        }
    };

    return (
        <li
            onClick={(e) => onTabClicked(e, tab.id!)}
            className={`tab-item ${isSelected ? "selected" : ""} ${
                tab.groupId !== -1 ? "grouped" : ""
            }`}>
            {tab.favIconUrl ? (
                <img src={tab.favIconUrl} alt="Favicon of individual tab" />
            ) : (
                <span className="img-placeholder"></span>
            )}
            <h4>{truncate(tab.title!, 35)}</h4>
            <div className="actions">
                <ToggleAudioBtn
                    tab={tab}
                    isMuted={isMuted}
                    setIsMuted={setIsMuted}
                />
                <CloseTabBtn tab={tab} />
            </div>
        </li>
    );
};
