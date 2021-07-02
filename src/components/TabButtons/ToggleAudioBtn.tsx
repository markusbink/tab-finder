import * as React from "react";
import { SpeakerHigh, SpeakerX } from "phosphor-react";
import Tab from "../../helpers/Tab";
import { TabActionBtn } from "./TabActionBtn";
import { useTheme } from "../../hooks/useTheme";

interface ToggleAudioBtnProps {
  tab: chrome.tabs.Tab;
}

export const ToggleAudioBtn: React.FC<ToggleAudioBtnProps> = ({ tab }) => {
  const [isMuted, setIsMuted] = React.useState<boolean>(false);
  const theme = useTheme();

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
      {isMuted ?? !tab.audible ? (
        <SpeakerX size="100%" color={theme.action.icon} />
      ) : (
        <SpeakerHigh size="100%" color={theme.action.icon} />
      )}
    </TabActionBtn>
  );
};
