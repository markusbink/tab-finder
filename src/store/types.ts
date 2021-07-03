export interface ITab extends chrome.tabs.Tab {
  isSelected?: boolean;
}

export interface AppState {
  tabs: ITab[];
  searchTerm: string;
}
