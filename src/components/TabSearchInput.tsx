import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { XCircle } from "phosphor-react";
import { useTheme } from "../hooks/useTheme";

interface ITabSearchInputProps {
  searchTerm: string;
  onSearchInput: (newSearchTerm: string) => void;
}

export const TabSearchInput: React.FC<ITabSearchInputProps> = ({
  searchTerm,
  onSearchInput,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  useEffect(() => {
    // Make input focusable when popup opens
    inputRef?.current?.focus();

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        // Prevent popup from closing
        e.preventDefault();
        // Clear input
        onSearchInput("");
        // Defocus input
        inputRef?.current?.blur();
      }
    });
  }, []);

  return (
    <SearchWrapper>
      <SearchInput
        ref={inputRef}
        onChange={(e) => onSearchInput(e.target.value.trim())}
        className="search"
        type="text"
        placeholder="What tab are you looking for?"
        value={searchTerm}
      />
      {searchTerm && (
        <ClearIcon onClick={() => onSearchInput("")} className="clear-icon">
          <XCircle size="100%" weight="fill" color={theme.action.background} />
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
  background: ${({ theme }) => theme.input.background};
  color: ${({ theme }) => theme.text};
  border-radius: 6px;
  padding: 15px;
  border: 0;
  outline: none;
  width: 100%;
  user-select: none;
  box-sizing: border-box;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid ${({ theme }) => theme.input.hover};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.input.active};
  }

  ::placeholder {
    color: ${({ theme }) => theme.input.placholder};
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
