import * as React from "react";
import styled from "styled-components";

export const TabFinderIcon: React.FC = () => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="192"
      height="192"
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <rect
        x="32.00781"
        y="80.00005"
        width="160"
        height="128"
        rx="8"
        strokeWidth="16"
        stroke="var(--light-grey)"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      ></rect>
      <path
        d="M64.00781,48.00005h152a8,8,0,0,1,8,8V176"
        fill="none"
        stroke="var(--light-grey)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
    </Icon>
  );
};

const Icon = styled.svg`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;
