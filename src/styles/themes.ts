export const colors = {
  dark: {
    darkBlack: "#07080c",
    black: "#15181e",
    darkGrey: "#292b36",
    mediumGrey: "#5e6274",
    lightGrey: "#aab1d0",
  },
  light: {
    white: "#F2F3F5",
    black: "#060607",
    mediumGrey: "#D4D7DC",
    darkGrey: "#767F8C",
    lightGrey: "#E3E5E8",
  },
  success: "#56cb82",
  danger: "#cb7656",
};

export const darkTheme = {
  text: colors.dark.lightGrey,
  background: colors.dark.black,
  success: colors.success,
  danger: colors.danger,
  input: {
    background: colors.dark.darkBlack,
    placeholder: colors.dark.mediumGrey,
    hover: colors.dark.darkGrey,
    active: colors.success,
  },
  action: {
    background: colors.dark.lightGrey,
    icon: colors.dark.darkBlack,
  },
  tab: {
    background: colors.dark.darkGrey,
    text: colors.dark.lightGrey,
    hover: colors.dark.lightGrey,
  },
  contextMenu: {
    background: colors.dark.black,
    hover: colors.dark.darkGrey,
  },
};

export const lightTheme = {
  text: colors.light.black,
  background: colors.light.white,
  success: colors.success,
  danger: colors.danger,
  input: {
    background: colors.light.lightGrey,
    placeholder: colors.light.mediumGrey,
    hover: colors.light.darkGrey,
    active: colors.success,
  },
  action: {
    background: colors.light.white,
    icon: colors.light.darkGrey,
  },
  tab: {
    background: colors.light.mediumGrey,
    text: colors.light.black,
    hover: colors.light.darkGrey,
  },
  contextMenu: {
    background: colors.light.white,
    hover: colors.light.lightGrey,
  },
};
