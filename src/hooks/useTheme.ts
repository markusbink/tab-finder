import * as React from "react";
import { ThemeContext } from "styled-components";

export const useTheme = () => {
  const theme = React.useContext(ThemeContext);
  return theme;
};
