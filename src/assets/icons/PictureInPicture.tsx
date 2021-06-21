import * as React from "react";
import styled from "styled-components";

export const PictureInPicture: React.FC = () => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="192"
      height="192"
      fill="#000000"
      viewBox="0 0 256 256"
    >
      <path fill="none" d="M0 0H256V256H0z"></path>
      <rect
        width="192"
        height="144"
        x="32"
        y="56"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        rx="8"
      ></rect>
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M136 200v-64a8 8 0 018-8h80"
      ></path>
    </Icon>
  );
};

const Icon = styled.svg`
  width: 100%;
  height: 100%;
`;
