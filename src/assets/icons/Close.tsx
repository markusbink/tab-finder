import * as React from "react";
import styled from "styled-components";

export const Close: React.FC = () => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="192"
      height="192"
      fill="#000000"
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <circle
        cx="128"
        cy="128"
        r="96"
        fill="none"
        stroke="#000000"
        stroke-miterlimit="10"
        strokeWidth="16"
      ></circle>
      <line
        x1="160"
        y1="96"
        x2="96"
        y2="160"
        fill="none"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <line
        x1="160"
        y1="160"
        x2="96"
        y2="96"
        fill="none"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
    </Icon>
  );
};

const Icon = styled.svg`
  width: 100%;
  height: 100%;
`;
