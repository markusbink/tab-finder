import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { NoTabsFound } from "./components/NoTabsFound";
import { TabHeader } from "./components/TabHeader";
import { TabList } from "./components/TabList";
import { TabSearchInput } from "./components/TabSearchInput";
import { useTabContext } from "./contexts/TabContext";
import Helper from "./helpers/Helper";
import { GlobalStyle } from "./styles/Global";
import { darkTheme, lightTheme } from "./styles/themes";
import * as Constants from "./constants";
const App: React.FC = () => {
  const { tabs, searchTerm } = useTabContext();
  const filteredTabs = Helper.filterTabsByTerm(tabs, searchTerm);
  const { theme } = useTabContext();

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AppWrapper>
        <TabHeader />
        <TabSearchInput />
        {filteredTabs.length > 0 ? (
          <TabList tabs={filteredTabs} />
        ) : (
          <NoTabsFound />
        )}
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;

const AppWrapper = styled.div`
  text-align: center;
  width: ${Constants.POPUP_WIDTH}px;
  height: ${Constants.POPUP_HEIGHT}px;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
`;
