import * as React from "react";
import styled from "styled-components";
import { Error } from "../assets/icons/Error";

export const NoTabsFound: React.FC = () => {
  return (
    <Wrapper className="no-tabs-found">
      <Error />
      <Title>Oops...</Title>
      <Description>No tabs match your search term.</Description>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

const Title = styled.h4`
  margin-top: 20px;
  font-size: 25px;
  color: ${({ theme }) => theme.text};
`;

const Description = styled.p`
  margin-top: 10px;
  font-size: 16px;
  max-width: 160px;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-weight: 400;
`;
