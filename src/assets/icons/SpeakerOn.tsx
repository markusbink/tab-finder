import * as React from "react";
import styled from "styled-components";

export const SpeakerOn: React.FC = () => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="192"
      height="192"
      fill="#000000"
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <path
        d="M218.88231,77.08831a72,72,0,0,1,0,101.82338"
        fill="none"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
      <path
        d="M80,168H32a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8H80l72-56V224Z"
        fill="none"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
      <line
        x1="80"
        y1="88"
        x2="80"
        y2="168"
        fill="none"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <path
        d="M190.59793,105.37258a32,32,0,0,1,0,45.25484"
        fill="none"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
    </Icon>
  );
};

const Icon = styled.svg`
  width: 100%;
  height: 100%;
`;
