import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
  font-family: "Inter";
  src: url("chrome-extension://__MSG_@@extension_id__/fonts/Inter-Medium.woff2")
      format("woff2"),
    url("chrome-extension://__MSG_@@extension_id__/fonts/Inter-Medium.woff")
      format("woff");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("chrome-extension://__MSG_@@extension_id__/fonts/Inter-Light.woff2")
      format("woff2"),
    url("chrome-extension://__MSG_@@extension_id__/fonts/Inter-Light.woff")
      format("woff");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("chrome-extension://__MSG_@@extension_id__/fonts/Inter-Bold.woff2")
      format("woff2"),
    url("chrome-extension://__MSG_@@extension_id__/fonts/Inter-Bold.woff")
      format("woff");
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}


  :root {
  --dark-black: #07080c;
  --black: #15181e;
  --dark-grey: #292b36;
  --medium-grey: #5e6274;
  --light-grey: #aab1d0;
  --green: #56cb82;
  --orange: #cb7656;
}

* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 16px;
  padding: 0;
  margin: 0;
}

::selection {
  background-color: var(--green);
  color: var(--dark-black);
}

body {
  font-family: "Inter", BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif;
  font-style: normal;
}
`;
