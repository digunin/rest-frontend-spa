import { useAppSelector } from "../store";

export const useSignIn = () => {
  const { status } = useAppSelector((state) => state.userState);
  return {
    loading: status === "loading",
  };
};
