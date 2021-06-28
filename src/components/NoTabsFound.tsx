import * as React from "react";
import styled from "styled-components";
import { LightningSlash } from "phosphor-react";
import { useTheme } from "../hooks/useTheme";

export const NoTabsFound: React.FC = () => {
  const theme = useTheme();

  return (
    <Wrapper className="no-tabs-found">
      <LightningSlash size={50} color={theme.danger} />
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
