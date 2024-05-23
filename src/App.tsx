import React from "react";
import { Container } from "@mui/material";
import { useAuth } from "./hooks/useAuth";
import Login from "./components/form/Login";

function App() {
  const { isAuth } = useAuth();

  return (
    <Container id="app" maxWidth="md">
      {!isAuth && <Login />}
    </Container>
  );
}

export default App;
