class Tab {
    // Go to tab that was clicked on
    goToTab(tabId: number): void {
        chrome.tabs.highlight({ tabs: tabId });
    }
}

export default new Tab();
