import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { useAuth } from "./useAuth";
import { getCookies } from "../utils/cookies-api";
import { setUser } from "../store/userSlice";

export const useAppInit = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) return;
    const { username, token } = getCookies();
    if (!!username && !!token) dispatch(setUser({ username, token }));
    else dispatch(setUser({ username: null, token: null }));
  }, []);
  return { isAuth };
};
