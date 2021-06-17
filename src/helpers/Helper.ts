class Helper {
    truncate(text: string, length: number): string {
        return text.length > length ? text.substr(0, length - 1) + "..." : text;
    }
}

export default new Helper();
