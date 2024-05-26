import React from "react";
import { Container } from "@mui/material";
import Login from "./components/form/Login";
import { useAppInit } from "./hooks/useAppInit";
import Database from "./components/Database";
import { useErrorsDisplay } from "./hooks/useErrorsDisplay";

function App() {
  const { isAuth } = useAppInit();
  useErrorsDisplay();

  return (
    <Container id="app" maxWidth="md">
      {!isAuth && <Login />}
      {isAuth && <Database />}
    </Container>
  );
}

export default App;
