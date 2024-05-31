import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useAuth } from "./useAuth";
import { loadData } from "../store/database/databaseSlice";

export const useAppDatabase = () => {
  const dispatch = useAppDispatch();
  const { isAuth, token } = useAuth();
  const data = useAppSelector((state) => state.databaseState.data);
  const { status, error } = useAppSelector((state) => state.databaseState);

  useEffect(() => {
    if (!isAuth) return;
    dispatch(loadData(token as string));
  }, []);

  return { data, error, loading: status === "loading" };
};
