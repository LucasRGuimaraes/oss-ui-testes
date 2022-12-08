import type { AppProps } from "next/app";
import { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../theme";

import "../theme/global.css";
import "typeface-roboto";
import Head from "next/head";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../services/queryClient";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="theme-color" content="#111827" />
        <title>OSS Dashboard TESTE</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
