import React from "react";
import { Container } from "@mui/material";
import Login from "./components/form/Login";
import { useAppInit } from "./hooks/useAppInit";

function App() {
  const { isAuth } = useAppInit();
  return (
    <Container id="app" maxWidth="md">
      {!isAuth && <Login />}
    </Container>
  );
}

export default App;
