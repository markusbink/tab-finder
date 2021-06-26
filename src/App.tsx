import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { ContextMenu } from "./components/ContextMenu";
import { NoTabsFound } from "./components/NoTabsFound";
import { TabHeader } from "./components/TabHeader";
import { TabList } from "./components/TabList";
import { TabSearchInput } from "./components/TabSearchInput";
import { useTabContext } from "./contexts/TabContext";
import Helper from "./helpers/Helper";
import { useContextMenu } from "./hooks/useContextMenu";
import { GlobalStyle } from "./styles/Global";
import { darkTheme, lightTheme } from "./styles/themes";
const App: React.FC = () => {
  const { tabs, searchTerm } = useTabContext();
  const filteredTabs = Helper.filterTabsByTerm(tabs, searchTerm);
  const { theme } = useTabContext();
  const { xPos, yPos, isVisible, onContextMenu } = useContextMenu();

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AppWrapper>
        <TabHeader />
        <TabSearchInput />
        {filteredTabs.length > 0 ? (
          <TabList tabs={filteredTabs} onContextMenu={onContextMenu} />
        ) : (
          <NoTabsFound />
        )}
        <ContextMenu isVisible={isVisible} position={{ x: xPos, y: yPos }} />
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;

const AppWrapper = styled.div`
  text-align: center;
  width: 350px;
  height: 400px;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
`;
