import * as React from "react";
import styled from "styled-components";

export const Sun: React.FC = () => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="192"
      height="192"
      viewBox="0 0 256 256"
    >
      <path fill="none" d="M0 0H256V256H0z"></path>
      <Circle
        cx="128"
        cy="128"
        r="60"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></Circle>
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M128 36L128 16"
      ></Path>
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M62.946 62.946L48.804 48.804"
      ></Path>
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M36 128L16 128"
      ></Path>
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M62.946 193.054L48.804 207.196"
      ></Path>
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M128 220L128 240"
      ></Path>
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M193.054 193.054L207.196 207.196"
      ></Path>
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M220 128L240 128"
      ></Path>
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M193.054 62.946L207.196 48.804"
      ></Path>
    </Icon>
  );
};

const Icon = styled.svg`
  width: 100%;
  height: 100%;
`;

const Path = styled.path`
  stroke: ${({ theme }) => theme.text};
`;

const Circle = styled.circle`
  stroke: ${({ theme }) => theme.text};
`;
