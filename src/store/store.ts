import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  ActionType,
  CLOSE_TAB,
  CLOSE_TABS,
  TOGGLE_TAB_PIN,
  TOGGLE_TAB_PINS,
  SET_TABS,
  TOGGLE_TAB_AUDIO,
  TOGGLE_TAB_SELECT,
  SELECT_TABS,
  GROUP_TABS,
  UNGROUP_TABS,
} from "./actions";
import { ITab, AppState } from "./types";

const closeTab = (tabs: ITab[], id: number): ITab[] => {
  return tabs.filter((tab) => tab.id !== id);
};

const closeTabs = (tabs: ITab[], ids: number[]): ITab[] => {
  return tabs.filter((tab) => ids.includes(tab.id!));
};

const toggleTabPin = (tabs: ITab[], id: number): ITab[] => {
  return tabs.map((tab) => ({
    ...tab,
    pinned: !(tab.id === id),
  }));
};

const toggleTabsPin = (tabs: ITab[], ids: number[]): ITab[] => {
  return tabs.map((tab) => ({
    ...tab,
    pinned: !ids.includes(tab.id!),
  }));
};

const toggleTabSelect = (tabs: ITab[], id: number): ITab[] => {
  return tabs.map((tab) => ({
    ...tab,
    isSelected: tab.id === id,
  }));
};

const toggleTabAudio = (tabs: ITab[], id: number) => {
  return tabs.map((tab) => ({
    ...tab,
    mutedInfo: {
      muted: !tab.mutedInfo?.muted,
    },
  }));
};

const selectTabs = (tabs: ITab[], ids: number[]) => {
  return tabs.map((tab) => ({
    ...tab,
    isSelected: ids.includes(tab.id!) ? true : tab.isSelected,
  }));
};

export const deselectTabs = (tabs: ITab[]) => {
  return tabs.map((tab) => ({
    ...tab,
    isSelected: false,
  }));
};

const tabReducer = (
  state: AppState = { tabs: [], searchTerm: "" },
  action: ActionType
) => {
  switch (action.type) {
    case SET_TABS:
      return {
        ...state,
        tabs: action.payload,
      };
    case CLOSE_TAB:
      return {
        ...state,
        tabs: closeTab(state.tabs, action.payload),
      };
    case CLOSE_TABS:
      return {
        ...state,
        tabs: closeTabs(state.tabs, action.payload),
      };
    case TOGGLE_TAB_PIN:
      return {
        ...state,
        tabs: toggleTabPin(state.tabs, action.payload),
      };
    case TOGGLE_TAB_PINS:
      return {
        ...state,
        tabs: toggleTabsPin(state.tabs, action.payload),
      };
    case TOGGLE_TAB_AUDIO:
      return {
        ...state,
        tabs: toggleTabAudio(state.tabs, action.payload),
      };
    case TOGGLE_TAB_SELECT:
      return {
        ...state,
        tabs: toggleTabSelect(state.tabs, action.payload),
      };
    case SELECT_TABS:
      return {
        ...state,
        tabs: selectTabs(state.tabs, action.payload),
      };
    case GROUP_TABS:
      return {
        ...state,
        tabs: action.payload,
      };
    case UNGROUP_TABS:
      return {
        ...state,
        tabs: action.payload,
      };
    default:
      return state;
  }
};

export const store = createStore(
  tabReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
