import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@mui/material";
import { useAppDispatch } from "../store";
import { setUser } from "../store/userSlice";

const Database = () => {
  const dispatch = useAppDispatch();
  const { username } = useAuth();
  return (
    <div>
      <p>Hello, {username}</p>
      <Button
        onClick={() => dispatch(setUser({ username: null, token: null }))}
      >
        LOGOUT
      </Button>
    </div>
  );
};

export default Database;
