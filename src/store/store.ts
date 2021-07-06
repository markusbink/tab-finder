import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import thunk from "redux-thunk";
import {
  ActionType,
  CLOSE_TAB,
  CLOSE_TABS,
  TOGGLE_TAB_PIN,
  PIN_TABS,
  UNPIN_TABS,
  SET_TABS,
  TOGGLE_TAB_AUDIO,
  TOGGLE_TAB_SELECT,
  SELECT_TABS,
  GROUP_TABS,
  UNGROUP_TABS,
  DESELECT_TABS,
  SET_THEME,
} from "./actions";
import { ITab, AppState } from "./types";

const closeTab = (tabs: ITab[], id: number): ITab[] => {
  return tabs.filter((tab) => tab.id !== id);
};

const closeTabs = (tabs: ITab[], ids: number[]): ITab[] => {
  return tabs.filter((tab) => !ids.includes(tab.id!));
};

const toggleTabPin = (tabs: ITab[], id: number): ITab[] => {
  return tabs.map((tab) => ({
    ...tab,
    pinned: tab.id === id ? !tab.pinned : tab.pinned,
  }));
};

const toggleTabSelect = (tabs: ITab[], id: number): ITab[] => {
  return tabs.map((tab) => ({
    ...tab,
    isSelected: tab.id === id ? !tab.isSelected : tab.isSelected,
  }));
};

const toggleTabAudio = (tabs: ITab[], id: number) => {
  return tabs.map((tab) => ({
    ...tab,
    mutedInfo:
      tab.id === id
        ? {
            muted: !tab.mutedInfo?.muted,
          }
        : tab.mutedInfo,
  }));
};

const selectTabs = (tabs: ITab[], ids: number[]) => {
  return tabs.map((tab) => ({
    ...tab,
    isSelected: ids.includes(tab.id!) ? true : tab.highlighted,
  }));
};

const deselectTabs = (tabs: ITab[]) => {
  return tabs.map((tab) => ({
    ...tab,
    isSelected: false,
  }));
};

const tabReducer = (
  state: AppState = { tabs: [], theme: "dark" },
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
    case PIN_TABS:
      return {
        ...state,
        tabs: action.payload,
      };
    case UNPIN_TABS:
      return {
        ...state,
        tabs: action.payload,
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
    case DESELECT_TABS:
      return {
        ...state,
        tabs: deselectTabs(state.tabs),
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
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export const store = createStore(
  tabReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
