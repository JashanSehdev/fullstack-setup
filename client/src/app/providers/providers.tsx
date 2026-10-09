import { ReactNode } from "react";
import Snackbar from "./snackbar";
import ReduxProvider from "./redux-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <Snackbar>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </Snackbar>
    </ReduxProvider>
  );
}
