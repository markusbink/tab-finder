import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { ITab, AppState } from "./types";

export const CLOSE_TAB = "CLOSE_TAB";
export const CLOSE_TABS = "CLOSE_TABS";
export const TOGGLE_TAB_PIN = "TOGGLE_TAB_PIN";
export const TOGGLE_TAB_PINS = "TOGGLE_TAB_PINS";
export const TOGGLE_TAB_AUDIO = "TOGGLE_TAB_AUDIO";
export const TOGGLE_TAB_SELECT = "TOGGLE_TAB_SELECT";
export const SELECT_TABS = "SELECT_TABS";
export const GROUP_TABS = "GROUP_TABS";
export const UNGROUP_TABS = "UNGROUP_TABS";
export const SET_TABS = "SET_TABS";
export const FILTER_TABS = "FILTER_TABS";
export const SET_SEARCHTERM = "SET_SEARCHTERM";

export type ActionType =
  | { type: typeof CLOSE_TAB; payload: number }
  | { type: typeof CLOSE_TABS; payload: number[] }
  | { type: typeof TOGGLE_TAB_PIN; payload: number }
  | { type: typeof TOGGLE_TAB_PINS; payload: number[] }
  | { type: typeof TOGGLE_TAB_AUDIO; payload: number }
  | { type: typeof TOGGLE_TAB_SELECT; payload: number }
  | { type: typeof SELECT_TABS; payload: number[] }
  | { type: typeof GROUP_TABS; payload: ITab[] }
  | { type: typeof UNGROUP_TABS; payload: ITab[] }
  | { type: typeof SET_TABS; payload: ITab[] }
  | { type: typeof SET_SEARCHTERM; payload: string }
  | { type: typeof FILTER_TABS; payload: string };

export const closeTab = (id: number): ActionType => ({
  type: CLOSE_TAB,
  payload: id,
});

export const closeTabs = (ids: number[]): ActionType => ({
  type: CLOSE_TABS,
  payload: ids,
});

export const pinTab = (id: number): ActionType => ({
  type: TOGGLE_TAB_PIN,
  payload: id,
});

export const pinTabs = (ids: number[]): ActionType => ({
  type: TOGGLE_TAB_PINS,
  payload: ids,
});

export const toggleTabAudio = (id: number): ActionType => ({
  type: TOGGLE_TAB_AUDIO,
  payload: id,
});

export const toggleTabSelect = (id: number): ActionType => ({
  type: TOGGLE_TAB_SELECT,
  payload: id,
});

export const selectTabs = (ids: number[]): ActionType => ({
  type: SELECT_TABS,
  payload: ids,
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

export const getTabs =
  (): ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch) => {
    const tabs: ITab[] = await chrome.tabs.query({});
    dispatch(setTabs(tabs));
  };
