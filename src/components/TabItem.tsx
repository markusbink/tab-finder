import React, { useState, useEffect } from "react";
import { useTabContext } from "../contexts/TabContext";
import Helper from "../helpers/Helper";
import Tab from "../helpers/Tab";
import { CloseTabBtn } from "./CloseTabBtn";
import { ToggleAudioBtn } from "./ToggleAudioBtn";

interface TabItemProps {
    tab: chrome.tabs.Tab;
}

interface IItemProps {
    key?: number;
    tabIndex?: number;
    "aria-roledescription"?: string;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    onWheel?: (e: React.WheelEvent) => void;
    style?: React.CSSProperties;
    ref?: React.RefObject<any>;
}

export const TabItem: React.FC<TabItemProps> = React.forwardRef(
    (
        {
            tab,
            ...props
        }: IItemProps & {
            tab: chrome.tabs.Tab;
        },
        ref: React.Ref<HTMLLIElement>
    ) => {
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
            chrome.tabs.get(tab.id!, async (currentTab) => {
                const muted = currentTab.mutedInfo?.muted;
                setIsMuted(() => !!muted);
            });
        }, [tab.id, tab.groupId]);

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

        return (
            <li
                ref={ref}
                {...props}
                onClick={(e) => onTabClicked(e, tab.id!)}
                className={`tab-item ${isSelected && "selected"} ${
                    tab.groupId !== -1 && "grouped"
                }`}>
                {tab.favIconUrl ? (
                    <img src={tab.favIconUrl} alt="Favicon of individual tab" />
                ) : (
                    <span className="img-placeholder"></span>
                )}
                <h4>{Helper.truncate(tab.title!, 35)}</h4>
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
    }
);
