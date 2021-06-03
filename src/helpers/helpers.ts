export const truncate = (text: string, length: number) => {
    return text.length > length ? text.substr(0, length - 1) + "..." : text;
};
