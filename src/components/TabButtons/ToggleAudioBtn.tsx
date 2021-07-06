import * as React from "react";
import { SpeakerHigh, SpeakerX } from "phosphor-react";
import Tab from "../../helpers/Tab";
import { TabActionBtn } from "./TabActionBtn";
import { useTheme } from "../../hooks/useTheme";
import { toggleTabAudio } from "../../store/actions";
import { useDispatch } from "react-redux";

interface ToggleAudioBtnProps {
  tab: chrome.tabs.Tab;
}

export const ToggleAudioBtn: React.FC<ToggleAudioBtnProps> = ({ tab }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const onToggleAudio = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    tabId: number
  ): void => {
    e.stopPropagation();
    chrome.tabs.get(tabId, async (tab) => {
      const muted = !tab.mutedInfo?.muted;
      await Tab.update(tab.id!, { muted });

      dispatch(toggleTabAudio(tabId));
    });
  };

  return (
    <TabActionBtn onClick={(e) => onToggleAudio(e, tab.id!)}>
      {tab!.mutedInfo!.muted ?? !tab.audible ? (
        <SpeakerX size="100%" color={theme.action.icon} />
      ) : (
        <SpeakerHigh size="100%" color={theme.action.icon} />
      )}
    </TabActionBtn>
  );
};
