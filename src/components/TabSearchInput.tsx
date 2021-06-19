import * as React from "react";
import { Clear } from "../assets/icons/Clear";
import { useTabContext } from "../contexts/TabContext";

export const TabSearchInput: React.FC = ({}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const { searchTerm, setSearchTerm, tabs, setFilteredTabs } =
        useTabContext();

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

    const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

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
