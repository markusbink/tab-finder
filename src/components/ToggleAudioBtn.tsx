import * as React from "react";
import { SpeakerOff } from "../assets/icons/SpeakerOff";
import { SpeakerOn } from "../assets/icons/SpeakerOn";
import Tab from "../helpers/Tab";
import { TabActionBtn } from "./TabActionBtn";

interface ToggleAudioBtnProps {
  tab: chrome.tabs.Tab;
}

export const ToggleAudioBtn: React.FC<ToggleAudioBtnProps> = ({ tab }) => {
  const [isMuted, setIsMuted] = React.useState<boolean>(false);

  // Initially check whether a tab is muted or not
  React.useEffect(() => {
    chrome.tabs.get(tab.id!, async (tab) => {
      const muted = tab?.mutedInfo?.muted;
      setIsMuted(() => !!muted);
    });
  }, [tab.id]);

  const toggleAudio = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    tabId: number
  ): void => {
    e.stopPropagation();
    chrome.tabs.get(tabId, async (tab) => {
      const muted = !tab.mutedInfo?.muted;
      await Tab.update(tab.id!, { muted });
      setIsMuted(muted);
    });
  };

  return (
    <TabActionBtn onClick={(e) => toggleAudio(e, tab.id!)}>
      {isMuted ?? !tab.audible ? <SpeakerOff /> : <SpeakerOn />}
    </TabActionBtn>
  );
};
