'use client'
import { ReactNode } from "react";
import Snackbar from "./snackbar";
import ReduxProvider from "./redux-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material";
import theme from "./mui-theme";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider>
        <Snackbar>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </Snackbar>
      </ReduxProvider>
    </ThemeProvider>
  );
}
