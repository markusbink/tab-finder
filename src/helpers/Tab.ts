class Tab {
    // Go to tab that was clicked on
    goToTab(tabId: number): void {
        chrome.tabs.highlight({ tabs: tabId });
    }

    move(tabId: number, newTabPosition: number):void {
        chrome.tabs.move(tabId, { index: newTabPosition });
    }

    async closeTabById(id: number) {
        return await chrome.tabs.remove(id)
    }

    async getTabs() {
        return await chrome.tabs.query({}); 
    }

    async getTabByIndex(index: number) {
        return await chrome.tabs.query({ index: index });
    }

    async update(id: number, properties: chrome.tabs.UpdateProperties) {
        return await chrome.tabs.update(id, properties);
    }
}

export default new Tab();
