import React from "react";
import { Container } from "@mui/material";
import Login from "./components/form/Login";
import { useAppInit } from "./hooks/useAppInit";
import Database from "./components/AppDatabase";
import { useErrorsDisplay } from "./hooks/useErrorsDisplay";
import AppHeader from "./components/AppHeader";
import { APP_BAR_HEIGHT } from "./utils/css-var";
import AppOverlay from "./components/AppOverlay";

function App() {
  const { isAuth } = useAppInit();
  useErrorsDisplay();

  return (
    <>
      <AppOverlay />
      <AppHeader />
      <Container id="app" maxWidth="lg" sx={{ mt: `${APP_BAR_HEIGHT}px` }}>
        {!isAuth && <Login />}
        {isAuth && <Database />}
      </Container>
    </>
  );
}

export default App;
