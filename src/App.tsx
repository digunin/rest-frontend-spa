import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { Container, Grid, Typography } from "@mui/material";
import { setUser } from "./store/userSlice";

function App() {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.userState.username);

  useEffect(() => {
    dispatch(setUser({ username: "World", token: "undefined" }));
  }, []);

  return (
    <Container maxWidth="md">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Typography>{`Hello, ${username}!`}</Typography>
      </Grid>
    </Container>
  );
}

export default App;
