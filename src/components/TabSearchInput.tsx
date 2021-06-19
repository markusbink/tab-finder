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
    React.useEffect(() => {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key == "Escape") {
                // Prevent popup from closing
                e.preventDefault();

                setSearchTerm("");
            }
        });
    }, []);

    return (
        <div className="search-wrapper">
            <input
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
