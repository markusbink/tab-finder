import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { ITab, AppState } from "./types";

export const CLOSE_TAB = "CLOSE_TAB";
export const CLOSE_TABS = "CLOSE_TABS";
export const TOGGLE_TAB_PIN = "TOGGLE_TAB_PIN";
export const PIN_TABS = "PIN_TABS";
export const UNPIN_TABS = "UNPIN_TABS";
export const TOGGLE_TAB_AUDIO = "TOGGLE_TAB_AUDIO";
export const TOGGLE_TAB_SELECT = "TOGGLE_TAB_SELECT";
export const SELECT_TABS = "SELECT_TABS";
export const DESELECT_TABS = "DESELECT_TABS";
export const GROUP_TABS = "GROUP_TABS";
export const UNGROUP_TABS = "UNGROUP_TABS";
export const SET_TABS = "SET_TABS";
export const SET_THEME = "SET_THEME";

export type ActionType =
  | { type: typeof CLOSE_TAB; payload: number }
  | { type: typeof CLOSE_TABS; payload: number[] }
  | { type: typeof TOGGLE_TAB_PIN; payload: number }
  | { type: typeof PIN_TABS; payload: ITab[] }
  | { type: typeof UNPIN_TABS; payload: ITab[] }
  | { type: typeof TOGGLE_TAB_AUDIO; payload: number }
  | { type: typeof TOGGLE_TAB_SELECT; payload: number }
  | { type: typeof SELECT_TABS; payload: number[] }
  | { type: typeof DESELECT_TABS }
  | { type: typeof GROUP_TABS; payload: ITab[] }
  | { type: typeof UNGROUP_TABS; payload: ITab[] }
  | { type: typeof SET_THEME; payload: string }
  | { type: typeof SET_TABS; payload: ITab[] };

export const closeTab = (id: number): ActionType => ({
  type: CLOSE_TAB,
  payload: id,
});

export const closeTabs = (ids: number[]): ActionType => ({
  type: CLOSE_TABS,
  payload: ids,
});

export const togglePinTab = (id: number): ActionType => ({
  type: TOGGLE_TAB_PIN,
  payload: id,
});

export const pinTabs = (tabs: ITab[]): ActionType => ({
  type: PIN_TABS,
  payload: tabs,
});
export const unpinTabs = (tabs: ITab[]): ActionType => ({
  type: UNPIN_TABS,
  payload: tabs,
});

export const toggleTabAudio = (id: number): ActionType => ({
  type: TOGGLE_TAB_AUDIO,
  payload: id,
});

export const toggleTabSelect = (id: number): ActionType => {
  return {
    type: TOGGLE_TAB_SELECT,
    payload: id,
  };
};

export const selectTabs = (ids: number[]): ActionType => ({
  type: SELECT_TABS,
  payload: ids,
});

export const deselectTabs = (): ActionType => ({
  type: DESELECT_TABS,
});

export const groupTabs = (tabs: ITab[]): ActionType => ({
  type: GROUP_TABS,
  payload: tabs,
});

export const ungroupTabs = (tabs: ITab[]): ActionType => ({
  type: UNGROUP_TABS,
  payload: tabs,
});

export const setTabs = (tabs: ITab[]): ActionType => {
  return {
    type: SET_TABS,
    payload: tabs,
  };
};

export const setTheme = (theme: string): ActionType => {
  return {
    type: SET_THEME,
    payload: theme,
  };
};

export const getTabs =
  (): ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch) => {
    const tabs: ITab[] = await chrome.tabs.query({});
    dispatch(
      setTabs(
        tabs.map((tab) => {
          tab.isSelected = false;
          return tab;
        })
      )
    );
  };

export const loadTheme =
  (): ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch) => {
    // Set theme
    chrome.storage.sync.get(["theme"], async (result) => {
      if (!result.theme) {
        await chrome.storage.sync.set({ theme: "dark" });
      }
      dispatch(setTheme(result.theme));
    });
  };
