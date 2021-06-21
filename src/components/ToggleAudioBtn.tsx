import * as React from "react";
import styled from "styled-components";
import { SpeakerOff } from "../assets/icons/SpeakerOff";
import { SpeakerOn } from "../assets/icons/SpeakerOn";
import Tab from "../helpers/Tab";

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
  }, [tab.id, tab.groupId]);

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
    <TabAction onClick={(e) => toggleAudio(e, tab.id!)}>
      {isMuted ?? !tab.audible ? <SpeakerOff /> : <SpeakerOn />}
    </TabAction>
  );
};

const TabAction = styled.div`
  padding: 5px;
  background: var(--light-grey);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: 0.75;
  height: 30px;
  width: 30px;

  &:hover {
    opacity: 1;
  }

  &:not(:last-child) {
    margin-right: 5px;
  }
`;
