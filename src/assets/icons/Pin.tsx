import * as React from "react";
import styled from "styled-components";

export const Pin: React.FC = () => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="192"
      height="192"
      viewBox="0 0 256 256"
    >
      <path fill="none" d="M0 0H256V256H0z"></path>
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M128 176L128 240"
      ></path>
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M64 40L192 40"
      ></path>
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M40 176L216 176"
      ></path>
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M56 176L80 40"
      ></path>
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M176 40L200 176"
      ></path>
    </Icon>
  );
};

const Icon = styled.svg`
  width: 20px;
  height: 20px;
`;
