import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { NoTabsFound } from "./components/NoTabsFound";
import { TabList } from "./components/TabList";
import { TabSearchInput } from "./components/TabSearchInput";
import { useTabContext } from "./contexts/TabContext";
import { GlobalStyle } from "./constants/Global";
import { darkTheme, lightTheme } from "./constants/themes";
import * as Constants from "./constants";
import { Toaster } from "react-hot-toast";
import { TabHeader } from "./components/TabHeader";
import { useDispatch } from "react-redux";
import { getTabs } from "./store/actions";
import { useFilteredTabs } from "./hooks";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredTabs = useFilteredTabs(searchTerm);
  const { theme } = useTabContext();

  useEffect(() => {
    dispatch(getTabs());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AppWrapper>
        <Toaster />
        <TabHeader />
        <TabSearchInput searchTerm={searchTerm} onSearchInput={setSearchTerm} />
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
