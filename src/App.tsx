import React from "react";
import { Container } from "@mui/material";
import Login from "./components/form/Login";
import { useAppInit } from "./hooks/useAppInit";
import Database from "./components/Database";

function App() {
  const { isAuth, username } = useAppInit();
  return (
    <Container id="app" maxWidth="md">
      {!isAuth && <Login />}
      {isAuth && <Database />}
    </Container>
  );
}

export default App;
