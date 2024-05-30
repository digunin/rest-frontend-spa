import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useAuth } from "./useAuth";
import { loadData } from "../store/database/databaseSlice";

export const useAppDatabase = () => {
  const dispatch = useAppDispatch();
  const { token } = useAuth();
  const data = useAppSelector((state) => state.databaseState.data);
  const loading = useAppSelector((state) => state.databaseState.status);

  useEffect(() => {
    dispatch(loadData(token as string));
  }, []);

  return { data, loading: loading === "loading" };
};
