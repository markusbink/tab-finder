class Helper {
    truncate(text: string, length: number): string {
        return text.length > length ? text.substr(0, length - 1) + "…" : text;
    }

    filterTabsByTerm(
        tabs: chrome.tabs.Tab[],
        searchTerm: string
    ): chrome.tabs.Tab[] {
        return tabs.filter(
            (tab) =>
                tab.title!.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tab.url!.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
}

export default new Helper();
