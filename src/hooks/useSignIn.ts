import { useAppSelector } from "../store";

export const useSignIn = () => {
  const { status, error } = useAppSelector((state) => state.userState);
  return {
    loading: status === "loading",
    error,
  };
};
