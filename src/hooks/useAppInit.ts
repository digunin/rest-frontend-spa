import { useEffect, useState } from "react";
import { useAppDispatch } from "../store";
import { useAuth } from "./useAuth";
import { getCookies, removeCookies, setCookies } from "../utils/cookies-api";
import { setUser } from "../store/userSlice";

export const useAppInit = () => {
  const [init, setInit] = useState(true);
  const dispatch = useAppDispatch();
  const { isAuth, username, token } = useAuth();

  useEffect(() => {
    console.log("useEffect 1");

    const { username, token } = getCookies();
    if (!!username && !!token) dispatch(setUser({ username, token }));
    else dispatch(setUser({ username: null, token: null }));
    setInit(false);
  }, []);

  useEffect(() => {
    if (!isAuth && !init) {
      removeCookies();
    }
    if (isAuth && !init) {
      if (username && token) setCookies({ username, token });
    }
  }, [isAuth]);

  return { isAuth, username };
};
