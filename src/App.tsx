import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { TabList } from "./components/TabList";
import { TabSearchInput } from "./components/TabSearchInput";
import { GlobalStyle } from "./constants/Global";
import { darkTheme, lightTheme } from "./constants/themes";
import * as Constants from "./constants";
import { TabHeader } from "./components/TabHeader";
import { useDispatch, useSelector } from "react-redux";
import { getTabs, loadTheme } from "./store/actions";
import { useFilteredTabs } from "./hooks";
import { AppState } from "./store/types";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredTabs = useFilteredTabs(searchTerm);
  const themeSelector = (store: AppState) => store.theme;
  const theme = useSelector(themeSelector);

  useEffect(() => {
    dispatch(getTabs());
    dispatch(loadTheme());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AppWrapper>
        <TabHeader />
        <TabSearchInput searchTerm={searchTerm} onSearchInput={setSearchTerm} />
        <TabList tabs={filteredTabs} />
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
