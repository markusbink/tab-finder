import * as React from "react";
import styled from "styled-components";

export const Error: React.FC = () => {
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
        d="M48 39.996L208 215.996"
      ></path>
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M163.777 167.351L96 239.969 112 159.969 48 135.969 92.198 88.614"
      ></path>
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M114.106 65.141L160 15.969 144 95.969 208 119.969 185.685 143.878"
      ></path>
    </Icon>
  );
};

const Icon = styled.svg`
  width: 50px;
  height: 50px;

  path:nth-child(n + 2) {
    stroke: var(--orange);
  }
`;
