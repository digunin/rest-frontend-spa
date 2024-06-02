import React, { lazy, Suspense } from "react";
import { Container } from "@mui/material";
import { useAppInit } from "./hooks/useAppInit";
import Database from "./components/AppDatabase";
import { useErrorsDisplay } from "./hooks/useErrorsDisplay";
import AppHeader from "./components/AppHeader";
import { APP_BAR_HEIGHT } from "./utils/css-var";

const Login = lazy(() => import("./components/form/Login"));

function App() {
  const { isAuth } = useAppInit();
  useErrorsDisplay();

  return (
    <>
      <AppHeader />
      <Container id="app" maxWidth="lg" sx={{ mt: `${APP_BAR_HEIGHT}px` }}>
        {!isAuth && (
          <Suspense>
            <Login />
          </Suspense>
        )}
        {isAuth && <Database />}
      </Container>
    </>
  );
}

export default App;
