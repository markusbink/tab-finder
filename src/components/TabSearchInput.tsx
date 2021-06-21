import * as React from "react";
import styled from "styled-components";
import { Clear } from "../assets/icons/Clear";
import { useTabContext } from "../contexts/TabContext";

export const TabSearchInput: React.FC = ({}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { searchTerm, setSearchTerm } = useTabContext();

  React.useEffect(() => {
    // Make input focusable when popup opens
    inputRef?.current?.focus();

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        // Prevent popup from closing
        e.preventDefault();
        // Clear input
        setSearchTerm("");
        // Defocus input
        inputRef?.current?.blur();
      }
    });
  }, []);

  const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <SearchWrapper>
      <SearchInput
        ref={inputRef}
        onChange={onInputChanged}
        className="search"
        type="text"
        placeholder="What tab are you looking for?"
        value={searchTerm}
      />
      {searchTerm && (
        <ClearIcon onClick={() => setSearchTerm("")} className="clear-icon">
          <Clear />
        </ClearIcon>
      )}
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  padding: 10px;
  position: relative;
`;

const SearchInput = styled.input`
  background: var(--dark-black);
  color: var(--light-grey);
  border-radius: 6px;
  padding: 15px;
  border: 0;
  outline: none;
  width: 100%;
  user-select: none;
  box-sizing: border-box;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid var(--dark-grey);
  }

  &:focus {
    border: 1px solid var(--green);
  }

  ::placeholder {
    color: var(--medium-grey);
  }
`;

const ClearIcon = styled.span`
  position: absolute;
  display: inline-block;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  line-height: 1;
  padding: 0;
  margin: 0;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
