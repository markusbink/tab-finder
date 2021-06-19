import * as React from "react";
import { Clear } from "../assets/icons/Clear";

interface TabSearchInputProps {
    onInputChanged: React.ChangeEventHandler<HTMLInputElement>;
    setSearchTerm: (term: string) => void;
    searchTerm: string;
}

export const TabSearchInput: React.FC<TabSearchInputProps> = ({
    onInputChanged,
    searchTerm,
    setSearchTerm,
}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        // Make input focusable when popup opens
        inputRef?.current?.focus();

        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key == "Escape") {
                // Prevent popup from closing
                e.preventDefault();
                // Clear input
                setSearchTerm("");
            }
        });
    }, []);

    return (
        <div className="search-wrapper">
            <input
                ref={inputRef}
                onChange={onInputChanged}
                className="search"
                type="text"
                placeholder="What tab are you looking for?"
                value={searchTerm}
            />
            {searchTerm && (
                <span onClick={() => setSearchTerm("")} className="clear-icon">
                    <Clear />
                </span>
            )}
        </div>
    );
};
