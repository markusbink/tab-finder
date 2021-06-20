import React from "react";
import { SpeakerOff } from "../assets/icons/SpeakerOff";
import { SpeakerOn } from "../assets/icons/SpeakerOn";
import Tab from "../helpers/Tab";

interface ToggleAudioBtnProps {
    tab: chrome.tabs.Tab;
    isMuted: boolean;
    setIsMuted: (isMuted: boolean) => void;
}

export const ToggleAudioBtn: React.FC<ToggleAudioBtnProps> = ({
    tab,
    isMuted,
    setIsMuted,
}) => {
    const toggleAudio = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        tabId: number
    ): void => {
        e.stopPropagation();
        chrome.tabs.get(tabId, async (tab) => {
            const muted = !tab.mutedInfo?.muted;
            await Tab.update(tab.id!, {muted});
            setIsMuted(muted);
        });
    };

    return (
        <div onClick={(e) => toggleAudio(e, tab.id!)} className="action audio">
            {isMuted ?? !tab.audible ? <SpeakerOff /> : <SpeakerOn />}
        </div>
    );
};
